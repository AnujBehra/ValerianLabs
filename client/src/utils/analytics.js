const analyticsId = import.meta.env.VITE_ANALYTICS_ID;
let initialized = false;

export function initAnalytics() {
  if (initialized || !analyticsId || typeof window === 'undefined') return;
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', analyticsId, { send_page_view: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
  document.head.appendChild(script);
}

export function trackEvent(name, parameters = {}) {
  if (!analyticsId || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, parameters);
}

export function trackPageview(path) {
  if (!analyticsId || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href });
}
