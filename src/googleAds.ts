const GOOGLE_ADS_TAG_ID = import.meta.env.VITE_GOOGLE_ADS_TAG_ID || '';
const GOOGLE_ADS_REVIEW_REQUEST_LABEL = import.meta.env.VITE_GOOGLE_ADS_REVIEW_REQUEST_LABEL || '';

type GoogleAdsConversionOptions = {
  currency?: string;
  transactionId?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function getReviewRequestSendTo() {
  if (!GOOGLE_ADS_TAG_ID || !GOOGLE_ADS_REVIEW_REQUEST_LABEL) return '';
  return `${GOOGLE_ADS_TAG_ID}/${GOOGLE_ADS_REVIEW_REQUEST_LABEL}`;
}

export function trackGoogleAdsReviewRequest(options: GoogleAdsConversionOptions = {}) {
  const sendTo = getReviewRequestSendTo();
  if (!sendTo || typeof window.gtag !== 'function') return false;

  window.gtag('event', 'conversion', {
    send_to: sendTo,
    transaction_id: options.transactionId || '',
    value: options.value ?? 1,
    currency: options.currency || 'USD',
  });

  return true;
}
