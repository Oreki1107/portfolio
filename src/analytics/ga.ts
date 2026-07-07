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
 * Initializes Google Analytics 4 following the canonical Google tag pattern:
 * 1. Set up dataLayer + gtag stub FIRST (so queued calls are not lost)
 * 2. Inject the external script SECOND (it will drain the queue on load)
 * 3. Call gtag('js') and gtag('config') after both are in place
 *
 * Prevents duplicate initialization via module-level flag.
 */
export const initializeAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  if (isInitialized) {
    console.log('[GA4] Already initialized — skipping duplicate call.');
    return;
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

  console.log('[GA4] initializeAnalytics() called.');
  console.log('[GA4] Measurement ID:', measurementId || 'MISSING — check VITE_GA_MEASUREMENT_ID env var');

  if (!measurementId) {
    console.warn(
      '[GA4] VITE_GA_MEASUREMENT_ID is not set. Analytics will not load.\n' +
      'For local dev: ensure .env contains VITE_GA_MEASUREMENT_ID=G-XXXXXXXX\n' +
      'For Vercel: add the variable in Project Settings → Environment Variables.'
    );
    return;
  }

  // Step 1: Initialise dataLayer and the gtag stub BEFORE the external script.
  // This ensures any gtag() calls made before the script loads are queued.
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

  // Step 2: Inject the external gtag.js script (async, non-blocking).
  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.onload = () => console.log('[GA4] gtag.js script loaded successfully.');
    script.onerror = () => console.error('[GA4] gtag.js script FAILED to load. Check network/CSP.');
    document.head.appendChild(script);
    console.log('[GA4] Script element injected into document.head:', script.src);
  } else {
    console.log('[GA4] gtag.js script already present in DOM.');
  }

  // Step 3: Push the js timestamp and config into the queue.
  // The external script will process these once it loads.
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    // page_view is sent automatically by gtag on config.
    // Set to false only if you want full manual control.
    send_page_view: true,
  });

  console.log('[GA4] gtag config pushed. window.dataLayer length:', window.dataLayer.length);
  console.log('[GA4] Initialization complete. Verify in: Network tab → googletagmanager.com/gtag/js');

  isInitialized = true;
};

/**
 * Tracks a page view event.
 * Use this when adding a client-side router (e.g. React Router) to send
 * page_view on each route change without a full page reload.
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
 * Tracks a custom GA4 event.
 *
 * @param eventName  - Snake_case event name (e.g. 'resume_download')
 * @param parameters - Optional map of event-specific parameters
 */
export const trackEvent = (eventName: string, parameters?: Record<string, any>): void => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, parameters);
};
