import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const baseHtmlPath = join(distDir, 'index.html');
const siteOrigin = 'https://tad.software';
const ogImageUrl = `${siteOrigin}/og-ai-automation.png`;
const organizationId = `${siteOrigin}/#organization`;

const staticContentByPath = {
  '/': {
    eyebrow: 'Human-supervised AI automation',
    h1: 'Turn every new lead into a clear next step.',
    intro: 'TAD connects your website, CRM, and follow-up into an AI-assisted lead system so routine work moves faster and important decisions still reach a person.',
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
    h1: 'Turn every new inquiry into a clear, supervised next step.',
    intro: 'TAD designs human-supervised AI workflows that capture leads, organize context, support qualification, prepare follow-up, update the CRM, and escalate the decisions that still need a person.',
    sections: [
      ['Lead intake automation', 'Capture form and chat details, preserve campaign context, and create a clean record.', '/#contact'],
      ['Guided follow-up', 'Prepare consistent responses while keeping CRM status and notes current.', '/#contact'],
      ['Human review gates', 'Define where automation stops for pricing, fit, tone, exceptions, or owner approval.', '/#contact'],
    ],
    workflow: [
      ['Capture', 'Collect the inquiry and useful source context.'],
      ['Understand', 'Organize needs, timing, preferences, and missing details using approved rules.'],
      ['Advance', 'Prepare follow-up, update the CRM, and set a clear next action.'],
      ['Escalate', 'Pause for a person when pricing, risk, fit, or an unusual request requires judgment.'],
    ],
    guardrails: ['Human review before custom pricing or commitments.', 'Escalation for sensitive or unusual situations.', 'Visible activity records and measurable success criteria.'],
    faqs: [
      ['Will AI contact customers without approval?', 'The workflow can be designed around your comfort level. Human approval and escalation points can be required wherever judgment or brand risk matters.'],
      ['Do we need a new CRM?', 'Not necessarily. TAD can assess whether to connect your current tools or provide a simpler workspace when the existing setup is the problem.'],
      ['What should we automate first?', 'Start with a repetitive, measurable bottleneck such as lead intake, routing, follow-up reminders, or record updates. Prove the workflow before expanding it.'],
      ['Is this a generic chatbot?', 'No. A chat interface can be one input, but the larger system connects approved business rules, lead context, CRM actions, follow-up, and explicit human review points.'],
      ['How do we measure whether it works?', 'Choose operational measures before launch, such as response time, percentage of leads with a next action, missed follow-ups, qualification completeness, or administrative time saved.'],
    ],
  },
  '/terms/': { eyebrow: 'Legal', h1: 'Terms and Conditions', intro: 'Terms governing access to the TAD website and the services provided to customers.', sections: [] },
  '/privacy/': { eyebrow: 'Legal', h1: 'Privacy Policy', intro: 'How Timpson Application Development collects, uses, and protects information.', sections: [] },
};

const routeDefinitions = [
  {
    output: 'index.html',
    canonicalPath: '/',
    title: 'Human-Supervised AI Lead Systems | Timpson Application Development',
    description:
      'Human-supervised AI automation that helps small businesses capture, qualify, follow up with, and manage leads across their website and CRM.',
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
    title: 'AI Automation for Small Business Leads | Timpson Application Development',
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
  const workflow = (content.workflow || []).map(([title, copy]) => `<article><h3>${escapeText(title)}</h3><p>${escapeText(copy)}</p></article>`).join('');
  const guardrails = (content.guardrails || []).map((item) => `<li>${escapeText(item)}</li>`).join('');
  const faqs = (content.faqs || []).map(([question, answer]) => `<details><summary>${escapeText(question)}</summary><p>${escapeText(answer)}</p></details>`).join('');
  const aiDetails = workflow ? `<section><h2>Capture, Understand, Advance, Escalate</h2><div class="static-service-grid">${workflow}</div><h2>Human-supervised by design</h2><ul>${guardrails}</ul><p>A chatbot may be one input, but it is not the entire system. The workflow also connects approved business rules, lead context, CRM actions, follow-up, and human review.</p><h2>Frequently asked questions</h2>${faqs}</section>` : '';
  const markup = `<div id="root"><div class="static-route-fallback"><header><a href="/">Timpson Application Development</a><nav aria-label="Primary"><a href="/ai-lead-automation/">AI automation</a><a href="/agents/">Lead system demo</a><a href="/small-business-websites/">Websites</a><a href="/small-business-crm/">CRM</a><a href="/#contact">Contact</a></nav></header><main><p class="eyebrow">${escapeText(content.eyebrow)}</p><h1>${escapeText(content.h1)}</h1><p>${escapeText(content.intro)}</p>${sections ? `<section class="static-service-grid">${sections}</section>` : ''}${aiDetails}<p><a href="/#contact">Discuss your project with TAD</a> or call <a href="tel:+14352120693">(435) 212-0693</a>.</p></main><footer><a href="/terms/">Terms</a> · <a href="/privacy/">Privacy</a> · <a href="mailto:contact@timpsonapps.com">contact@timpsonapps.com</a></footer></div></div>`;
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
  if (content.faqs?.length) graph.push({
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
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
