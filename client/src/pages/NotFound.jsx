import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main className="inner-page"><section className="section"><div className="container narrow-intro">
    <p className="eyebrow">404 · Not found</p><h1>This page took a <em>wrong turn.</em></h1>
    <p>We couldn't find the page you're looking for.</p><Link className="button button-primary" to="/">Back to home <span>↗</span></Link>
  </div></section></main>;
}
