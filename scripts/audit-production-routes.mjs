import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const errors = [];
const warnings = [];
const seen = { title: new Map(), description: new Map(), canonical: new Map() };
const prohibited = [/OWNER_OR_TEAM_MUST_VERIFY/i, /YYYY-MM-DD/i, /lorem ipsum/i, /\bTODO\b/i, /coming soon/i];

for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = pathname === '/' ? join(dist, 'index.html') : join(dist, pathname, 'index.html');
  if (!existsSync(file)) { errors.push(`${pathname}: missing generated HTML`); continue; }
  const html = readFileSync(file, 'utf8');
  const title = capture(html, /<title>(.*?)<\/title>/is);
  const description = capture(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonical = capture(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const h1s = html.match(/<h1(?:\s|>)/gi) || [];
  if (!title) errors.push(`${pathname}: missing title`); else add('title', title, pathname);
  if (!description) errors.push(`${pathname}: missing description`); else { add('description', description, pathname); if (description.length < 100 || description.length > 165) warnings.push(`${pathname}: description length ${description.length}`); }
  if (!canonical) errors.push(`${pathname}: missing canonical`); else { add('canonical', canonical, pathname); if (canonical !== url) errors.push(`${pathname}: canonical mismatch ${canonical}`); }
  if (h1s.length !== 1) errors.push(`${pathname}: expected one initial-HTML H1, found ${h1s.length}`);
  if (!html.includes('static-route-fallback')) errors.push(`${pathname}: primary content missing from initial HTML`);
  for (const block of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gis)) try { JSON.parse(block[1]); } catch { errors.push(`${pathname}: invalid JSON-LD`); }
  for (const phrase of prohibited) if (phrase.test(html)) errors.push(`${pathname}: prohibited placeholder content`);
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const target = match[1].split(/[?#]/)[0];
    if (!target || target === '/' || /\.(png|jpg|svg|css|js|xml)$/i.test(target)) continue;
    if (!existsSync(join(dist, target, 'index.html'))) errors.push(`${pathname}: broken internal link ${target}`);
  }
}

for (const [kind, values] of Object.entries(seen)) for (const [value, paths] of values) if (paths.length > 1) errors.push(`duplicate ${kind}: ${value} (${paths.join(', ')})`);

const homeHtml = readFileSync(join(dist, 'index.html'), 'utf8');
const websiteHtml = readFileSync(join(dist, 'small-business-websites', 'index.html'), 'utf8');
const crmHtml = readFileSync(join(dist, 'small-business-crm', 'index.html'), 'utf8');
const automationHtml = readFileSync(join(dist, 'ai-lead-automation', 'index.html'), 'utf8');
if (!homeHtml.includes('<title>Human-Supervised AI Lead Systems | Timpson Application Development</title>')) errors.push('/: AI-first homepage title missing');
if (!automationHtml.includes('<title>AI Automation for Small Business Leads | Timpson Application Development</title>')) errors.push('/ai-lead-automation/: required title missing');
for (const [pathname, html] of [['/small-business-websites/', websiteHtml], ['/small-business-crm/', crmHtml], ['/ai-lead-automation/', automationHtml]]) {
  if (!html.includes('Frequently asked questions')) errors.push(`${pathname}: FAQ section missing from initial HTML`);
  if (!html.includes('See how this fits into the rest of the lead system')) errors.push(`${pathname}: related-links section missing from initial HTML`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gis)].map((block) => JSON.parse(block[1]));
  const schemaJson = JSON.stringify(schemas);
  if (!schemaJson.includes('FAQPage')) errors.push(`${pathname}: FAQ structured data missing`);
  if (!schemaJson.includes('BreadcrumbList')) errors.push(`${pathname}: breadcrumb structured data missing`);
}
const workflowPositions = ['Capture', 'Understand', 'Advance', 'Escalate'].map((stage) => automationHtml.indexOf(`<h3>${stage}</h3>`));
if (workflowPositions.some((position) => position < 0) || !workflowPositions.every((position, index) => index === 0 || position > workflowPositions[index - 1])) errors.push('/ai-lead-automation/: workflow stages missing or out of order');
if (!automationHtml.includes('Human-supervised by design')) errors.push('/ai-lead-automation/: visible guardrails missing');
if (!automationHtml.includes('A chatbot may be one input, but it is not the entire system.')) errors.push('/ai-lead-automation/: chatbot scope explanation missing');
for (const warning of warnings) console.warn(`AUDIT WARNING: ${warning}`);
if (errors.length) { for (const error of [...new Set(errors)]) console.error(`AUDIT ERROR: ${error}`); process.exit(1); }
console.log(`Audited ${urls.length} canonical routes: no blocking errors (${warnings.length} editorial warnings).`);

function capture(value, pattern) { return value.match(pattern)?.[1]?.trim() || ''; }
function add(kind, value, path) { const paths = seen[kind].get(value) || []; paths.push(path); seen[kind].set(value, paths); }
