import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Link className="brand footer-brand" to="/">
          <img className="brand-mark" src="/valerian-mark.svg" alt="" aria-hidden="true" />
          <span>VALERIAN LABS</span>
        </Link>
        <p>Custom business software<br />for growing companies.</p>
        <div className="footer-links">
          <Link to="/services">Services</Link><Link to="/industries">Industries</Link>
          <Link to="/about">About</Link><Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2024 Valerian Labs. All rights reserved.</span><span><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></span></div>
    </footer>
  );
}
