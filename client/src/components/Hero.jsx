import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { trackEvent } from '../utils/analytics';

export default function Hero() {
  return <section className="hero section"><div className="container hero-grid"><Reveal><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> Software built around your business</p><h1>Custom business software, <em>built around</em> the way you work.</h1><p className="hero-subtitle">CRMs, inventory systems, ERP platforms and internal tools designed around your actual business processes — not the other way around.</p><div className="hero-actions"><Link className="button button-primary" to="/contact" onClick={() => trackEvent('primary_cta_click', { location: 'hero' })}>Book a Free Consultation <span>↗</span></Link><Link className="text-link" to="/services">See what we build <span>↓</span></Link></div><p className="trust-line"><span className="trust-check">✓</span> Supporting growing businesses in Raipur, across Chhattisgarh and remote clients across India.</p></div></Reveal><Reveal className="reveal-delay"><DashboardMockup /></Reveal></div></section>;
}

function DashboardMockup() {
  return (
    <div className="hero-visual" aria-label="Preview of a connected business platform">
      <div className="visual-glow" />
      <div className="platform-window">
        <div className="window-bar"><span className="window-brand"><i /> Operations hub</span><span className="window-status"><b /> Live</span></div>
        <div className="platform-content">
          <div className="platform-heading"><div><small>MONDAY, 14 OCTOBER</small><h3>Good morning, Priya</h3></div><span className="avatar">PS</span></div>
          <div className="metric-row">
            <div className="metric"><small>Open orders</small><strong>248</strong><span className="positive">↑ 12.4%</span></div>
            <div className="metric"><small>Inventory value</small><strong>₹42.8L</strong><span className="neutral">Across 3 locations</span></div>
          </div>
          <div className="dashboard-grid">
            <div className="chart-card"><div className="card-title"><span>Order flow</span><small>Last 7 days ˅</small></div><div className="chart"><span className="chart-value">₹8.4L <small>this week</small></span><div className="fake-chart" /></div></div>
            <div className="activity-card"><div className="card-title"><span>Recent activity</span><small>View all</small></div><ul><li><span className="activity-icon green">↗</span><span><b>Order #1048 approved</b><small>2 minutes ago</small></span></li><li><span className="activity-icon purple">＋</span><span><b>New vendor added</b><small>42 minutes ago</small></span></li><li><span className="activity-icon orange">!</span><span><b>Low stock: Gearbox 24</b><small>1 hour ago</small></span></li></ul></div>
          </div>
        </div>
      </div>
      <div className="floating-note note-one"><span>⌁</span><div><b>One connected system</b><small>Built for your workflow</small></div></div>
      <div className="floating-note note-two"><span>✓</span><div><b>Less manual work</b><small>More time to grow</small></div></div>
    </div>
  );
}
