'use client';
import { useScrollReveal } from '@/lib/useScrollAnimation';

export default function AnimatedSection({ children, className = '', animation = 'fade-up' }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      className={`animated-section ${animation} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
