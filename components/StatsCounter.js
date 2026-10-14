'use client';
import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/lib/useScrollAnimation';

function AnimatedNumber({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      
      if (prefersReducedMotion) {
        setCount(value);
        return;
      }
      
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuad = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutQuad * value));
        
        if (now < endTime) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, hasAnimated, value, duration]);
  
  return (
    <span ref={ref} className="animated-number">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats }) {
  return (
    <div className="stats-counter">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="stat-value">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
