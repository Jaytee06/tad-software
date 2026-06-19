export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const LEGAL_EFFECTIVE_DATE = 'March 13, 2026';

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: 'Acceptance of Terms',
    paragraphs: [
      'By accessing or using the Timpson Application Development website, software, or related services, you agree to these Terms and Conditions. If you do not agree, do not use the site or services.',
      'These terms apply to visitors, customers, and anyone else who interacts with our website, hosted solutions, CRM tools, or consulting services.',
    ],
  },
  {
    title: 'Services',
    paragraphs: [
      'We provide website design, hosting, software development, CRM tools, support, and related business technology services. Specific deliverables, timelines, pricing, and service limits may be described in a proposal, invoice, service order, or separate written agreement.',
      'We may modify, improve, or discontinue part of the site or services at any time, including to maintain security, performance, or compliance.',
    ],
  },
  {
    title: 'Quotes, Billing, and Renewals',
    paragraphs: [
      'Pricing shown on the website is for general information and may change. Final pricing, subscription terms, and included services are governed by the written quote, invoice, or order accepted by the customer.',
      'Unless otherwise stated in writing, fees are due in advance, recurring services renew automatically for the agreed billing period, and amounts already paid are non-refundable once work has started or a service period has begun.',
    ],
  },
  {
    title: 'Customer Responsibilities',
    paragraphs: [
      'You are responsible for providing accurate information, timely feedback, required content, and any approvals needed for us to perform the services.',
      'You must ensure that any text, images, data, files, trademarks, or other materials you provide can lawfully be used by us to deliver the services.',
    ],
    bullets: [
      'Do not submit unlawful, misleading, infringing, or harmful content.',
      'Do not attempt to interfere with the site, software, hosting environment, or other users.',
      'Do not upload viruses, malware, or other malicious code.',
    ],
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      'You retain ownership of the business information and content you provide. We retain ownership of our pre-existing tools, code libraries, templates, workflows, know-how, and other materials used to provide the services unless a separate written agreement says otherwise.',
      'Unless otherwise agreed in writing, deliverables are licensed or assigned only after all applicable invoices have been paid in full.',
    ],
  },
  {
    title: 'Third-Party Services',
    paragraphs: [
      'Our services may rely on third-party hosting providers, domain registrars, payment processors, analytics tools, email platforms, cloud vendors, and other service providers. Their availability and performance are outside our direct control.',
      'We are not responsible for outages, policy changes, pricing changes, or data practices of third-party platforms, though we will make reasonable efforts to help manage issues that affect your service.',
    ],
  },
  {
    title: 'Disclaimers',
    paragraphs: [
      'To the fullest extent permitted by law, the website and services are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.',
      'We do not guarantee uninterrupted operation, error-free performance, or that the services will meet every business objective, legal requirement, or compliance need without customer review and approval.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, Timpson Application Development will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, goodwill, or business opportunities.',
      'Our total liability arising out of or related to the website or services will not exceed the total amount paid by you to us for the specific service giving rise to the claim during the 12 months before the event that led to the claim.',
    ],
  },
  {
    title: 'Termination',
    paragraphs: [
      'Either party may stop using or providing the services as allowed by the applicable service agreement. We may suspend or terminate access immediately if we reasonably believe there is nonpayment, abuse, security risk, illegal activity, or a material violation of these terms.',
      'Sections that by their nature should survive termination, including payment obligations, intellectual property, disclaimers, limitation of liability, and dispute-related provisions, will remain in effect.',
    ],
  },
  {
    title: 'Changes to These Terms',
    paragraphs: [
      'We may update these Terms and Conditions from time to time. Changes become effective when posted on this page unless another date is stated.',
      'Your continued use of the website or services after an update is posted means you accept the revised terms.',
    ],
  },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: 'Information We Collect',
    paragraphs: [
      'We collect information you choose to provide when you contact us, request a quote, submit a form, upload attachments, or use our services. We may also collect limited technical information automatically when you use the website.',
    ],
    bullets: [
      'Contact details such as name, business name, email address, phone number, and mailing information.',
      'Inquiry details such as messages, project descriptions, and files you send to us.',
      'Service records such as account details, support history, invoices, and communications.',
      'Technical information such as device type, browser information, IP address, pages visited, and basic usage data.',
    ],
  },
  {
    title: 'How We Use Information',
    paragraphs: [
      'We use personal information to respond to inquiries, provide and support our services, process transactions, improve the website, protect our systems, and communicate with you about your account or requested services.',
      'We may also use your information to send service-related notices and occasional business communications. You can opt out of non-essential marketing communications at any time.',
    ],
  },
  {
    title: 'How We Share Information',
    paragraphs: [
      'We do not sell personal information for money. We may share information only as reasonably necessary to operate the business and provide services.',
    ],
    bullets: [
      'With vendors and service providers that help us host, secure, maintain, or support the website and services.',
      'With payment processors or similar providers when needed to complete a transaction.',
      'When required by law, legal process, or to protect rights, safety, property, or the integrity of our services.',
      'In connection with a merger, acquisition, financing, or sale of all or part of our business.',
    ],
  },
  {
    title: 'Mobile Messaging',
    paragraphs: [
      'No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Message frequency varies. Message and data rates may apply.',
    ],
  },
  {
    title: 'Cookies and Analytics',
    paragraphs: [
      'We may use cookies or similar technologies for basic site functionality, security, performance monitoring, and analytics. These tools help us understand website traffic and improve the user experience.',
      'Most browsers allow you to control cookies through their settings. Disabling cookies may affect how some parts of the site function.',
    ],
  },
  {
    title: 'Data Retention',
    paragraphs: [
      'We keep personal information only for as long as reasonably necessary for the purposes described in this policy, including providing services, maintaining business records, resolving disputes, enforcing agreements, and complying with legal obligations.',
    ],
  },
  {
    title: 'Data Security',
    paragraphs: [
      'We use reasonable administrative, technical, and organizational safeguards intended to protect personal information against unauthorized access, loss, misuse, or disclosure.',
      'No method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Your Choices and Rights',
    paragraphs: [
      'Depending on where you live, you may have the right to request access to, correction of, or deletion of certain personal information we hold about you. You may also request that we limit certain uses of your information where applicable law provides that right.',
      'To make a privacy request, contact us using the information on this page. We may need to verify your identity before completing a request.',
    ],
  },
  {
    title: "Children's Privacy",
    paragraphs: [
      'Our website and services are intended for business use and are not directed to children under 13. We do not knowingly collect personal information from children under 13 through the website.',
      'If you believe a child has provided personal information to us, contact us and we will take reasonable steps to delete it.',
    ],
  },
  {
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date.',
      'Your continued use of the website or services after changes are posted means you accept the updated policy to the extent permitted by law.',
    ],
  },
];
