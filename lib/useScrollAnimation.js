'use client';
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.once !== false) {
            observer.unobserve(element);
          }
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);
  
  return [ref, isVisible];
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setProgress(progress);
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return progress;
}

export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const element = ref.current;
    if (!element) return;
    
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      element.style.transform = `translateY(${rate}px)`;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return ref;
}
