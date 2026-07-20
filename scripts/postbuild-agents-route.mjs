import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const baseHtmlPath = join(distDir, 'index.html');
const siteOrigin = 'https://tad.software';
const ogImageUrl = `${siteOrigin}/og-image.png`;
const organizationId = `${siteOrigin}/#organization`;

const staticContentByPath = {
  '/': {
    eyebrow: 'Websites, CRM, and practical automation',
    h1: 'Simple technology that helps small businesses win and manage more work.',
    intro: 'Timpson Application Development builds affordable websites, practical CRM systems, and human-supervised lead automation for small businesses across the United States.',
    sections: [
      ['Small business websites', 'Mobile-friendly websites with clear services, lead capture, analytics, hosting, and a sound search foundation.', '/small-business-websites/'],
      ['Small business CRM', 'A straightforward pipeline for inquiries, customer context, follow-up, and next steps.', '/small-business-crm/'],
      ['AI lead automation', 'Controlled workflows that connect intake, CRM updates, follow-up, and human review.', '/ai-lead-automation/'],
    ],
  },
  '/agents/': {
    eyebrow: 'Human-supervised lead operations',
    h1: 'From first click to signed work.',
    intro: 'Connect landing pages, lead intake, CRM workflow, AI-assisted communication, advertising, SEO, and owner review into one intentional system.',
    sections: [
      ['Capture useful context', 'Preserve the source, need, timing, and contact details that make follow-up productive.', '/ai-lead-automation/'],
      ['Keep the pipeline current', 'Move leads through clear statuses while surfacing decisions that need a person.', '/small-business-crm/'],
      ['Improve the whole path', 'Measure what happens between traffic, inquiry, qualification, and sale.', '/small-business-websites/'],
    ],
  },
  '/small-business-websites/': {
    eyebrow: 'Small business website design',
    h1: 'A professional website built to turn local interest into real inquiries.',
    intro: 'TAD designs, hosts, and supports fast small-business websites with clear offers, mobile-friendly pages, lead capture, analytics, and a practical technical SEO foundation.',
    sections: [
      ['Search-ready structure', 'Focused pages, descriptive metadata, internal links, sitemap support, and structured data create a clean foundation for discovery.', '/#contact'],
      ['Conversion-focused design', 'Clear messaging, accessible calls to action, and useful forms help qualified visitors take the next step.', '/#contact'],
      ['Hosting and support', 'TAD can handle hosting, routine updates, measurement, and improvements after launch.', '/#contact'],
    ],
  },
  '/small-business-crm/': {
    eyebrow: 'CRM for small businesses',
    h1: 'A simple sales pipeline your team will actually keep up to date.',
    intro: 'Organize inquiries, customer details, notes, next steps, and follow-up in one small-business CRM built around the way your team sells.',
    sections: [
      ['Lead pipeline', 'Track new inquiries, contacted leads, qualified opportunities, quotes, wins, and review points.', '/#contact'],
      ['Customer history', 'Keep contact details, notes, needs, activities, and follow-up timing together.', '/#contact'],
      ['Connected intake', 'Route website and campaign inquiries into the CRM with useful source information.', '/#contact'],
    ],
  },
  '/ai-lead-automation/': {
    eyebrow: 'Human-supervised AI automation',
    h1: 'Respond to leads faster without giving up human judgment.',
    intro: 'TAD connects landing pages, CRM workflow, AI-assisted communication, qualification, and owner review into a controlled lead process.',
    sections: [
      ['Lead intake automation', 'Capture form and chat details, preserve campaign context, and create a clean record.', '/#contact'],
      ['Guided follow-up', 'Prepare consistent responses while keeping CRM status and notes current.', '/#contact'],
      ['Human review gates', 'Define where automation stops for pricing, fit, tone, exceptions, or owner approval.', '/#contact'],
    ],
  },
  '/terms/': { eyebrow: 'Legal', h1: 'Terms and Conditions', intro: 'Terms governing access to the TAD website and the services provided to customers.', sections: [] },
  '/privacy/': { eyebrow: 'Legal', h1: 'Privacy Policy', intro: 'How Timpson Application Development collects, uses, and protects information.', sections: [] },
};

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
    output: 'small-business-websites/index.html',
    canonicalPath: '/small-business-websites/',
    title: 'Small Business Website Design & Hosting | Timpson Application Development',
    description: 'Affordable, mobile-friendly small business website design, hosting, lead forms, analytics, and practical SEO support from a USA-based team.',
    aliases: [],
  },
  {
    output: 'small-business-crm/index.html',
    canonicalPath: '/small-business-crm/',
    title: 'Small Business CRM & Lead Management | Timpson Application Development',
    description: 'Simple CRM and lead management software for small teams that need a clear sales pipeline, customer history, follow-up tracking, and practical support.',
    aliases: [],
  },
  {
    output: 'ai-lead-automation/index.html',
    canonicalPath: '/ai-lead-automation/',
    title: 'AI Lead Automation for Small Businesses | Timpson Application Development',
    description: 'Human-supervised AI lead automation connecting website inquiries, CRM updates, follow-up, qualification, and owner review for small businesses.',
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

function applyInitialContent(html, route) {
  const content = staticContentByPath[route.canonicalPath];
  if (!content) return html;
  const sections = content.sections.map(([title, copy, href]) => `<article><h2>${escapeText(title)}</h2><p>${escapeText(copy)}</p><a href="${escapeAttribute(href)}">Explore this service</a></article>`).join('');
  const markup = `<div id="root"><div class="static-route-fallback"><header><a href="/">Timpson Application Development</a><nav aria-label="Primary"><a href="/small-business-websites/">Websites</a><a href="/small-business-crm/">CRM</a><a href="/ai-lead-automation/">AI automation</a><a href="/agents/">Agents</a><a href="/#contact">Contact</a></nav></header><main><p class="eyebrow">${escapeText(content.eyebrow)}</p><h1>${escapeText(content.h1)}</h1><p>${escapeText(content.intro)}</p>${sections ? `<section class="static-service-grid">${sections}</section>` : ''}<p><a href="/#contact">Discuss your project with TAD</a> or call <a href="tel:+14352120693">(435) 212-0693</a>.</p></main><footer><a href="/terms/">Terms</a> · <a href="/privacy/">Privacy</a> · <a href="mailto:contact@timpsonapps.com">contact@timpsonapps.com</a></footer></div></div>`;
  return html.replace('<div id="root"></div>', markup);
}

function applyStructuredData(html, route) {
  const content = staticContentByPath[route.canonicalPath];
  const graph = [{
    '@type': 'ProfessionalService', '@id': organizationId, name: 'Timpson Application Development',
    url: siteOrigin, telephone: '+1-435-212-0693', email: 'contact@timpsonapps.com', areaServed: { '@type': 'Country', name: 'United States' },
  }, {
    '@type': 'WebPage', '@id': `${siteOrigin}${route.canonicalPath}#webpage`, url: `${siteOrigin}${route.canonicalPath}`,
    name: route.title, description: route.description, about: { '@id': organizationId },
  }];
  if (['/small-business-websites/', '/small-business-crm/', '/ai-lead-automation/'].includes(route.canonicalPath)) graph.push({
    '@type': 'Service', '@id': `${siteOrigin}${route.canonicalPath}#service`, name: content.h1,
    description: route.description, provider: { '@id': organizationId }, areaServed: { '@type': 'Country', name: 'United States' },
  });
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c');
  return html.replace('</head>', `  <script type="application/ld+json">${json}</script>\n</head>`);
}

const baseHtml = await readFile(baseHtmlPath, 'utf8');

for (const route of routeDefinitions) {
  const routeHtml = applyStructuredData(applyInitialContent(applySeoMetadata(baseHtml, route), route), route);
  const outputPaths = [route.output, ...route.aliases];

  for (const relativeOutputPath of outputPaths) {
    const outputPath = join(distDir, relativeOutputPath);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml);
  }
}
