import { useEffect } from 'react';
import './agents.css';

const AGENTS_MARKUP = "<div id=\"top\">\n    <section class=\"hero\" data-hero-layer=\"1\" aria-labelledby=\"hero-title\">\n      <div class=\"hero-ecosystem\" aria-hidden=\"true\">\n        <div class=\"hero-sky\">\n          <div class=\"hero-sun\"></div>\n          <div class=\"hero-cloud cloud-a\"></div>\n          <div class=\"hero-cloud cloud-b\"></div>\n        </div>\n        <div class=\"hero-system-label layer-label label-foundation\">\n          <strong>Layer 1: prepare the landing page</strong>\n          <span>The offer, form, and CRM path are shaped into clean ground for new interest.</span>\n        </div>\n        <div class=\"hero-system-label layer-label label-traffic\">\n          <strong>Layer 2: plant qualified traffic</strong>\n          <span>Marketing, ads, SEO, and page improvements create the conditions for leads.</span>\n        </div>\n        <div class=\"hero-system-label layer-label label-nurture\">\n          <strong>Layer 3: nourish the conversation</strong>\n          <span>Follow-up through chat, phone, email, and notes keeps each opportunity alive.</span>\n        </div>\n        <div class=\"hero-system-label layer-label label-harvest\">\n          <strong>Layer 4: harvest ready opportunities</strong>\n          <span>Qualified leads move into sales work, estimates, invoices, projects, or review.</span>\n        </div>\n        <div class=\"hero-system-label layer-label label-contract\">\n          <strong>Layer 5: sell with clear agreements</strong>\n          <span>Prepared opportunities become signed work with clear terms and payment context.</span>\n        </div>\n        <div class=\"hero-field\">\n          <div class=\"hero-distance\" aria-hidden=\"true\">\n            <div class=\"hero-silo\"></div>\n            <div class=\"hero-windmill\">\n              <span class=\"windmill-head\"></span>\n              <span class=\"windmill-blade blade-one\"></span>\n              <span class=\"windmill-blade blade-two\"></span>\n              <span class=\"windmill-blade blade-three\"></span>\n              <span class=\"windmill-blade blade-four\"></span>\n              <span class=\"windmill-blade blade-five\"></span>\n              <span class=\"windmill-blade blade-six\"></span>\n              <span class=\"windmill-blade blade-seven\"></span>\n              <span class=\"windmill-blade blade-eight\"></span>\n            </div>\n          </div>\n          <div class=\"hero-soil\"></div>\n          <div class=\"hero-tilled-row row-one\"></div>\n          <div class=\"hero-tilled-row row-two\"></div>\n          <div class=\"hero-leadhand\">\n            <span class=\"leadhand-sprout\"></span>\n            <span class=\"leadhand-eye eye-left\"></span>\n            <span class=\"leadhand-eye eye-right\"></span>\n            <span class=\"hero-tool hero-hoe\"></span>\n            <span class=\"hero-tool hero-seed-bag\"></span>\n            <span class=\"hero-tool hero-watering-can\"></span>\n            <span class=\"hero-tool hero-sickle\"></span>\n          </div>\n          <div class=\"hero-sprout sprout-one\"></div>\n          <div class=\"hero-sprout sprout-two\"></div>\n          <div class=\"hero-sprout sprout-three\"></div>\n          <div class=\"hero-sprout sprout-four\"></div>\n          <div class=\"hero-sprout sprout-five\"></div>\n          <div class=\"hero-sprout sprout-six\"></div>\n          <div class=\"hero-bundle bundle-one\"></div>\n          <div class=\"hero-bundle bundle-two\"></div>\n          <div class=\"hero-bundle bundle-three\"></div>\n          <div class=\"hero-bundle bundle-four\"></div>\n          <div class=\"hero-bundle bundle-five\"></div>\n          <div class=\"hero-bundle bundle-six\"></div>\n          <div class=\"hero-coin coin-one\"></div>\n          <div class=\"hero-coin coin-two\"></div>\n          <div class=\"hero-coin coin-three\"></div>\n          <div class=\"hero-coin coin-four\"></div>\n        </div>\n        <div class=\"hero-layer-dots\">\n          <button type=\"button\" data-hero-layer-target=\"1\" aria-label=\"Show layer 1\"></button>\n          <button type=\"button\" data-hero-layer-target=\"2\" aria-label=\"Show layer 2\"></button>\n          <button type=\"button\" data-hero-layer-target=\"3\" aria-label=\"Show layer 3\"></button>\n          <button type=\"button\" data-hero-layer-target=\"4\" aria-label=\"Show layer 4\"></button>\n          <button type=\"button\" data-hero-layer-target=\"5\" aria-label=\"Show layer 5\"></button>\n        </div>\n      </div>\n\n      <div class=\"hero-content\">\n        <p class=\"eyebrow\">Agent-orchestrated landing page to CRM system</p>\n        <h1 id=\"hero-title\">From first click to signed work.</h1>\n        <div class=\"hero-actions\">\n          <a class=\"button primary\" href=\"#review\">Schedule a sales review</a>\n          <a class=\"button secondary\" href=\"#system\">See the system</a>\n        </div>\n      </div>\n    </section>\n\n    <section id=\"system\" class=\"section section-system\">\n      <div class=\"section-heading\">\n        <p class=\"eyebrow\">Integrated lead growth system</p>\n        <h2>Build the conditions for better leads and better follow-up.</h2>\n        <p>\n          We build or connect your lead intake, management, communication, offers, and invoices into one intentional crop farm. Agents can work every step of this process while the owner stays in control of branding, direction, and judgment calls.\n        </p>\n      </div>\n      <div class=\"ecosystem-steps\" aria-label=\"Landing page to CRM system steps\">\n        <article>\n          <span class=\"step-index\">01</span>\n          <h3>Create the landing page</h3>\n          <p>Give the offer a clear page, simple form, and direct path into the sales workspace.</p>\n        </article>\n        <article>\n          <span class=\"step-index\">02</span>\n          <h3>Bring in traffic</h3>\n          <p>Use Google Ads, marketing, SEO, and site updates to improve qualified lead flow.</p>\n        </article>\n        <article>\n          <span class=\"step-index\">03</span>\n          <h3>Work the lead</h3>\n          <p>Keep status, need, follow-up timing, and review points visible.</p>\n        </article>\n        <article>\n          <span class=\"step-index\">04</span>\n          <h3>Convert and improve</h3>\n          <p>Move good opportunities toward quotes, invoices, projects, or owner review.</p>\n        </article>\n      </div>\n      <div class=\"module-strip\" aria-label=\"Modular system pieces\">\n        <span>Landing page</span>\n        <span>Lead form</span>\n        <span>CRM workspace</span>\n        <span>AI communication</span>\n        <span>Ads and SEO</span>\n        <span>Iterative improvements</span>\n      </div>\n      <aside class=\"fun-fact\" aria-label=\"Fun fact about this page\">\n        <div class=\"leadhand-callout\">\n          <span class=\"leadhand-blob mini prop-spark\" aria-hidden=\"true\">\n            <span class=\"leadhand-sprout\"></span>\n            <span class=\"leadhand-eye eye-left\"></span>\n            <span class=\"leadhand-eye eye-right\"></span>\n          </span>\n          <div>\n            <span class=\"step-index\">Fun fact</span>\n            <p>\n              This product page, its SEO direction, CRM handoff, and AI chat are all built and managed with the same agent-supported process shown here, with humans giving light branding, aesthetic, and procedural direction.\n            </p>\n          </div>\n        </div>\n      </aside>\n    </section>\n\n    <section id=\"process\" class=\"section section-agents\">\n      <div class=\"agent-layout\">\n        <div class=\"section-heading\">\n        <p class=\"eyebrow\">Supervised process</p>\n        <h2>Agents can actively manage the work between inquiry and sale.</h2>\n        <p>\n            The system is designed for direct lead operations: agents can update statuses, qualify according to company standards, communicate with leads, keep records current, and surface anything that needs a person.\n        </p>\n        </div>\n        <div class=\"handoff-map\" aria-label=\"Agent managed lead workflow\">\n          <article class=\"handoff-card\">\n            <span class=\"shape-icon diamond\">1</span>\n            <div>\n              <h3>Intake</h3>\n              <p>Capture the lead from the page, chat, ads, or manual entry with useful source context.</p>\n            </div>\n          </article>\n          <article class=\"handoff-card\">\n            <span class=\"shape-icon circle\">2</span>\n            <div>\n              <h3>Qualify</h3>\n              <p>Check fit, need, timing, and required fields against your standards.</p>\n            </div>\n          </article>\n          <article class=\"handoff-card\">\n            <span class=\"shape-icon ticket\">3</span>\n            <div>\n              <h3>Communicate</h3>\n              <p>Send or prepare follow-up through chat, email, phone, or text while updating the CRM.</p>\n            </div>\n          </article>\n          <article class=\"handoff-card\">\n            <span class=\"shape-icon hex\">4</span>\n            <div>\n              <h3>Advance</h3>\n              <p>Move the lead through statuses toward estimate, quote, invoice, project, or close.</p>\n            </div>\n          </article>\n          <article class=\"handoff-card review-step\">\n            <span class=\"shape-icon review-icon\">!</span>\n            <div>\n              <h3>Escalate</h3>\n              <p>Pause for owner review when judgment, pricing, brand voice, or unusual details need a person.</p>\n            </div>\n          </article>\n        </div>\n        <div class=\"process-note\">\n          <strong>Human-supervised by design.</strong>\n          <span>Agents can do the operational work directly, while owners keep control over standards, offers, tone, and final calls.</span>\n        </div>\n      </div>\n    </section>\n\n    <section id=\"crm\" class=\"section section-crm\">\n      <div class=\"section-heading compact\">\n        <p class=\"eyebrow\">CRM workspace</p>\n        <h2>Your lead board, built around how you sell.</h2>\n        <p>\n          We set up a generic sales workspace that shows where every opportunity stands, what needs attention, and when a person should step in.\n        </p>\n      </div>\n      <div class=\"workspace-showcase\">\n        <div class=\"crm-board\" aria-label=\"Example sales workspace status buckets\">\n          <div class=\"bucket active\">\n            <span>New Inquiry</span>\n            <p>Fresh website leads and form submissions.</p>\n          </div>\n          <div class=\"bucket\">\n            <span>Contacted</span>\n            <p>First reply, call, or text has gone out.</p>\n          </div>\n          <div class=\"bucket\">\n            <span>Discovery</span>\n            <p>Learning the goal, timeline, and best-fit offer.</p>\n          </div>\n          <div class=\"bucket qualified\">\n            <span>Qualified</span>\n            <p>Ready for a quote, plan, or next sales step.</p>\n          </div>\n          <div class=\"bucket review\">\n            <span>Needs Review</span>\n            <p>A person should check details before moving forward.</p>\n          </div>\n          <div class=\"bucket\">\n            <span>Quote Needed</span>\n            <p>Prepare pricing, scope, or a recommended package.</p>\n          </div>\n          <div class=\"bucket\">\n            <span>Quote Sent</span>\n            <p>Waiting for response with follow-up scheduled.</p>\n          </div>\n          <div class=\"bucket\">\n            <span>Invoice Sent</span>\n            <p>Ready for payment, onboarding, or activation.</p>\n          </div>\n          <div class=\"bucket won\">\n            <span>Won</span>\n            <p>Converted customer or active project.</p>\n          </div>\n        </div>\n        <div class=\"workspace-note\" aria-label=\"Workspace example details\">\n          <h3>Configurable setup</h3>\n          <p>\n            Statuses, fields, follow-up timing, and review points can match your business. A contractor, design studio, local service, or software offer may need different checkpoints.\n          </p>\n          <div class=\"mini-fields\">\n            <span>Need</span>\n            <span>Website</span>\n            <span>Best contact</span>\n            <span>Follow-up time</span>\n            <span>Owner review</span>\n          </div>\n          <span class=\"leadhand-blob mini prop-clipboard workspace-leadhand\" aria-hidden=\"true\">\n            <span class=\"leadhand-sprout\"></span>\n            <span class=\"leadhand-eye eye-left\"></span>\n            <span class=\"leadhand-eye eye-right\"></span>\n          </span>\n        </div>\n      </div>\n    </section>\n\n    <section id=\"review\" class=\"section section-review\">\n      <div class=\"review-copy\">\n        <p class=\"eyebrow\">Start simple</p>\n        <h2>Schedule a lead system review.</h2>\n        <p>\n          Share the business idea, current website if you have one, and what is missing or getting stuck. This can be a new business with no current website or CRM. The first pass shows what your landing page, CRM workspace, and communication process could look like.\n        </p>\n      </div>\n\n      <form class=\"lead-form\" id=\"leadForm\">\n        <div class=\"form-row two\">\n          <label>\n            <span>First name</span>\n            <input name=\"firstName\" autocomplete=\"given-name\" required />\n          </label>\n          <label>\n            <span>Last name</span>\n            <input name=\"lastName\" autocomplete=\"family-name\" required />\n          </label>\n        </div>\n        <div class=\"form-row two\">\n          <label>\n            <span>Email</span>\n            <input name=\"email\" type=\"email\" autocomplete=\"email\" required />\n          </label>\n          <label>\n            <span>Phone</span>\n            <input name=\"phone\" type=\"tel\" autocomplete=\"tel\" />\n          </label>\n        </div>\n        <label>\n          <span>Company name</span>\n          <input name=\"companyName\" autocomplete=\"organization\" />\n        </label>\n        <label>\n          <span>Website</span>\n          <input name=\"website\" inputmode=\"url\" placeholder=\"https://example.com\" />\n        </label>\n        <label>\n          <span>Pain point</span>\n          <textarea name=\"painPoint\" rows=\"5\" required placeholder=\"What are you missing, building from scratch, or trying to fix between website, CRM, ads, communication, or sales?\"></textarea>\n        </label>\n        <label>\n          <span>Contact preference</span>\n          <select name=\"contactPreference\">\n            <option>Text</option>\n            <option>Email</option>\n          </select>\n        </label>\n        <p class=\"form-legal\" id=\"smsConsentNotice\">\n          By submitting this form with contact preference set to Text, you consent to receive text messages from Timpson Application Development about your request. Message and data rates may apply. You can ask us to use another contact method at any time.\n        </p>\n        <button class=\"button primary form-submit\" type=\"submit\">Schedule review request</button>\n        <p class=\"form-status\" id=\"formStatus\" role=\"status\" aria-live=\"polite\"></p>\n        <button class=\"button secondary chat-start\" id=\"chatStartButton\" type=\"button\">\n          <span>Chat with Leadhand AI to add useful details</span>\n          <span class=\"leadhand-blob mini prop-chat\" aria-hidden=\"true\">\n            <span class=\"leadhand-sprout\"></span>\n            <span class=\"leadhand-eye eye-left\"></span>\n            <span class=\"leadhand-eye eye-right\"></span>\n          </span>\n        </button>\n      </form>\n    </section>\n  </div>\n<div class=\"chat-shell\" id=\"chatShell\" hidden>\n    <button class=\"chat-backdrop\" id=\"chatBackdrop\" type=\"button\" aria-label=\"Close AI lead chat\"></button>\n    <aside class=\"chat-panel\" aria-labelledby=\"chatTitle\">\n      <div class=\"chat-header\">\n        <div class=\"leadhand-avatar\" aria-hidden=\"true\">\n          <span class=\"leadhand-sprout\"></span>\n          <span class=\"leadhand-eye eye-left\"></span>\n          <span class=\"leadhand-eye eye-right\"></span>\n        </div>\n        <div>\n          <p class=\"eyebrow\">Leadhand AI</p>\n          <h3 id=\"chatTitle\">Ask how we can run your lead cultivation system.</h3>\n        </div>\n        <button class=\"chat-close\" id=\"chatCloseButton\" type=\"button\" aria-label=\"Close AI lead chat\">x</button>\n      </div>\n      <div class=\"chat-status\" id=\"chatStatus\" data-tone=\"neutral\">Ready to map your lead system</div>\n      <div class=\"chat-messages\" id=\"chatMessages\" aria-live=\"polite\"></div>\n      <div class=\"chat-options\" id=\"chatOptions\" hidden></div>\n      <form class=\"chat-form\" id=\"chatForm\">\n        <textarea id=\"chatInput\" rows=\"3\" data-example-placeholder=\"Example: We have a website, but leads are not being followed up consistently.\" placeholder=\"Example: We have a website, but leads are not being followed up consistently.\"></textarea>\n        <div class=\"chat-actions\">\n          <button class=\"button primary\" id=\"chatSendButton\" type=\"submit\">Send</button>\n          <button class=\"button secondary\" id=\"chatDoneButton\" type=\"button\">Done</button>\n        </div>\n      </form>\n    </aside>\n  </div>";

const LEADHAND_GREETING = "Hi, I’m Leadhand AI. I can walk you through our process, help clarify your current lead-flow pain point, or help you start a review request. What would you like to know or improve first?";

const DEFAULT_QUICK_RESPONSES = [
  'Show me how the lead system works.',
  'I am starting from scratch.',
  'My leads are not being followed up.',
];

const LEAD_INTAKE_API_URL =
  import.meta.env.VITE_LEAD_INTAKE_API_URL ||
  'https://n2s6trcvfc.execute-api.us-west-2.amazonaws.com/default/lead-intake/tad/create';

const LEAD_INTAKE_UPDATE_API_URL =
  import.meta.env.VITE_LEAD_INTAKE_UPDATE_API_URL ||
  LEAD_INTAKE_API_URL.replace(/\/create\/?$/, '/update');

const AI_CHAT_API_URL =
  import.meta.env.VITE_AI_CHAT_API_URL || 'https://56c1v9b79l.execute-api.us-east-1.amazonaws.com';

const AI_CHAT_COMPANY_ID =
  import.meta.env.VITE_AI_CHAT_COMPANY_ID || 'timpson-application-development';

const GOOGLE_ADS_STORAGE_KEY = 'tad_google_ads_obj';

type ChatRole = 'assistant' | 'user';

type LeadFormSnapshot = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  painPoint: string;
  contactPreference: string;
  saleStatus: string;
  followupRequested: boolean;
};

type SubmittedLead = {
  lead: LeadFormSnapshot;
  leadId: string;
  externalId: string;
  formSnapshot: Record<string, unknown>;
  leadDraft: Record<string, unknown>;
  skipCrmUpdate?: boolean;
};

type ChatResponse = {
  sessionId?: string;
  reply?: string;
  assistantGreeting?: string;
  fieldPatches?: Record<string, unknown>;
  enrichmentPayload?: {
    description?: string;
    ai_chat_summary?: string;
    pain_point?: string;
  };
  ai_chat_summary?: string;
  isUsefulCrmUpdate?: boolean;
  shouldFinalize?: boolean;
  quickResponses?: unknown[];
  quick_responses?: unknown[];
  responseOptions?: unknown[];
  response_options?: unknown[];
};

type GoogleAdsObj = {
  transaction_id?: string;
  gclid?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function appendChatMessage(chatMessages: Element | null, role: ChatRole, text: string) {
  if (!chatMessages || !text) return;
  const message = document.createElement('div');
  message.className = `chat-message ${role}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderChatOptions(chatOptions: HTMLElement | null, options: unknown[], onSelect: (message: string) => void) {
  if (!chatOptions) return;
  chatOptions.innerHTML = '';
  const normalizedOptions = options.map(normalizeChatOption).filter(Boolean);
  if (normalizedOptions.length === 0) {
    chatOptions.hidden = true;
    return;
  }
  normalizedOptions.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chat-option';
    button.textContent = option;
    button.addEventListener('click', () => onSelect(option));
    chatOptions.appendChild(button);
  });
  chatOptions.hidden = false;
}

function normalizeChatOption(option: unknown) {
  if (typeof option === 'string') return option.trim();
  if (!option || typeof option !== 'object') return '';
  const candidate = option as Record<string, unknown>;
  return String(candidate.label || candidate.text || candidate.message || candidate.value || '').trim();
}

function getQuickResponses(data?: ChatResponse) {
  if (!data) return [];
  return data.quickResponses || data.quick_responses || data.responseOptions || data.response_options || [];
}

function getFormValue(form: HTMLFormElement, name: string) {
  const value = new FormData(form).get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function createExternalId() {
  return `tad-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function buildLeadTransactionId() {
  return `LEAD${Date.now()}`;
}

function readStoredGoogleAdsObj(): GoogleAdsObj {
  try {
    const stored = window.sessionStorage.getItem(GOOGLE_ADS_STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeStoredGoogleAdsObj(googleAdsObj: GoogleAdsObj) {
  try {
    window.sessionStorage.setItem(GOOGLE_ADS_STORAGE_KEY, JSON.stringify(googleAdsObj));
  } catch {
    // Attribution storage is helpful, but should never block the lead form.
  }
}

function getFirstQueryParam(searchParams: URLSearchParams, names: string[]) {
  for (const name of names) {
    const value = searchParams.get(name);
    if (value) return value;
  }
  return '';
}

function compactGoogleAdsObj(googleAdsObj: GoogleAdsObj) {
  return Object.fromEntries(
    Object.entries(googleAdsObj).filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
  ) as GoogleAdsObj;
}

function captureGoogleAdsObj(transactionId?: string) {
  const stored = readStoredGoogleAdsObj();
  const searchParams = new URLSearchParams(window.location.search);
  const current = compactGoogleAdsObj({
    gclid: getFirstQueryParam(searchParams, ['gclid']),
  });

  const merged = compactGoogleAdsObj({
    gclid: current.gclid || stored.gclid,
    transaction_id: transactionId || stored.transaction_id,
  });

  writeStoredGoogleAdsObj(merged);
  return merged;
}

function serializeGoogleAdsObj(googleAdsObj: GoogleAdsObj) {
  return Object.entries(googleAdsObj)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim())
    .map(([key, value]) => `${key}=${String(value)}`)
    .join('; ');
}

function pushLeadSubmitEvent(eventName: string, leadId: string, googleAdsObj: GoogleAdsObj) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    lead_id: leadId,
    transaction_id: googleAdsObj.transaction_id || '',
    google_ads_obj: googleAdsObj,
  });
}

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isExplicitWebsiteUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed || /\s/.test(trimmed)) return false;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return Boolean(url.hostname.includes('.') && !url.hostname.endsWith('.'));
  } catch {
    return false;
  }
}

function getAiEndpoint(path: string) {
  return `${AI_CHAT_API_URL.replace(/\/$/, '')}${path}`;
}

function getPersistableChatSessionId(chatSessionId = '') {
  return chatSessionId.startsWith('local-') ? '' : chatSessionId;
}

function readLeadForm(form: HTMLFormElement): LeadFormSnapshot {
  const firstName = getFormValue(form, 'firstName');
  const lastName = getFormValue(form, 'lastName');
  return {
    firstName,
    lastName,
    fullName: [firstName, lastName].filter(Boolean).join(' '),
    email: getFormValue(form, 'email'),
    phone: getFormValue(form, 'phone'),
    companyName: getFormValue(form, 'companyName'),
    website: normalizeWebsite(getFormValue(form, 'website')),
    painPoint: getFormValue(form, 'painPoint'),
    contactPreference: getFormValue(form, 'contactPreference') || 'Text',
    saleStatus: 'New Inquiry',
    followupRequested: true,
  };
}

function buildFormSnapshot(form: HTMLFormElement, leadId: string) {
  const lead = readLeadForm(form);
  const googleAdsObj = captureGoogleAdsObj();
  return {
    companyId: AI_CHAT_COMPANY_ID,
    leadId,
    companyName: lead.companyName,
    website: lead.website,
    painPoint: lead.painPoint,
    contactPreference: lead.contactPreference,
    saleStatus: lead.saleStatus,
    hasFullName: Boolean(lead.fullName),
    hasEmail: Boolean(lead.email),
    hasPhone: Boolean(lead.phone),
    pageUrl: window.location.href,
    referrer: document.referrer || '',
    google_ads_obj: googleAdsObj,
    has_google_click_id: Boolean(googleAdsObj.gclid),
  };
}

function buildLeadDraft(form: HTMLFormElement, leadId: string) {
  const lead = readLeadForm(form);
  const fieldStatus = {
    firstName: lead.firstName ? 'provided' : 'empty',
    lastName: lead.lastName ? 'provided' : 'empty',
    email: lead.email ? 'provided' : 'empty',
    phone: lead.phone ? 'provided' : 'empty',
    companyName: lead.companyName ? 'provided' : 'empty',
    website: lead.website ? 'provided' : 'empty',
    painPoint: lead.painPoint ? 'provided' : 'empty',
    contactPreference: lead.contactPreference ? 'provided' : 'empty',
    saleStatus: lead.saleStatus ? 'provided' : 'empty',
  };

  return {
    crmId: leadId,
    companyId: AI_CHAT_COMPANY_ID,
    fields: {
      hasFullName: Boolean(lead.fullName),
      hasEmail: Boolean(lead.email),
      hasPhone: Boolean(lead.phone),
      firstName: lead.firstName,
      lastName: lead.lastName,
      companyName: lead.companyName,
      website: lead.website,
      painPoint: lead.painPoint,
      contactPreference: lead.contactPreference,
      saleStatus: lead.saleStatus,
      followupRequested: lead.followupRequested,
    },
    fieldStatus,
    patchableFields: {
      firstName: 'Visitor first name. Patch only if the visitor clearly provides it.',
      lastName: 'Visitor last name. Patch only if the visitor clearly provides it.',
      email: 'Visitor email address. Patch only if the visitor clearly provides it.',
      phone: 'Visitor phone number. Patch only if the visitor clearly provides it.',
      companyName: 'Business or organization name.',
      website:
        'Business website URL only. Patch only when the visitor provides an explicit URL or domain, such as example.com or https://example.com. Do not patch this field from statements like "yes", "we have a website", or "I have one".',
      painPoint:
        'Running summary of the lead-flow pain point plus relevant chat details that do not map cleanly to another form field. Include notes such as whether the visitor has a website, CRM, lead form, ads, SEO, or follow-up process when no explicit field value is provided.',
      contactPreference: 'One of: Email, Text.',
    },
    fieldPatchInstructions:
      'If a visitor message contains information that maps explicitly to one or more patchableFields, return fieldPatches for those fields. Use painPoint for the stated process issue and for relevant details that do not map cleanly to another field. Patch website only when the visitor provides an explicit URL or domain. Patch email or phone only when the visitor clearly provides the value.',
    missingRequiredFields: Object.entries(fieldStatus)
      .filter(([field, value]) => ['firstName', 'lastName', 'email', 'painPoint'].includes(field) && value === 'empty')
      .map(([field]) => field),
  };
}

function appendLeadFormData(payload: FormData, form: HTMLFormElement, chatSessionId = '') {
  const lead = readLeadForm(form);
  const transactionId = buildLeadTransactionId();
  const googleAdsObj = captureGoogleAdsObj(transactionId);

  payload.append('external_id', form.dataset.externalId || '');
  payload.append('transaction_id', transactionId);
  appendIfValue(payload, 'openai_sid', getPersistableChatSessionId(chatSessionId));
  appendLeadFields(payload, lead);
  payload.append('google_ads_obj', serializeGoogleAdsObj(googleAdsObj));

  return googleAdsObj;
}

function appendLeadFields(payload: FormData, lead: LeadFormSnapshot) {
  payload.append('firstName', lead.firstName);
  payload.append('lastName', lead.lastName);
  payload.append('email', lead.email);
  payload.append('phone', lead.phone);
  payload.append('company_name', lead.companyName);
  payload.append('website', lead.website);
  payload.append('pain_point', lead.painPoint);
  payload.append('contact_preference', lead.contactPreference);
}

function appendIfValue(payload: FormData, key: string, value: string) {
  if (value.trim()) payload.append(key, value.trim());
}

async function parseLeadCreateResult(response: Response) {
  const text = await response.text();
  if (!text) throw new Error('CRM lead response was empty');

  try {
    const data = JSON.parse(text);
    const failedImport = Array.isArray(data.imports)
      ? data.imports.find((item: { status?: number }) => Number(item?.status) >= 400)
      : null;
    if (failedImport) {
      throw new Error('CRM import failed');
    }
    const importedId = Array.isArray(data.imports)
      ? data.imports.find((item: { id?: string }) => item?.id)?.id
      : '';
    const leadId = String(importedId || data._id || data.id || data.leadId || data.lead_id || '');
    if (!leadId) {
      throw new Error('CRM lead response did not include a lead id');
    }
    return leadId;
  } catch (error) {
    if (error instanceof Error && error.message) throw error;
    throw new Error('CRM lead response could not be parsed');
  }
}

function AgentsProductPage() {
  useEffect(() => {
    const root = document.querySelector('.agents-page');
    const hero = root?.querySelector<HTMLElement>('.hero') ?? null;
    const heroLayerButtons = root?.querySelectorAll<HTMLButtonElement>('[data-hero-layer-target]') || [];
    const form = root?.querySelector<HTMLFormElement>('#leadForm') ?? null;
    const status = root?.querySelector<HTMLElement>('#formStatus') ?? null;
    const contactPreferenceSelect = form?.elements.namedItem('contactPreference') as HTMLSelectElement | null;
    const smsConsentNotice = root?.querySelector<HTMLElement>('#smsConsentNotice') ?? null;
    const chatStartButton = root?.querySelector<HTMLButtonElement>('#chatStartButton') ?? null;
    const chatFab = root?.querySelector<HTMLButtonElement>('#chatFab') ?? null;
    const chatShell = root?.querySelector<HTMLElement>('#chatShell') ?? null;
    const chatBackdrop = root?.querySelector<HTMLButtonElement>('#chatBackdrop') ?? null;
    const chatCloseButton = root?.querySelector<HTMLButtonElement>('#chatCloseButton') ?? null;
    const chatStatus = root?.querySelector<HTMLElement>('#chatStatus') ?? null;
    const chatMessages = root?.querySelector<HTMLElement>('#chatMessages') ?? null;
    const chatOptions = root?.querySelector<HTMLElement>('#chatOptions') ?? null;
    const chatForm = root?.querySelector<HTMLFormElement>('#chatForm') ?? null;
    const chatInput = root?.querySelector<HTMLTextAreaElement>('#chatInput') ?? null;
    const chatSendButton = root?.querySelector<HTMLButtonElement>('#chatSendButton') ?? null;
    const chatDoneButton = root?.querySelector<HTMLButtonElement>('#chatDoneButton') ?? null;
    const chatExamplePlaceholder = chatInput?.dataset.examplePlaceholder || '';
    let currentHeroLayer = 1;
    let heroLayerTimer = 0;
    let chatHasUserMessage = false;
    let chatStarted = false;
    let chatSessionId = '';
    let chatBusy = false;
    let chatOffline = false;
    const externalId = createExternalId();
    let submittedLead: SubmittedLead | null = null;
    let lastSyncedPainPoint = '';
    let lastSyncedChatSessionId = '';
    const chatDraft: { fieldPatches: Record<string, string> } = { fieldPatches: {} };

    if (form) form.dataset.externalId = externalId;

    const setHeroLayer = (layer: string | number | undefined) => {
      if (!hero) return;
      const nextLayer = Math.min(Math.max(Number(layer) || 1, 1), 5);
      currentHeroLayer = nextLayer;
      hero.dataset.heroLayer = String(nextLayer);
    };

    const startHeroLayerLoop = () => {
      if (!hero) return;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setHeroLayer(hero.dataset.heroLayer || 1);
      if (reducedMotion) return;
      window.clearInterval(heroLayerTimer);
      heroLayerTimer = window.setInterval(() => {
        setHeroLayer(currentHeroLayer >= 5 ? 1 : currentHeroLayer + 1);
      }, 5760);
    };

    const updateSmsConsentVisibility = () => {
      if (!smsConsentNotice || !contactPreferenceSelect) return;
      smsConsentNotice.hidden = contactPreferenceSelect.value !== 'Text';
    };

    const updateChatPlaceholder = () => {
      if (!chatInput) return;
      chatInput.placeholder = chatHasUserMessage ? '' : chatExamplePlaceholder;
    };

    const setChatStatus = (message: string, tone = 'neutral') => {
      if (!chatStatus) return;
      chatStatus.textContent = message;
      chatStatus.dataset.tone = tone;
    };

    const setChatBusy = (isBusy: boolean) => {
      chatBusy = isBusy;
      if (chatInput) chatInput.disabled = isBusy;
      if (chatSendButton) chatSendButton.disabled = isBusy;
      if (chatDoneButton) chatDoneButton.disabled = isBusy;
    };

    const createDraftLeadFromForm = () => {
      if (!form) return null;
      const lead = readLeadForm(form);
      const leadId = submittedLead?.leadId || `draft-${externalId}`;
      submittedLead = {
        lead,
        leadId,
        externalId,
        formSnapshot: buildFormSnapshot(form, leadId),
        leadDraft: buildLeadDraft(form, leadId),
        skipCrmUpdate: true,
      };
      return submittedLead;
    };

    const refreshSubmittedLeadFromForm = () => {
      if (!form) return null;
      if (!submittedLead) return createDraftLeadFromForm();
      const lead = readLeadForm(form);
      submittedLead = {
        ...submittedLead,
        lead,
        formSnapshot: buildFormSnapshot(form, submittedLead.leadId),
        leadDraft: buildLeadDraft(form, submittedLead.leadId),
      };
      return submittedLead;
    };

    const setFormField = (name: string, value: unknown) => {
      if (!form || value === undefined || value === null || value === '') return;
      if (name === 'website' && !isExplicitWebsiteUrl(String(value))) return;
      const field = form.elements.namedItem(name);
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
        return;
      }
      if (field.value && name !== 'painPoint') return;
      field.value = String(value);
      if (name === 'contactPreference') updateSmsConsentVisibility();
    };

    const appendPainPoint = (value: unknown) => {
      if (!form || !value) return;
      const field = form.elements.namedItem('painPoint');
      if (!(field instanceof HTMLTextAreaElement)) return;
      const current = String(field.value || '').trim();
      const next = String(value).trim();
      if (!next || current.includes(next)) return;
      field.value = current ? `${current}\n\n${next}` : next;
    };

    const mergeFieldPatches = (fieldPatches: Record<string, unknown> | undefined) => {
      if (!fieldPatches || typeof fieldPatches !== 'object') return [];
      const allowedFields = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'companyName',
        'website',
        'painPoint',
        'description',
        'contactPreference',
      ];
      const safePatches: Record<string, string> = {};

      Object.entries(fieldPatches).forEach(([field, value]) => {
        if (!allowedFields.includes(field) || typeof value !== 'string' || !value.trim()) return;
        const trimmedValue = value.trim();
        if (field === 'website') {
          if (isExplicitWebsiteUrl(trimmedValue)) {
            safePatches.website = normalizeWebsite(trimmedValue);
          } else {
            const note = trimmedValue.endsWith('.') ? trimmedValue : `${trimmedValue}.`;
            safePatches.painPoint = [safePatches.painPoint, note].filter(Boolean).join('\n\n');
          }
          return;
        }
        safePatches[field] = trimmedValue;
      });

      chatDraft.fieldPatches = { ...chatDraft.fieldPatches, ...safePatches };
      return Object.keys(safePatches);
    };

    const applyFieldPatches = (fieldPatches: Record<string, unknown> | undefined, agentContext = '') => {
      if (!form) return [];
      const patchKeys = mergeFieldPatches(fieldPatches);
      const patches = chatDraft.fieldPatches;
      setFormField('firstName', patches.firstName);
      setFormField('lastName', patches.lastName);
      setFormField('email', patches.email);
      setFormField('phone', patches.phone);
      setFormField('companyName', patches.companyName);
      setFormField('website', patches.website);
      setFormField('contactPreference', patches.contactPreference);
      appendPainPoint(patches.painPoint || patches.description || agentContext);

      refreshSubmittedLeadFromForm();
      return patchKeys;
    };

    const showTypingIndicator = () => {
      if (!chatMessages) return null;
      const indicator = document.createElement('div');
      indicator.className = 'chat-message assistant typing';
      indicator.textContent = '...';
      chatMessages.appendChild(indicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return indicator;
    };

    const updateCrmLead = async (enrichmentPayload?: ChatResponse['enrichmentPayload'], fallbackSummary = '') => {
      if (!form) return;
      const currentLead = refreshSubmittedLeadFromForm();
      if (!currentLead || currentLead.skipCrmUpdate || !currentLead.leadId || currentLead.leadId.startsWith('draft-')) return;

      const agentContext =
        enrichmentPayload?.pain_point ||
        enrichmentPayload?.description ||
        enrichmentPayload?.ai_chat_summary ||
        fallbackSummary;

      appendPainPoint(agentContext);
      const painPoint = getFormValue(form, 'painPoint');
      const shouldSyncPainPoint = Boolean(painPoint && painPoint !== lastSyncedPainPoint);
      const persistableChatSessionId = getPersistableChatSessionId(chatSessionId);
      const shouldSyncChatSessionId = Boolean(
        persistableChatSessionId && persistableChatSessionId !== lastSyncedChatSessionId
      );
      if (!shouldSyncPainPoint && !shouldSyncChatSessionId) return;

      const payload = new FormData();
      payload.append('_id', currentLead.leadId);
      payload.append('external_id', currentLead.externalId);
      appendIfValue(payload, 'openai_sid', persistableChatSessionId);
      appendLeadFields(payload, readLeadForm(form));
      payload.append('google_ads_obj', serializeGoogleAdsObj(captureGoogleAdsObj()));

      const response = await fetch(LEAD_INTAKE_UPDATE_API_URL, {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) throw new Error('CRM update webhook failed');
      lastSyncedPainPoint = painPoint;
      if (persistableChatSessionId) lastSyncedChatSessionId = persistableChatSessionId;
    };

    const startChatSession = async () => {
      if (chatSessionId || chatBusy || !form) return;
      if (!submittedLead) createDraftLeadFromForm();
      refreshSubmittedLeadFromForm();
      setChatBusy(true);
      setChatStatus('Connecting Leadhand AI...', 'neutral');

      try {
        const response = await fetch(getAiEndpoint('/chat/session'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyId: AI_CHAT_COMPANY_ID,
            leadId: submittedLead?.leadId || '',
            formSnapshot: submittedLead?.formSnapshot || {},
            leadDraft: submittedLead?.leadDraft || {},
            skipCrmUpdate: Boolean(submittedLead?.skipCrmUpdate),
          }),
        });

        if (!response.ok) throw new Error('AI chat session failed');
        const data = (await response.json()) as ChatResponse;
        chatSessionId = data.sessionId || `local-${externalId}`;
        appendChatMessage(chatMessages, 'assistant', data.reply || data.assistantGreeting || LEADHAND_GREETING);
        renderChatOptions(chatOptions, getQuickResponses(data).length ? getQuickResponses(data) : DEFAULT_QUICK_RESPONSES, sendChatMessage);
        setChatStatus('Connected', 'success');
        await updateCrmLead(undefined, '');
      } catch (error) {
        console.error('AI chat session failed:', error);
        chatOffline = true;
        chatSessionId = `local-${externalId}`;
        appendChatMessage(chatMessages, 'assistant', LEADHAND_GREETING);
        renderChatOptions(chatOptions, DEFAULT_QUICK_RESPONSES, sendChatMessage);
        setChatStatus('Drafting form context', 'warning');
      } finally {
        setChatBusy(false);
      }
    };

    async function sendChatMessage(messageOverride?: string) {
      const message = (messageOverride || chatInput?.value || '').trim();
      if (!message || chatBusy) return;
      if (!chatSessionId) await startChatSession();
      if (!chatSessionId) return;
      refreshSubmittedLeadFromForm();
      if (chatInput) chatInput.value = '';
      chatHasUserMessage = true;
      updateChatPlaceholder();
      renderChatOptions(chatOptions, [], sendChatMessage);
      appendChatMessage(chatMessages, 'user', message);
      const typing = showTypingIndicator();
      setChatBusy(true);
      setChatStatus('AI is writing...', 'neutral');

      if (chatOffline) {
        window.setTimeout(() => {
          typing?.remove();
          appendChatMessage(
            chatMessages,
            'assistant',
            'Got it. I can use that to start the review form. Add anything about your website, CRM, ads, follow-up, or current sales process.'
          );
          setChatStatus('Drafting form context', 'warning');
          setChatBusy(false);
        }, 450);
        return;
      }

      try {
        const response = await fetch(getAiEndpoint('/chat/message'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: chatSessionId,
            message,
            leadId: submittedLead?.leadId || '',
            formSnapshot: submittedLead?.formSnapshot || {},
            leadDraft: submittedLead?.leadDraft || {},
            skipCrmUpdate: Boolean(submittedLead?.skipCrmUpdate),
          }),
        });

        if (!response.ok) throw new Error('AI chat message failed');
        const data = (await response.json()) as ChatResponse;
        typing?.remove();
        appendChatMessage(chatMessages, 'assistant', data.reply || 'Thanks. I saved that context.');
        applyFieldPatches(data.fieldPatches, data.enrichmentPayload?.description || data.ai_chat_summary || '');
        renderChatOptions(chatOptions, getQuickResponses(data), sendChatMessage);
        if (data.isUsefulCrmUpdate !== false) {
          await updateCrmLead(data.enrichmentPayload, data.ai_chat_summary || '');
        }
        setChatStatus(data.shouldFinalize ? 'Context saved' : 'Connected', 'success');
      } catch (error) {
        console.error('AI chat message failed:', error);
        typing?.remove();
        appendChatMessage(
          chatMessages,
          'assistant',
          'I had trouble saving that answer. Please include it in the review request if needed.'
        );
        setChatStatus('Connection issue', 'warning');
      } finally {
        setChatBusy(false);
      }
    }

    const openChat = () => {
      if (!chatShell) return;
      chatShell.hidden = false;
      chatInput?.focus();
      if (!chatStarted) {
        chatStarted = true;
        void startChatSession();
      }
    };

    const closeChat = () => {
      if (chatShell) chatShell.hidden = true;
    };

    const finalizeChat = async () => {
      if (!chatSessionId || chatBusy) {
        closeChat();
        return;
      }
      if (chatOffline) {
        closeChat();
        return;
      }
      refreshSubmittedLeadFromForm();
      setChatBusy(true);
      setChatStatus('Saving context...', 'neutral');

      try {
        const response = await fetch(getAiEndpoint('/chat/finalize'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: chatSessionId,
            reason: 'user_done',
            leadId: submittedLead?.leadId || '',
            formSnapshot: submittedLead?.formSnapshot || {},
            leadDraft: submittedLead?.leadDraft || {},
            skipCrmUpdate: Boolean(submittedLead?.skipCrmUpdate),
          }),
        });

        if (!response.ok) throw new Error('AI chat finalize failed');
        const data = (await response.json()) as ChatResponse;
        await updateCrmLead(data.enrichmentPayload, data.ai_chat_summary || '');
        setChatStatus('Context saved', 'success');
        closeChat();
      } catch (error) {
        console.error('AI chat finalize failed:', error);
        setChatStatus('Context may not have saved', 'warning');
      } finally {
        setChatBusy(false);
      }
    };

    const heroHandlers = Array.from(heroLayerButtons).map((button) => {
      const handler = () => {
        setHeroLayer(button.dataset.heroLayerTarget);
        startHeroLayerLoop();
      };
      button.addEventListener('click', handler);
      return () => button.removeEventListener('click', handler);
    });

    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      if (!form || !status) return;
      status.dataset.tone = 'neutral';
      status.textContent = 'Sending your review request...';

      try {
        const payload = new FormData();
        const googleAdsObj = appendLeadFormData(payload, form, chatSessionId);

        const response = await fetch(LEAD_INTAKE_API_URL, {
          method: 'POST',
          body: payload,
        });

        if (!response.ok) {
          throw new Error('Lead intake request failed');
        }

        const leadId = await parseLeadCreateResult(response);
        const lead = readLeadForm(form);
        form.dataset.leadId = leadId;
        submittedLead = {
          lead,
          leadId: leadId || `draft-${externalId}`,
          externalId,
          formSnapshot: buildFormSnapshot(form, leadId),
          leadDraft: buildLeadDraft(form, leadId),
          skipCrmUpdate: !leadId,
        };
        lastSyncedPainPoint = lead.painPoint;
        const persistableChatSessionId = getPersistableChatSessionId(chatSessionId);
        if (persistableChatSessionId) lastSyncedChatSessionId = persistableChatSessionId;
        pushLeadSubmitEvent('tad_agents_lead_submit', leadId, googleAdsObj);
        status.dataset.tone = 'success';
        status.textContent = 'Review request received. You can keep chatting with Leadhand AI to add useful details.';
      } catch (error) {
        console.error('Lead intake submission failed:', error);
        status.dataset.tone = 'warning';
        status.textContent = 'We could not send the request. Please try again or contact us directly.';
      }
    };

    const handleChatSubmit = (event: Event) => {
      event.preventDefault();
      void sendChatMessage();
    };

    const handleChatInputKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;
      event.preventDefault();
      void sendChatMessage();
    };

    form?.addEventListener('submit', handleSubmit);
    contactPreferenceSelect?.addEventListener('change', updateSmsConsentVisibility);
    chatStartButton?.addEventListener('click', openChat);
    chatFab?.addEventListener('click', openChat);
    chatBackdrop?.addEventListener('click', closeChat);
    chatCloseButton?.addEventListener('click', closeChat);
    chatDoneButton?.addEventListener('click', finalizeChat);
    chatForm?.addEventListener('submit', handleChatSubmit);
    chatInput?.addEventListener('keydown', handleChatInputKeydown);
    window.addEventListener('agents:open-chat', openChat);

    startHeroLayerLoop();
    updateSmsConsentVisibility();
    updateChatPlaceholder();

    return () => {
      window.clearInterval(heroLayerTimer);
      heroHandlers.forEach((cleanup) => cleanup());
      form?.removeEventListener('submit', handleSubmit);
      contactPreferenceSelect?.removeEventListener('change', updateSmsConsentVisibility);
      chatStartButton?.removeEventListener('click', openChat);
      chatFab?.removeEventListener('click', openChat);
      chatBackdrop?.removeEventListener('click', closeChat);
      chatCloseButton?.removeEventListener('click', closeChat);
      chatDoneButton?.removeEventListener('click', finalizeChat);
      chatForm?.removeEventListener('submit', handleChatSubmit);
      chatInput?.removeEventListener('keydown', handleChatInputKeydown);
      window.removeEventListener('agents:open-chat', openChat);
    };
  }, []);

  return <div className="agents-page" dangerouslySetInnerHTML={{ __html: AGENTS_MARKUP }} />;
}

export default AgentsProductPage;
