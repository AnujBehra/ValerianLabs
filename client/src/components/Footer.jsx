import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>[YOUR COMPANY NAME]</span>
        </Link>
        <p>Custom business software<br />for growing companies.</p>
        <div className="footer-links">
          <Link to="/services">Services</Link><Link to="/industries">Industries</Link>
          <Link to="/about">About</Link><Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2024 [YOUR COMPANY NAME]. All rights reserved.</span><span><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></span></div>
    </footer>
  );
}
