import { ArrowRight, Check, Phone } from 'lucide-react';

export type ServicePageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  outcomes: string[];
  problemTitle: string;
  problemCopy: string;
  deliverables: Array<{ title: string; copy: string }>;
  faq: Array<{ question: string; answer: string }>;
};

type ServicePageProps = {
  content: ServicePageContent;
  phoneHref: string;
};

export default function ServicePage({ content, phoneHref }: ServicePageProps) {
  return (
    <>
      <section className="bg-gradient-to-br from-teal-50 via-blue-50 to-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-teal-700">{content.eyebrow}</p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">{content.title}</h1>
            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-gray-650">{content.intro}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-7 py-4 font-semibold text-white hover:bg-teal-700">
                Discuss your project <ArrowRight className="h-5 w-5" />
              </a>
              <a href={phoneHref} className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-teal-600 bg-white px-7 py-4 font-semibold text-teal-700 hover:bg-teal-50">
                <Phone className="h-5 w-5" /> Call TAD
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white py-10">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {content.outcomes.map((outcome) => (
            <div key={outcome} className="flex items-start gap-3 font-medium text-gray-800">
              <Check className="mt-0.5 h-5 w-5 flex-none text-teal-600" /> {outcome}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{content.problemTitle}</h2>
            <p className="text-lg leading-relaxed text-gray-600">{content.problemCopy}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {content.deliverables.map((item) => (
              <article key={item.title} className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="leading-relaxed text-gray-600">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold text-gray-900 md:text-4xl">Frequently asked questions</h2>
          <div className="space-y-5">
            {content.faq.map((item) => (
              <details key={item.question} className="group rounded-xl border border-gray-200 bg-white p-6 open:border-teal-200 open:bg-teal-50/40">
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold text-gray-900">{item.question}</summary>
                <p className="mt-4 leading-relaxed text-gray-650">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-gray-900 p-8 text-white md:p-10">
            <h2 className="mb-3 text-2xl font-bold">Start with the business problem, not a software checklist.</h2>
            <p className="mb-6 max-w-2xl text-gray-300">Tell us what is slow, disconnected, or costing you leads. We’ll recommend the smallest practical first step.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3 font-bold text-gray-950 hover:bg-teal-400">Request a consultation <ArrowRight className="h-5 w-5" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
