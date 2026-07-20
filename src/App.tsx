import { useEffect, useRef, useState } from 'react';
import {
  Check,
  Clock,
  Database,
  DollarSign,
  Mail,
  MapPin,
  Monitor,
  Paperclip,
  Phone,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import logo from './assets/logo.png';
import AgentsProductPage from './AgentsProductPage';
import ServicePage, { type ServicePageContent } from './ServicePage';
import {
  LEGAL_EFFECTIVE_DATE,
  PRIVACY_SECTIONS,
  TERMS_SECTIONS,
  type LegalSection,
} from './legalContent';

const ADMIN_EMAIL = 'admin@tad.software';
const CONTACT_EMAIL = 'contact@timpsonapps.com';
const COMPANY_NAME = 'Timpson Application Development';
const PHONE_HREF = 'tel:+14352120693';
const PHONE_LABEL = '(435) 212-0693';
const SITE_ORIGIN = 'https://tad.software';
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const recordAnalyticsEvent = (event: string, details: Record<string, unknown> = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
};

type Page = 'home' | 'agents' | 'websites' | 'crm' | 'automation' | 'terms' | 'privacy';
type SitePath = '/' | '/agents/' | '/small-business-websites/' | '/small-business-crm/' | '/ai-lead-automation/' | '/terms/' | '/privacy/';

type SeoMetadata = {
  title: string;
  description: string;
  canonicalPath: string;
};

const PAGE_SEO: Record<Page, SeoMetadata> = {
  home: {
    title: `${COMPANY_NAME} | Websites & CRM for Small Businesses`,
    description:
      'Affordable websites and simple CRM software for small businesses, with USA-based support and practical lead management.',
    canonicalPath: '/',
  },
  agents: {
    title: `Agent Lead Growth System | ${COMPANY_NAME}`,
    description:
      'A human-supervised lead growth system that connects landing pages, CRM workflow, AI communication, ads, and SEO for small businesses.',
    canonicalPath: '/agents/',
  },
  websites: {
    title: `Small Business Website Design & Hosting | ${COMPANY_NAME}`,
    description: 'Affordable, mobile-friendly small business website design, hosting, lead forms, analytics, and practical SEO support from a USA-based team.',
    canonicalPath: '/small-business-websites/',
  },
  crm: {
    title: `Small Business CRM & Lead Management | ${COMPANY_NAME}`,
    description: 'Simple CRM and lead management software for small teams that need a clear sales pipeline, customer history, follow-up tracking, and practical support.',
    canonicalPath: '/small-business-crm/',
  },
  automation: {
    title: `AI Lead Automation for Small Businesses | ${COMPANY_NAME}`,
    description: 'Human-supervised AI lead automation connecting website inquiries, CRM updates, follow-up, qualification, and owner review for small businesses.',
    canonicalPath: '/ai-lead-automation/',
  },
  terms: {
    title: `Terms & Conditions | ${COMPANY_NAME}`,
    description:
      'Terms governing access to the Timpson Application Development website and the website, hosting, CRM, and software services provided to customers.',
    canonicalPath: '/terms/',
  },
  privacy: {
    title: `Privacy Policy | ${COMPANY_NAME}`,
    description:
      'Privacy policy covering what information Timpson Application Development collects, how it is used, and the choices available to visitors and customers.',
    canonicalPath: '/privacy/',
  },
};

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';

const getPageFromLocation = (): Page => {
  const normalizedPath = normalizePath(window.location.pathname).toLowerCase();

  if (normalizedPath === '/terms' || normalizedPath === '/terms-and-conditions') {
    return 'terms';
  }

  if (normalizedPath === '/privacy' || normalizedPath === '/privacy-policy') {
    return 'privacy';
  }

  if (normalizedPath === '/agents') {
    return 'agents';
  }

  if (normalizedPath === '/small-business-websites') return 'websites';
  if (normalizedPath === '/small-business-crm') return 'crm';
  if (normalizedPath === '/ai-lead-automation') return 'automation';

  return 'home';
};

const getHomeSectionHref = (page: Page, sectionId: string) =>
  page === 'home' ? `#${sectionId}` : `/#${sectionId}`;

const SERVICE_PAGES: Record<'websites' | 'crm' | 'automation', ServicePageContent> = {
  websites: {
    eyebrow: 'Small business website design',
    title: 'A professional website built to turn local interest into real inquiries.',
    intro: 'TAD designs, hosts, and supports fast small-business websites with clear offers, mobile-friendly pages, lead capture, analytics, and the technical SEO foundation search engines expect.',
    outcomes: ['Clear service pages people can find in search', 'Fast, mobile-friendly experience', 'Lead forms connected to a practical follow-up path'],
    problemTitle: 'Your website should explain what you do before a visitor has to ask.',
    problemCopy: 'A good small-business website is more than a digital business card. It should match the questions customers search, establish trust quickly, and make the next step obvious on every device.',
    deliverables: [
      { title: 'Search-ready structure', copy: 'Focused pages, descriptive titles, internal links, sitemap support, and structured data create a clean foundation for organic growth.' },
      { title: 'Conversion-focused design', copy: 'Straightforward messaging, accessible calls to action, and useful contact forms help qualified visitors take the next step.' },
      { title: 'Hosting and support', copy: 'TAD can handle hosting, routine updates, measurement, and improvements so the site stays useful after launch.' },
    ],
    faq: [
      { question: 'How much does a small business website cost?', answer: 'TAD offers a basic website package starting at $99 per year. Projects that need more pages, custom integrations, e-commerce, or ongoing content are scoped separately.' },
      { question: 'Is SEO included?', answer: 'Every site includes a sound technical foundation. Competitive SEO usually also requires useful service content, local business signals, measurement, and ongoing improvements.' },
      { question: 'Can you improve an existing website?', answer: 'Yes. We can review the current site, preserve what works, and improve its message, speed, search structure, lead capture, or integrations.' },
    ],
  },
  crm: {
    eyebrow: 'CRM for small businesses',
    title: 'A simple sales pipeline your team will actually keep up to date.',
    intro: 'Organize new inquiries, customer details, notes, next steps, and follow-up in one small-business CRM built around the way your team sells—not around enterprise software complexity.',
    outcomes: ['Every lead has an owner and next step', 'Customer context stays in one place', 'Pipeline stages match your actual sales process'],
    problemTitle: 'Stop losing leads between inboxes, spreadsheets, and sticky notes.',
    problemCopy: 'A practical CRM gives a small team one reliable view of every opportunity. The goal is not more administration; it is fewer missed follow-ups and a clearer path from inquiry to customer.',
    deliverables: [
      { title: 'Lead pipeline', copy: 'Track new inquiries, contacted leads, qualified opportunities, quotes, invoices, wins, and review points with statuses that fit your business.' },
      { title: 'Customer history', copy: 'Keep contact details, notes, needs, activities, and follow-up timing together so the next conversation has context.' },
      { title: 'Connected intake', copy: 'Route website and campaign inquiries into the CRM with useful source information instead of copying every lead by hand.' },
    ],
    faq: [
      { question: 'What does the CRM cost?', answer: 'TAD advertises CRM access starting as low as $3 per user per month. Final pricing depends on the setup, integrations, and support your team needs.' },
      { question: 'Can the pipeline match our process?', answer: 'Yes. Statuses, fields, review points, and follow-up rules can be configured around the way your business already sells.' },
      { question: 'Can it connect to our website?', answer: 'Yes. Website forms can send inquiries into the CRM, retain source details, and create a consistent follow-up workflow.' },
    ],
  },
  automation: {
    eyebrow: 'Human-supervised AI automation',
    title: 'Respond to leads faster without giving up human judgment.',
    intro: 'TAD connects landing pages, CRM workflow, AI-assisted communication, qualification, and owner review into a controlled lead process for small businesses.',
    outcomes: ['Faster response to new inquiries', 'Consistent qualification and record updates', 'Clear escalation when a person should decide'],
    problemTitle: 'Automation works best when the handoffs are designed first.',
    problemCopy: 'Useful AI automation does not mean turning every decision over to a bot. It means removing repetitive steps, keeping records current, and making sure pricing, brand voice, and unusual situations reach the right person.',
    deliverables: [
      { title: 'Lead intake automation', copy: 'Capture form and chat details, preserve campaign context, and create a clean record for follow-up.' },
      { title: 'Guided follow-up', copy: 'Prepare or send consistent responses through approved channels while keeping the CRM status and notes current.' },
      { title: 'Human review gates', copy: 'Define where automation stops and a business owner reviews pricing, fit, tone, or exceptions before work moves forward.' },
    ],
    faq: [
      { question: 'Will AI contact customers without approval?', answer: 'The workflow can be designed around your comfort level. Human approval and escalation points can be required wherever judgment or brand risk matters.' },
      { question: 'Do we need a new CRM?', answer: 'Not necessarily. TAD can assess whether to connect your current tools or provide a simpler workspace when the existing setup is the problem.' },
      { question: 'What should we automate first?', answer: 'Start with a repetitive, measurable bottleneck such as lead intake, routing, follow-up reminders, or record updates. Prove the workflow before expanding it.' },
    ],
  },
};

const isPlainLeftClick = (event: React.MouseEvent<HTMLAnchorElement>) =>
  event.button === 0 &&
  !event.defaultPrevented &&
  !event.metaKey &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.shiftKey;

function upsertMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attributeName}="${attributeValue}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function upsertCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

function upsertStructuredData(page: Page) {
  const id = 'page-structured-data';
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const base = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: COMPANY_NAME,
    url: SITE_ORIGIN,
    telephone: PHONE_LABEL,
    email: CONTACT_EMAIL,
    areaServed: 'United States',
  };
  const service = page === 'websites' || page === 'crm' || page === 'automation' ? SERVICE_PAGES[page] : null;
  script.textContent = JSON.stringify(service ? {
    '@context': 'https://schema.org',
    '@graph': [
      base,
      { '@type': 'Service', name: PAGE_SEO[page].title.split('|')[0].trim(), provider: { '@type': 'Organization', name: COMPANY_NAME, url: SITE_ORIGIN }, description: PAGE_SEO[page].description, areaServed: 'United States' },
      { '@type': 'FAQPage', mainEntity: service.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
    ],
  } : base);
}

type SiteHeaderProps = {
  page: Page;
  onNavigate: (path: SitePath) => (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function SiteHeader({ page, onNavigate }: SiteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
        <a href="/" onClick={onNavigate('/')} className="flex items-center gap-2 min-w-0">
          <img
            src={logo}
            alt="Timpson Application Development Logo"
            className="w-8 h-8 object-contain flex-shrink-0"
          />
          <span className="text-xl font-bold text-gray-900 truncate">{COMPANY_NAME}</span>
        </a>
        <nav className="hidden md:flex gap-6 text-sm lg:text-base">
          {page === 'agents' ? (
            <>
              <a href="#system" className="text-gray-600 hover:text-teal-600 transition">
                System
              </a>
              <a href="#process" className="text-gray-600 hover:text-teal-600 transition">
                Process
              </a>
              <a href="#crm" className="text-gray-600 hover:text-teal-600 transition">
                Workspace
              </a>
              <a href="#review" className="text-gray-600 hover:text-teal-600 transition">
                Review
              </a>
            </>
          ) : (
            <>
              <a
                href="/agents/"
                onClick={onNavigate('/agents/')}
                className="text-gray-600 hover:text-teal-600 transition"
              >
                Agents
              </a>
              <a href={getHomeSectionHref(page, 'services')} className="text-gray-600 hover:text-teal-600 transition">
                Services
              </a>
              <a href={getHomeSectionHref(page, 'pricing')} className="text-gray-600 hover:text-teal-600 transition">
                Pricing
              </a>
              <a href={getHomeSectionHref(page, 'contact')} className="text-gray-600 hover:text-teal-600 transition">
                Contact
              </a>
            </>
          )}
          <a href="/terms/" onClick={onNavigate('/terms/')} className="text-gray-600 hover:text-teal-600 transition">
            Terms
          </a>
          <a
            href="/privacy/"
            onClick={onNavigate('/privacy/')}
            className="text-gray-600 hover:text-teal-600 transition"
          >
            Privacy
          </a>
        </nav>
        {page !== 'agents' && (
          <a href={PHONE_HREF} className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-teal-600 transition">
            <Phone className="w-4 h-4" />
            <span className="font-medium">{PHONE_LABEL}</span>
          </a>
        )}
        {page === 'agents' && (
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="#review"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-700"
            >
              Schedule
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('agents:open-chat'))}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-3 text-sm font-bold text-teal-700 transition hover:bg-white"
            >
              <span>Chat with</span>
              <span className="leadhand-blob mini" aria-hidden="true">
                <span className="leadhand-sprout"></span>
                <span className="leadhand-eye eye-left"></span>
                <span className="leadhand-eye eye-right"></span>
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

type SiteFooterProps = {
  page: Page;
  onNavigate: (path: SitePath) => (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function SiteFooter({ page, onNavigate }: SiteFooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="/" onClick={onNavigate('/')} className="inline-flex items-center gap-2 mb-4">
              <img src={logo} alt="Timpson Application Development Logo" className="w-6 h-6 object-contain" />
              <span className="text-xl font-bold text-white">{COMPANY_NAME}</span>
            </a>
            <p className="text-gray-400 leading-relaxed">
              Professional websites and CRM solutions built specifically for small businesses.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  265 W Woolley Ave
                  <br />
                  Centennial Park, AZ 86021
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <a href={PHONE_HREF} className="text-gray-400 hover:text-teal-400 transition">
                  {PHONE_LABEL}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-400 hover:text-teal-400 transition">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <a href="/" onClick={onNavigate('/')} className="block text-gray-400 hover:text-teal-400 transition">
                Home
              </a>
              <a
                href="/agents/"
                onClick={onNavigate('/agents/')}
                className="block text-gray-400 hover:text-teal-400 transition"
              >
                Agent Lead System
              </a>
              <a
                href={getHomeSectionHref(page, 'services')}
                className="block text-gray-400 hover:text-teal-400 transition"
              >
                Services
              </a>
              <a
                href={getHomeSectionHref(page, 'pricing')}
                className="block text-gray-400 hover:text-teal-400 transition"
              >
                Pricing
              </a>
              <a
                href={getHomeSectionHref(page, 'contact')}
                className="block text-gray-400 hover:text-teal-400 transition"
              >
                Contact
              </a>
              <a
                href="/terms/"
                onClick={onNavigate('/terms/')}
                className="block text-gray-400 hover:text-teal-400 transition"
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy/"
                onClick={onNavigate('/privacy/')}
                className="block text-gray-400 hover:text-teal-400 transition"
              >
                Privacy Policy
              </a>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

type LegalPageProps = {
  title: string;
  summary: string;
  sections: LegalSection[];
};

function LegalPage({ title, summary, sections }: LegalPageProps) {
  return (
    <>
      <section className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 mb-4">
            Effective {LEGAL_EFFECTIVE_DATE}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{summary}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-gray-600">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-teal-50 border border-teal-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Questions?</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this page or want to submit a privacy-related request, email us at{' '}
              <a href={`mailto:${ADMIN_EMAIL}`} className="font-semibold text-teal-700 hover:text-teal-800">
                {ADMIN_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    message: '',
    website: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState<Page>(() => getPageFromLocation());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contactFormStarted = useRef(false);

  useEffect(() => {
    const handleTrackedLink = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      if (link.href.startsWith('tel:')) {
        recordAnalyticsEvent('phone_link_click', { link_url: link.href });
      } else if (link.href.startsWith('mailto:')) {
        recordAnalyticsEvent('email_link_click', { link_url: link.href });
      }
    };

    document.addEventListener('click', handleTrackedLink);
    return () => document.removeEventListener('click', handleTrackedLink);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromLocation());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const seo = PAGE_SEO[page];
    const canonicalUrl = `${SITE_ORIGIN}${seo.canonicalPath}`;

    document.title = seo.title;
    upsertMetaTag('name', 'description', seo.description);
    upsertMetaTag('name', 'robots', 'index,follow');
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:site_name', COMPANY_NAME);
    upsertMetaTag('property', 'og:title', seo.title);
    upsertMetaTag('property', 'og:description', seo.description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:image', DEFAULT_OG_IMAGE);
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', seo.title);
    upsertMetaTag('name', 'twitter:description', seo.description);
    upsertMetaTag('name', 'twitter:image', DEFAULT_OG_IMAGE);
    upsertCanonicalLink(canonicalUrl);
    upsertStructuredData(page);
  }, [page]);

  useEffect(() => {
    if (page !== 'home' && page !== 'agents') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const hashTarget = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    if (!hashTarget) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(hashTarget)?.scrollIntoView();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [page]);

  const handlePageNavigation =
    (path: SitePath) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isPlainLeftClick(event)) {
        return;
      }

      event.preventDefault();

      const nextPath = path === '/' ? '/' : path;
      const currentPath = normalizePath(window.location.pathname);
      const normalizedNextPath = normalizePath(nextPath);

      if (currentPath === normalizedNextPath && !window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      window.history.pushState({}, '', nextPath);
      setPage(getPageFromLocation());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (formData.website) {
      setSubmitted(true);
      setIsLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
      return;
    }

    const phoneRegex = /^[\d\s()+-]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setErrorMessage('Please enter a valid phone number (at least 10 digits).');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (formData.message.length < 20) {
      setErrorMessage('Please provide a clearer description (at least 20 characters).');
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== 'website') {
          data.append(key, formData[key as keyof typeof formData]);
        }
      });
      data.append('adminEmail', ADMIN_EMAIL);

      if (files) {
        Array.from(files).forEach((file) => {
          data.append('file', file);
        });
      }

      const API_ENDPOINT =
        'https://n2s6trcvfc.execute-api.us-west-2.amazonaws.com/default/tddFormSubmit';

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      recordAnalyticsEvent('contact_form_submit', { form_name: 'website_inquiry' });
      setSubmitted(true);
      setFormData({
        name: '',
        business: '',
        email: '',
        phone: '',
        message: '',
        website: '',
      });
      setFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const legalPageContent =
    page === 'terms'
      ? {
          title: 'Terms & Conditions',
          summary:
            'These terms govern access to the Timpson Application Development website and the website, hosting, CRM, and software services we provide to customers.',
          sections: TERMS_SECTIONS,
        }
      : {
          title: 'Privacy Policy',
          summary:
            'This policy explains what information we collect, how we use it, and the choices you have when you interact with Timpson Application Development online or through our services.',
          sections: PRIVACY_SECTIONS,
        };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader page={page} onNavigate={handlePageNavigation} />

      <main className="pt-20">
        {page === 'agents' ? (
          <AgentsProductPage />
        ) : page === 'websites' || page === 'crm' || page === 'automation' ? (
          <ServicePage content={SERVICE_PAGES[page]} phoneHref={PHONE_HREF} />
        ) : page === 'home' ? (
          <>
            <section className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-white py-20 md:py-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Affordable Websites & CRM Software Built for Small Businesses
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
                    Professional websites for just{' '}
                    <span className="font-bold text-teal-600">$99/year</span> and a powerful lead &
                    customer management system for as little as{' '}
                    <span className="font-bold text-teal-600">$3 per user per month</span>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Get Started
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-50 transition border-2 border-teal-600"
                    >
                      Request a Demo
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-12 bg-white border-y border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">No long-term contracts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Built & supported in the USA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Scales with your business</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Simple pricing, no surprises</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="services" className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                  <p className="text-xl text-gray-600">
                    Professional solutions designed for small businesses
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-teal-100 p-3 rounded-lg">
                        <Monitor className="w-8 h-8 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Custom Website Service</h3>
                        <p className="text-teal-600 font-bold text-lg">$99 / Year</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      We design and host professional websites tailored to your business. Perfect for
                      startups, service companies, and local businesses that need a strong online
                      presence without high upfront costs.
                    </p>
                    <a href="/small-business-websites/" onClick={handlePageNavigation('/small-business-websites/')} className="mb-6 inline-flex font-semibold text-teal-700 hover:text-teal-800">
                      Explore small business website design →
                    </a>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Custom-designed website</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Mobile responsive</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Hosting included</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Basic SEO setup</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Fast load speeds</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Upgrade Options:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          Advanced SEO
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          E-commerce
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          Ongoing content updates
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          Custom integrations
                        </span>
                      </div>
                    </div>
                    <a
                      href="#contact"
                      className="mt-8 block w-full text-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
                    >
                      Get Your Website
                    </a>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Database className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">CRM & Lead Management</h3>
                        <p className="text-blue-600 font-bold text-lg">As little as $3 / User / Month</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Manage leads, customers, and follow-ups in one simple system designed specifically
                      for small teams.
                    </p>
                    <a href="/small-business-crm/" onClick={handlePageNavigation('/small-business-crm/')} className="mb-6 inline-flex font-semibold text-blue-700 hover:text-blue-800">
                      Explore small business CRM software →
                    </a>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Lead tracking & pipelines</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Customer profiles</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Activity & notes tracking</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Multi-user access</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Cloud-based, no installs</span>
                      </div>
                    </div>
                    <a
                      href="#contact"
                      className="mt-8 block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                      Request a CRM Demo
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 py-16 text-white">
              <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
                <div className="max-w-3xl">
                  <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-teal-400">AI lead automation</p>
                  <h2 className="mb-3 text-3xl font-bold">Connect your website, CRM, and follow-up without losing human oversight.</h2>
                  <p className="text-lg leading-relaxed text-gray-300">Use controlled automation to capture inquiries, keep records current, and escalate the decisions that still need a person.</p>
                </div>
                <a href="/ai-lead-automation/" onClick={handlePageNavigation('/ai-lead-automation/')} className="whitespace-nowrap rounded-lg bg-teal-500 px-6 py-3 font-bold text-gray-950 hover:bg-teal-400">Explore AI automation →</a>
              </div>
            </section>

            <section id="pricing" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Simple, Transparent Pricing
                  </h2>
                  <p className="text-xl text-gray-600">No hidden fees. Pay only for what you need.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <div className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-xl p-8 hover:shadow-xl transition">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Website Package</h3>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-bold text-teal-600">$99</span>
                        <span className="text-gray-600">/ year</span>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="text-gray-700">Custom design</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="text-gray-700">Hosting included</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="text-gray-700">Email support</span>
                      </div>
                    </div>
                    <a
                      href="#contact"
                      className="block w-full text-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
                    >
                      Get Started
                    </a>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-8 hover:shadow-xl transition">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">CRM Software</h3>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-bold text-blue-600">$3</span>
                        <span className="text-gray-600">/ user / month</span>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">Unlimited leads</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">Secure cloud access</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">Scales as your team grows</span>
                      </div>
                    </div>
                    <a
                      href="#contact"
                      className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                      Get Started
                    </a>
                  </div>
                </div>

                <p className="text-center text-gray-600 mt-8 italic">
                  Discounts available for annual plans and bundled services.
                </p>
              </div>
            </section>

            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Why Timpson Application Development?
                  </h2>
                  <p className="text-xl text-gray-600">
                    We&apos;re different because we understand small businesses
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Built for Small Businesses</h3>
                    <p className="text-gray-600">
                      Every feature is designed with small teams and budgets in mind.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Bloated Software</h3>
                    <p className="text-gray-600">
                      Simple, fast tools that do exactly what you need without the complexity.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Onboarding</h3>
                    <p className="text-gray-600">
                      Get up and running quickly with our streamlined setup process.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real Human Support</h3>
                    <p className="text-gray-600">
                      Talk to actual people who care about your success, not bots.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Transparent Pricing</h3>
                    <p className="text-gray-600">
                      Know exactly what you&apos;re paying for with no hidden fees or surprises.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Reliable</h3>
                    <p className="text-gray-600">
                      Your data is protected with enterprise-grade security measures.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" className="py-20 bg-white">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Let&apos;s Build Something That Works for Your Business
                  </h2>
                  <p className="text-xl text-gray-600">
                    Get in touch and let&apos;s discuss how we can help you grow
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
                  {submitted ? (
                    <div className="text-center py-12 bg-teal-50 rounded-xl">
                      <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-teal-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">We&apos;ll be in touch with you shortly.</p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      onFocus={() => {
                        if (contactFormStarted.current) return;
                        contactFormStarted.current = true;
                        recordAnalyticsEvent('contact_form_start', { form_name: 'website_inquiry' });
                      }}
                      className="space-y-6"
                    >
                      {errorMessage && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">{errorMessage}</div>
                      )}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                            placeholder="John Doe"
                          />
                          <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="business"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Business Name
                          </label>
                          <input
                            type="text"
                            id="business"
                            name="business"
                            value={formData.business}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                            placeholder="Your Business LLC"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                            placeholder="you@business.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                          placeholder="Tell us about your project or questions..."
                        />
                      </div>

                      <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                          Attachments (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                          />
                          <Paperclip className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Get Started Today'
                        )}
                      </button>
                    </form>
                  )}

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                      <a
                        href={PHONE_HREF}
                        className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition"
                      >
                        <Phone className="w-5 h-5" />
                        <span className="font-medium">{PHONE_LABEL}</span>
                      </a>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition"
                      >
                        <Mail className="w-5 h-5" />
                        <span className="font-medium">{CONTACT_EMAIL}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <LegalPage
            title={legalPageContent.title}
            summary={legalPageContent.summary}
            sections={legalPageContent.sections}
          />
        )}
      </main>

      <SiteFooter page={page} onNavigate={handlePageNavigation} />
    </div>
  );
}

export default App;
