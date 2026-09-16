import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackEvent, trackPageview } from '../utils/analytics';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '');

const metadata = {
  '/': ['Valerian Labs — Custom Business Software for Growing Companies', 'Valerian Labs builds custom CRM, ERP, inventory, dashboards and business software around the way your company works.'],
  '/services': ['Valerian Labs — What We Build', 'Workflow, operations and reporting software designed around your business.'],
  '/industries': ['Valerian Labs — Industries', 'Custom software for manufacturing, distribution, construction and growing SMEs.'],
  '/about': ['Valerian Labs — How It Works', 'A practical, collaborative process for turning messy workflows into useful software.'],
  '/contact': ['Valerian Labs — Start a Conversation', 'Tell us about your workflow and discover what thoughtful custom software can do.'],
  '/privacy': ['Valerian Labs — Privacy Policy', 'How we collect, use and protect information shared with us.'],
  '/terms': ['Valerian Labs — Terms of Use', 'Terms that apply when you use this website.'],
};

export default function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    initAnalytics();
    trackPageview(pathname);
    const [title, description] = metadata[pathname] || ['Valerian Labs — Page Not Found', 'The page you requested could not be found.'];
    document.title = title;
    const trackContactLink = (event) => {
      const link = event.target.closest?.('a');
      const href = link?.getAttribute('href') || '';
      if (href.startsWith('mailto:')) trackEvent('email_click', { location: pathname });
      if (href.startsWith('tel:')) trackEvent('phone_click', { location: pathname });
      if (href.startsWith('https://wa.me/')) trackEvent('whatsapp_click', { location: pathname });
    };
    document.addEventListener('click', trackContactLink);
    const setMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    };
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: `${SITE_URL}${pathname}` });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    let structuredData = document.head.querySelector('script[data-site-structured-data]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      structuredData.dataset.siteStructuredData = 'true';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Valerian Labs',
      url: SITE_URL,
      description: 'Custom business software for growing companies.',
      areaServed: ['Raipur', 'Chhattisgarh', 'India'],
    });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}${pathname}`;
    return () => document.removeEventListener('click', trackContactLink);
  }, [pathname]);
  return null;
}
