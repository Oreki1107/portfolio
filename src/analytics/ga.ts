/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Extends the Window interface to include Google Analytics dataLayer and gtag function.
 */
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

let isInitialized = false;

/**
 * Initializes Google Analytics 4 asynchronously.
 * Validates the measurement ID and prevents duplicate injections.
 */
export const initializeAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    if (import.meta.env.DEV) {
      console.warn('GA4: Missing VITE_GA_MEASUREMENT_ID environment variable. Analytics skipped.');
    }
    return;
  }

  if (isInitialized) return;

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // We will handle page views manually
  });

  // Inject the Google Analytics script asynchronously
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  isInitialized = true;
};

/**
 * Tracks a page view event.
 * Ensures the measurement ID is present before sending the event.
 */
export const trackPageView = (path: string = window.location.pathname): void => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
  });
};

/**
 * Tracks a custom event in Google Analytics.
 *
 * @param eventName - The descriptive name of the event (e.g., 'resume_download')
 * @param parameters - Optional payload containing event-specific parameters
 */
export const trackEvent = (eventName: string, parameters?: Record<string, any>): void => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || !window.gtag) return;

  window.gtag('event', eventName, parameters);
};
