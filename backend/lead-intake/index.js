const DEFAULT_ALLOWED_ORIGINS = [
  'https://tad.software',
  'https://www.tad.software',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

const CREATE_PATHS = new Set(['/lead', '/api/lead', '/lead-intake', '/lead-intake/lead']);
const UPDATE_PATHS = new Set(['/lead-update', '/api/lead-update', '/lead-intake/update', '/lead-intake/lead-update']);

function getAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getRequestOrigin(event) {
  return event.headers?.origin || event.headers?.Origin || '';
}

function getCorsOrigin(event) {
  const origin = getRequestOrigin(event);
  if (!origin) return DEFAULT_ALLOWED_ORIGINS[0];
  return getAllowedOrigins().includes(origin) ? origin : DEFAULT_ALLOWED_ORIGINS[0];
}

function response(event, statusCode, payload, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': getCorsOrigin(event),
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
      ...extraHeaders,
    },
    body: JSON.stringify(payload),
  };
}

function getPath(event) {
  return event.rawPath || event.path || '/';
}

function getRouteType(event) {
  const path = getPath(event).replace(/\/+$/, '') || '/';
  if (CREATE_PATHS.has(path)) return 'create';
  if (UPDATE_PATHS.has(path)) return 'update';

  const action = parsePayloadAction(event);
  if (action === 'update') return 'update';
  return 'create';
}

function parsePayloadAction(event) {
  const contentType = event.headers?.['content-type'] || event.headers?.['Content-Type'] || '';
  if (!contentType.includes('application/json') || !event.body) return '';

  try {
    const text = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
    const parsed = JSON.parse(text);
    return String(parsed.action || parsed.mode || '').trim().toLowerCase();
  } catch {
    return '';
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var ${name}`);
  }
  return value;
}

function normalizeWebhookApiKey(apiKey) {
  let normalized = apiKey.trim();

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const decoded = decodeURIComponent(normalized);
      if (decoded === normalized) break;
      normalized = decoded;
    } catch {
      break;
    }
  }

  return normalized;
}

function getCrmEndpoint(routeType) {
  const urlName = routeType === 'update' ? 'CRM_UPDATE_WEBHOOK_URL' : 'CRM_CREATE_WEBHOOK_URL';
  const fallbackUrl = process.env.CRM_WEBHOOK_URL;
  const endpoint = new URL(process.env[urlName] || fallbackUrl || requireEnv(urlName));
  const keyName = routeType === 'update' ? 'CRM_UPDATE_WEBHOOK_API_KEY' : 'CRM_CREATE_WEBHOOK_API_KEY';
  const fallbackKeyName = routeType === 'update' ? 'CRM_WEBHOOK_UPDATE_API_KEY' : 'CRM_WEBHOOK_API_KEY';
  const apiKey = process.env[keyName] || process.env[fallbackKeyName] || requireEnv(keyName);
  endpoint.searchParams.set('apiKey', normalizeWebhookApiKey(apiKey));
  return endpoint;
}

function getRequestBody(event) {
  if (!event.body) return Buffer.alloc(0);
  return event.isBase64Encoded ? Buffer.from(event.body, 'base64') : Buffer.from(event.body);
}

function getContentType(event) {
  return event.headers?.['content-type'] || event.headers?.['Content-Type'] || '';
}

function appendIfPresent(payload, key, value) {
  if (value === undefined || value === null) return;
  payload.append(key, String(value));
}

function serializeObjectField(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value;
  return Object.entries(value)
    .filter(([, entryValue]) => entryValue !== undefined && entryValue !== null && String(entryValue).trim())
    .map(([key, entryValue]) => `${key}=${String(entryValue)}`)
    .join('; ');
}

function parseRequestFields(event) {
  const contentType = getContentType(event);
  const bodyText = getRequestBody(event).toString('utf8');
  if (!bodyText) return {};

  if (contentType.includes('application/json')) {
    const parsed = JSON.parse(bodyText);
    return parsed && typeof parsed === 'object' ? parsed : {};
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(bodyText));
  }

  if (contentType.includes('multipart/form-data')) {
    return parseMultipartFields(contentType, bodyText);
  }

  return {};
}

function parseMultipartFields(contentType, bodyText) {
  const boundaryMatch = contentType.match(/boundary=([^;]+)/i);
  if (!boundaryMatch) return {};

  const boundary = boundaryMatch[1].replace(/^"|"$/g, '');
  const fields = {};

  bodyText.split(`--${boundary}`).forEach((part) => {
    const trimmed = part.trim();
    if (!trimmed || trimmed === '--') return;

    const [rawHeaders, ...bodyParts] = part.split(/\r?\n\r?\n/);
    if (!rawHeaders || bodyParts.length === 0) return;
    if (/filename=/i.test(rawHeaders)) return;

    const nameMatch = rawHeaders.match(/name="([^"]+)"/i);
    if (!nameMatch) return;

    const value = bodyParts.join('\n\n').replace(/\r?\n--$/, '').trim();
    fields[nameMatch[1]] = value;
  });

  return fields;
}

function buildCrmFormData(event, routeType) {
  const fields = parseRequestFields(event);
  if (routeType === 'create') {
    if (!fields.firstName && fields.first_name) fields.firstName = fields.first_name;
    if (!fields.lastName && fields.last_name) fields.lastName = fields.last_name;
    delete fields.first_name;
    delete fields.last_name;
  }
  if (!fields.pain_point && fields.paint_point) fields.pain_point = fields.paint_point;
  delete fields.paint_point;
  fields.google_ads_obj = serializeObjectField(fields.google_ads_obj);
  const payload = new FormData();
  const fieldKeys = Object.keys(fields).sort();

  console.log('lead-intake parsed request', {
    routeType,
    path: getPath(event),
    contentType: getContentType(event),
    isBase64Encoded: Boolean(event.isBase64Encoded),
    fieldKeys,
  });

  Object.entries(fields).forEach(([key, value]) => {
    appendIfPresent(payload, key, value);
  });

  return payload;
}

async function forwardToCrm(event, routeType) {
  const endpoint = getCrmEndpoint(routeType);
  const body = buildCrmFormData(event, routeType);

  const crmResponse = await fetch(endpoint.toString(), {
    method: 'POST',
    body,
  });

  const contentType = crmResponse.headers.get('content-type') || 'application/json; charset=utf-8';
  const responseText = await crmResponse.text();

  return {
    statusCode: crmResponse.status,
    headers: {
      'Access-Control-Allow-Origin': getCorsOrigin(event),
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
      'Content-Type': contentType,
    },
    body: responseText,
  };
}

exports.handler = async (event) => {
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return response(event, 204, {});
  }

  const method = event.requestContext?.http?.method || event.httpMethod || 'POST';
  if (method !== 'POST') {
    return response(event, 405, { error: 'method_not_allowed' });
  }

  try {
    return await forwardToCrm(event, getRouteType(event));
  } catch (error) {
    console.error('Lead intake proxy failed:', error);
    return response(event, 502, {
      error: 'lead_intake_failed',
      message: 'Unable to submit the lead request right now.',
    });
  }
};
