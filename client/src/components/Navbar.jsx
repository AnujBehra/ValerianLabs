import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { trackEvent } from '../utils/analytics';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="[Your Company Name] home">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>[YOUR COMPANY NAME]</span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <span /><span /><span /><span className="sr-only">Toggle menu</span>
        </button>
        <nav className={`primary-nav ${isOpen ? 'open' : ''}`} aria-label="Primary navigation">
          <NavLink to="/services" onClick={closeMenu}>What we build</NavLink>
          <NavLink to="/about" onClick={closeMenu}>How it works</NavLink>
          <NavLink to="/industries" onClick={closeMenu}>Industries</NavLink>
          <Link to="/contact" className="nav-cta" onClick={() => { closeMenu(); trackEvent('navigation_cta_click', { location: 'header' }); }}>Start a conversation <span>↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
