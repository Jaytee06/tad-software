import { Check } from 'lucide-react';

type HowWeWorkPageProps = {
  onNavigate: (path: '/' | '/agents/' | '/small-business-websites/' | '/small-business-crm/' | '/ai-lead-automation/') => (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const stages = [
  {
    number: '01',
    title: 'Make the offer and next step clear',
    copy: 'We begin with the buyer question, the service being offered, and the smallest useful action a visitor can take. That keeps the website from becoming a decorative layer disconnected from the work that follows.',
  },
  {
    number: '02',
    title: 'Keep the lead context intact',
    copy: 'A useful handoff preserves source, need, timing, notes, ownership, and the next action. The CRM should make that context visible instead of leaving it scattered across forms, inboxes, and memory.',
  },
  {
    number: '03',
    title: 'Put a person at the judgment points',
    copy: 'Automation can prepare, route, remind, and organize. Pricing, unusual requests, fit decisions, sensitive situations, and commitments still need an accountable person and a visible review point.',
  },
  {
    number: '04',
    title: 'Verify changes in the live system',
    copy: 'Pages, forms, CRM handoffs, and search signals are checked after release. The goal is a measured operating loop, not a one-time launch or a claim that an agent can run the business unattended.',
  },
];

const guardrails = [
  'No invented testimonials, revenue figures, customer details, or performance promises.',
  'No automatic commitments on pricing, scope, or sensitive business decisions.',
  'No hidden handoff: the owner, next action, and review point stay visible.',
];

export default function HowWeWorkPage({ onNavigate }: HowWeWorkPageProps) {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-teal-300">A transparent implementation model</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">A managed lead system is built through verified steps, not AI promises.</h1>
          <p className="mt-7 max-w-3xl text-xl leading-relaxed text-slate-200">
            TAD connects website pages, lead capture, CRM workflow, and human review into one accountable path. The model is used in TAD&apos;s managed-company work, including the approved Timpson Drafting &amp; Design case-study example.
          </p>
          <p className="mt-5 max-w-3xl leading-relaxed text-slate-300">
            This page explains the operating approach. It does not publish private client records, revenue, sales counts, or a guarantee that another business will see the same outcome.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700">The operating loop</p>
            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">Four checks that keep the system useful.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {stages.map((stage) => (
              <article key={stage.number} className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">{stage.number}</span>
                <h3 className="mb-3 text-2xl font-bold text-slate-950">{stage.title}</h3>
                <p className="leading-relaxed text-slate-600">{stage.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-50 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700">What we can show</p>
            <h2 className="mb-5 text-3xl font-bold text-slate-950 md:text-4xl">The work should be understandable before it is impressive.</h2>
            <p className="text-lg leading-relaxed text-slate-700">
              A prospect should be able to see where an inquiry starts, what information carries forward, where automation stops, and how a human takes responsibility. That is more useful than a generic claim about autonomous agents or a page built only to chase a keyword.
            </p>
          </div>
          <aside className="rounded-2xl border border-teal-200 bg-white p-8 shadow-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Guardrails</p>
            <ul className="space-y-4">
              {guardrails.map((guardrail) => (
                <li key={guardrail} className="flex gap-3 text-slate-700">
                  <Check className="mt-0.5 h-5 w-5 flex-none text-teal-700" />
                  {guardrail}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-300">Explore the system</p>
          <h2 className="mb-10 max-w-3xl text-3xl font-bold md:text-4xl">See the parts of the workflow in more detail.</h2>
          <div className="grid gap-5 md:grid-cols-3">
            <a href="/small-business-websites/" onClick={onNavigate('/small-business-websites/')} className="rounded-2xl border border-slate-700 bg-slate-900 p-7 transition hover:border-teal-400 hover:bg-slate-800">
              <h3 className="mb-3 text-xl font-bold">Website and intake</h3>
              <p className="text-slate-300">Build pages that answer buyer questions and collect useful context.</p>
            </a>
            <a href="/small-business-crm/" onClick={onNavigate('/small-business-crm/')} className="rounded-2xl border border-slate-700 bg-slate-900 p-7 transition hover:border-teal-400 hover:bg-slate-800">
              <h3 className="mb-3 text-xl font-bold">CRM and ownership</h3>
              <p className="text-slate-300">Keep follow-up, notes, next actions, and accountability in one place.</p>
            </a>
            <a href="/agents/" onClick={onNavigate('/agents/')} className="rounded-2xl border border-slate-700 bg-slate-900 p-7 transition hover:border-teal-400 hover:bg-slate-800">
              <h3 className="mb-3 text-xl font-bold">Lead system demo</h3>
              <p className="text-slate-300">See how the connected workflow is designed around human review.</p>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-slate-950 md:text-4xl">Questions worth asking before automation expands</h2>
          <div className="space-y-5">
            <details className="rounded-xl border border-slate-200 p-6">
              <summary className="cursor-pointer text-lg font-bold text-slate-950">Will this replace the people on our team?</summary>
              <p className="mt-4 leading-relaxed text-slate-600">No. TAD&apos;s approach is to automate repeatable support work while keeping people responsible for judgment, commitments, and exceptions.</p>
            </details>
            <details className="rounded-xl border border-slate-200 p-6">
              <summary className="cursor-pointer text-lg font-bold text-slate-950">Can you promise more leads or sales?</summary>
              <p className="mt-4 leading-relaxed text-slate-600">No. We can define measurable operating improvements, but traffic, fit, timing, sales process, and market conditions affect outcomes.</p>
            </details>
            <details className="rounded-xl border border-slate-200 p-6">
              <summary className="cursor-pointer text-lg font-bold text-slate-950">What is the best first project?</summary>
              <p className="mt-4 leading-relaxed text-slate-600">Start with one visible bottleneck such as a weak intake path, missing follow-up, or a CRM handoff that loses context. Prove the process before adding more automation.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
