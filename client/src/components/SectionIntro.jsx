export default function SectionIntro({ eyebrow, title, children, className = '' }) {
  return <div className={`section-heading ${className}`}><div><p className="eyebrow">{eyebrow}</p><h2 dangerouslySetInnerHTML={{ __html: title }} /></div>{children && <p>{children}</p>}</div>;
}
