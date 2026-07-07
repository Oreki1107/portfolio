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
 * Uses the official Google tag snippet pattern and avoids duplicate script injection.
 */
export const initializeAnalytics = (): void => {
  if (typeof window === 'undefined' || isInitialized) return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

  if (!measurementId) {
    if (import.meta.env.DEV) {
      console.warn('GA4: Missing VITE_GA_MEASUREMENT_ID environment variable. Analytics skipped.');
    }
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
  });

  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  isInitialized = true;
};

/**
 * Tracks a page view event.
 * This is kept for future SPA route changes if the app ever adds a router.
 */
export const trackPageView = (path: string = window.location.pathname): void => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  if (!measurementId || typeof window.gtag !== 'function') return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
  });
};

/**
 * Tracks a custom event in Google Analytics.
 *
 * @param eventName - The descriptive name of the event (e.g., 'resume_download')
 * @param parameters - Optional payload containing event-specific parameters
 */
export const trackEvent = (eventName: string, parameters?: Record<string, any>): void => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  if (!measurementId || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, parameters);
};
