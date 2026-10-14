'use client';
import { useScrollReveal } from '@/lib/useScrollAnimation';

export default function AnimatedCard({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  
  return (
    <div
      ref={ref}
      className={`animated-card ${isVisible ? 'visible' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}
