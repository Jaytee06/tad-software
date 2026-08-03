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
    fitTitle: 'Best for small businesses that need more than a brochure site.',
    fitCopy: 'This page is a strong fit when your business needs a website that answers buyer questions clearly, supports lead capture, and gives future CRM or automation work a solid foundation.',
    fitBullets: [
      'You need service pages that match what prospects search before they call.',
      'You want clearer calls to action, trust signals, and form paths on mobile and desktop.',
      'You need a website that can connect cleanly to a CRM or lead automation workflow later.',
    ],
    processTitle: 'What a website engagement usually includes',
    processCopy: 'Most projects begin by clarifying the offer, the best next action for a visitor, and the core pages that need to earn trust before any design polish is added.',
    processSteps: [
      ['Clarify the offer', 'Define the services, buyer questions, and trust points the site needs to answer before people reach out.'],
      ['Build the core pages', 'Launch the homepage, service pages, contact path, and technical SEO basics that search engines can crawl directly.'],
      ['Connect measurement', 'Track form activity, traffic sources, and follow-up paths so later improvements are based on evidence instead of guesswork.'],
    ],
    relatedLinks: [
      ['Connect the site to a CRM', 'Send every inquiry into a pipeline with owners, notes, statuses, and next actions.', '/small-business-crm/'],
      ['Add human-supervised automation', 'Use AI for intake and follow-up support without removing review points that still need judgment.', '/ai-lead-automation/'],
      ['See the full lead system', 'Explore how landing pages, CRM workflow, AI, and sales follow-up fit together in one operating loop.', '/agents/'],
    ],
    faqs: [
      ['How much does a small business website cost?', 'TAD offers a basic website package starting at $99 per year. Projects that need more pages, custom integrations, e-commerce, or ongoing content are scoped separately.'],
      ['Is SEO included?', 'Every site includes a sound technical foundation. Competitive SEO usually also requires useful service content, local business signals, measurement, and ongoing improvements.'],
      ['Can you improve an existing website?', 'Yes. We can review the current site, preserve what works, and improve its message, speed, search structure, lead capture, or integrations.'],
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
    fitTitle: 'Best for teams that need one shared system for follow-up.',
    fitCopy: 'A small-business CRM works best when leads are already arriving from a website, referrals, or campaigns and the team needs a cleaner handoff than inboxes and spreadsheets can provide.',
    fitBullets: [
      'You want every inquiry to have an owner, a status, and a scheduled next step.',
      'You need customer notes, quote context, and follow-up history in one place.',
      'You want the CRM to match how your business already sells instead of forcing enterprise complexity.',
    ],
    processTitle: 'How CRM work usually starts',
    processCopy: 'The first pass is usually simple: define the real pipeline stages, identify which fields matter, and make sure new inquiries arrive with enough context to move forward.',
    processSteps: [
      ['Map the pipeline', 'Choose statuses that reflect your actual sales process, from new inquiry through quote, invoice, win, or loss.'],
      ['Capture the right context', 'Store the contact details, need, timing, notes, and source information that make the next conversation more useful.'],
      ['Tighten follow-up', 'Set owners, reminders, and review points so fewer leads stall between the first inquiry and the next decision.'],
    ],
    relatedLinks: [
      ['Feed the CRM from the website', 'Start with service pages and lead forms that collect better context before the record ever reaches your team.', '/small-business-websites/'],
      ['Automate the repetitive steps', 'Use AI to support intake, updates, reminders, and approved follow-up while keeping the CRM current.', '/ai-lead-automation/'],
      ['See the operating model', 'View the full landing-page-to-CRM workflow, including where human review belongs.', '/agents/'],
    ],
    faqs: [
      ['What does the CRM cost?', 'TAD advertises CRM access starting as low as $3 per user per month. Final pricing depends on the setup, integrations, and support your team needs.'],
      ['Can the pipeline match our process?', 'Yes. Statuses, fields, review points, and follow-up rules can be configured around the way your business already sells.'],
      ['Can it connect to our website?', 'Yes. Website forms can send inquiries into the CRM, retain source details, and create a consistent follow-up workflow.'],
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
    fitTitle: 'Best for businesses that already know where leads get stuck.',
    fitCopy: 'Automation works best when there is a real bottleneck to fix, such as slow response times, missing CRM updates, after-hours inquiries, or inconsistent qualification before a person steps in.',
    fitBullets: [
      'You can identify a repetitive step that happens often enough to measure before and after.',
      'You want faster responses and cleaner records without handing every decision to a bot.',
      'You need explicit review gates for pricing, tone, fit, exceptions, or unusual requests.',
    ],
    processTitle: 'How a first automation rollout usually begins',
    processCopy: 'The safest launches start narrow. Define one workflow, one success metric, and one point where a person can still review the decision before the automation expands.',
    processSteps: [
      ['Choose the bottleneck', 'Start with one repeatable step such as lead intake, routing, follow-up reminders, or record updates.'],
      ['Define the guardrails', 'Set approved instructions, escalation rules, response boundaries, and the exact points where owner review is required.'],
      ['Measure and expand carefully', 'Track response speed, next-action coverage, and exception volume before broadening the workflow.'],
    ],
    workflow: [
      ['Capture', 'Collect the inquiry and useful source context.'],
      ['Understand', 'Organize needs, timing, preferences, and missing details using approved rules.'],
      ['Advance', 'Prepare follow-up, update the CRM, and set a clear next action.'],
      ['Escalate', 'Pause for a person when pricing, risk, fit, or an unusual request requires judgment.'],
    ],
    guardrails: ['Human review before custom pricing or commitments.', 'Escalation for sensitive or unusual situations.', 'Visible activity records and measurable success criteria.'],
    relatedLinks: [
      ['Strengthen the intake point', 'Automation works better when the website collects the right details and sets up the next step clearly.', '/small-business-websites/'],
      ['Keep the CRM current', 'Use a pipeline that can receive source data, statuses, notes, and follow-up timing from the workflow.', '/small-business-crm/'],
      ['See the end-to-end system', 'Review how traffic, landing pages, AI-assisted follow-up, CRM updates, and owner review connect.', '/agents/'],
    ],
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
  const fitBullets = (content.fitBullets || []).map((item) => `<li>${escapeText(item)}</li>`).join('');
  const processSteps = (content.processSteps || []).map(([title, copy]) => `<article><h3>${escapeText(title)}</h3><p>${escapeText(copy)}</p></article>`).join('');
  const workflow = (content.workflow || []).map(([title, copy]) => `<article><h3>${escapeText(title)}</h3><p>${escapeText(copy)}</p></article>`).join('');
  const guardrails = (content.guardrails || []).map((item) => `<li>${escapeText(item)}</li>`).join('');
  const relatedLinks = (content.relatedLinks || []).map(([title, copy, href]) => `<article><h3>${escapeText(title)}</h3><p>${escapeText(copy)}</p><a href="${escapeAttribute(href)}">Explore this page</a></article>`).join('');
  const faqs = (content.faqs || []).map(([question, answer]) => `<details><summary>${escapeText(question)}</summary><p>${escapeText(answer)}</p></details>`).join('');
  const fitSection = content.fitTitle
    ? `<section><h2>${escapeText(content.fitTitle)}</h2><p>${escapeText(content.fitCopy)}</p><ul>${fitBullets}</ul></section>`
    : '';
  const processSection = content.processTitle
    ? `<section><h2>${escapeText(content.processTitle)}</h2><p>${escapeText(content.processCopy)}</p><div class="static-service-grid">${processSteps}</div></section>`
    : '';
  const workflowSection = workflow
    ? `<section><h2>Capture, Understand, Advance, Escalate</h2><div class="static-service-grid">${workflow}</div><h2>Human-supervised by design</h2><ul>${guardrails}</ul><p>A chatbot may be one input, but it is not the entire system. The workflow also connects approved business rules, lead context, CRM actions, follow-up, and human review.</p></section>`
    : '';
  const relatedSection = relatedLinks
    ? `<section><h2>See how this fits into the rest of the lead system</h2><div class="static-service-grid">${relatedLinks}</div></section>`
    : '';
  const faqSection = faqs ? `<section><h2>Frequently asked questions</h2>${faqs}</section>` : '';
  const markup = `<div id="root"><div class="static-route-fallback"><header><a href="/">Timpson Application Development</a><nav aria-label="Primary"><a href="/ai-lead-automation/">AI automation</a><a href="/agents/">Lead system demo</a><a href="/small-business-websites/">Websites</a><a href="/small-business-crm/">CRM</a><a href="/#contact">Contact</a></nav></header><main><p class="eyebrow">${escapeText(content.eyebrow)}</p><h1>${escapeText(content.h1)}</h1><p>${escapeText(content.intro)}</p>${sections ? `<section class="static-service-grid">${sections}</section>` : ''}${fitSection}${processSection}${workflowSection}${relatedSection}${faqSection}<p><a href="/#contact">Discuss your project with TAD</a> or call <a href="tel:+14352120693">(435) 212-0693</a>.</p></main><footer><a href="/terms/">Terms</a> · <a href="/privacy/">Privacy</a> · <a href="mailto:contact@timpsonapps.com">contact@timpsonapps.com</a></footer></div></div>`;
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
  if (route.canonicalPath !== '/') graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteOrigin}/` },
      { '@type': 'ListItem', position: 2, name: route.title.split('|')[0].trim(), item: `${siteOrigin}${route.canonicalPath}` },
    ],
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
