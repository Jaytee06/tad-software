import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const baseHtmlPath = join(distDir, 'index.html');
const siteOrigin = 'https://tad.software';
const ogImageUrl = `${siteOrigin}/og-image.png`;

const routeDefinitions = [
  {
    output: 'index.html',
    canonicalPath: '/',
    title: 'Timpson Application Development | Websites & CRM for Small Businesses',
    description:
      'Affordable websites and simple CRM software for small businesses, with USA-based support and practical lead management.',
    aliases: [],
  },
  {
    output: 'agents/index.html',
    canonicalPath: '/agents/',
    title: 'Agent Lead Growth System | Timpson Application Development',
    description:
      'A human-supervised lead growth system that connects landing pages, CRM workflow, AI communication, ads, and SEO for small businesses.',
    aliases: [],
  },
  {
    output: 'terms/index.html',
    canonicalPath: '/terms/',
    title: 'Terms & Conditions | Timpson Application Development',
    description:
      'Terms governing access to the Timpson Application Development website and the website, hosting, CRM, and software services provided to customers.',
    aliases: ['terms-and-conditions/index.html'],
  },
  {
    output: 'privacy/index.html',
    canonicalPath: '/privacy/',
    title: 'Privacy Policy | Timpson Application Development',
    description:
      'Privacy policy covering what information Timpson Application Development collects, how it is used, and the choices available to visitors and customers.',
    aliases: ['privacy-policy/index.html'],
  },
];

const escapeAttribute = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const escapeText = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function upsertTag(html, pattern, replacement) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html.replace('</head>', `  ${replacement}\n</head>`);
}

function applySeoMetadata(html, route) {
  const canonicalUrl = `${siteOrigin}${route.canonicalPath}`;

  let nextHtml = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeText(route.title)}</title>`);

  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+name="description"[\s\S]*?\/>/i,
    `<meta name="description" content="${escapeAttribute(route.description)}" />`
  );
  nextHtml = upsertTag(nextHtml, /<meta\s+name="robots"[\s\S]*?\/>/i, '<meta name="robots" content="index,follow" />');
  nextHtml = upsertTag(
    nextHtml,
    /<link\s+rel="canonical"[\s\S]*?>/i,
    `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />`
  );
  nextHtml = upsertTag(nextHtml, /<meta\s+property="og:type"[\s\S]*?\/>/i, '<meta property="og:type" content="website" />');
  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+property="og:site_name"[\s\S]*?\/>/i,
    '<meta property="og:site_name" content="Timpson Application Development" />'
  );
  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+property="og:title"[\s\S]*?\/>/i,
    `<meta property="og:title" content="${escapeAttribute(route.title)}" />`
  );
  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+property="og:description"[\s\S]*?\/>/i,
    `<meta property="og:description" content="${escapeAttribute(route.description)}" />`
  );
  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+property="og:url"[\s\S]*?\/>/i,
    `<meta property="og:url" content="${escapeAttribute(canonicalUrl)}" />`
  );
  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+property="og:image"[\s\S]*?\/>/i,
    `<meta property="og:image" content="${escapeAttribute(ogImageUrl)}" />`
  );
  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+name="twitter:card"[\s\S]*?\/>/i,
    '<meta name="twitter:card" content="summary_large_image" />'
  );
  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+name="twitter:title"[\s\S]*?\/>/i,
    `<meta name="twitter:title" content="${escapeAttribute(route.title)}" />`
  );
  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+name="twitter:description"[\s\S]*?\/>/i,
    `<meta name="twitter:description" content="${escapeAttribute(route.description)}" />`
  );
  nextHtml = upsertTag(
    nextHtml,
    /<meta\s+name="twitter:image"[\s\S]*?\/>/i,
    `<meta name="twitter:image" content="${escapeAttribute(ogImageUrl)}" />`
  );

  return nextHtml;
}

const baseHtml = await readFile(baseHtmlPath, 'utf8');

for (const route of routeDefinitions) {
  const routeHtml = applySeoMetadata(baseHtml, route);
  const outputPaths = [route.output, ...route.aliases];

  for (const relativeOutputPath of outputPaths) {
    const outputPath = join(distDir, relativeOutputPath);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml);
  }
}
