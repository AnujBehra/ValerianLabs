import { useEffect, useRef } from 'react';

export default function Reveal({ children, className = '' }) {
  const elementRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={elementRef} className={`reveal ${className}`}>{children}</div>;
}
