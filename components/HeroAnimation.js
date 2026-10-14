'use client';
import { useEffect, useRef, useState } from 'react';

export default function HeroAnimation() {
  const canvasRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const animationFrameRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let connections = [];
    const particleCount = prefersReducedMotion ? 30 : 80;
    
    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class with depth and glow
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.z = Math.random() * 2 - 1; // -1 to 1 for depth
        this.baseVx = (Math.random() - 0.5) * 0.3;
        this.baseVy = (Math.random() - 0.5) * 0.3;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.hue = 250 + Math.random() * 40; // Purple to blue range
      }
      
      update(scrollProgress, reducedMotion) {
        if (!reducedMotion) {
          this.pulse += this.pulseSpeed;
          
          // Scroll-driven effects
          const scrollInfluence = scrollProgress * 2;
          this.vx = this.baseVx + scrollInfluence * 0.1;
          this.vy = this.baseVy - scrollInfluence * 0.2;
          
          this.x += this.vx;
          this.y += this.vy;
          
          // Wrap around
          if (this.x < -10) this.x = canvas.offsetWidth + 10;
          if (this.x > canvas.offsetWidth + 10) this.x = -10;
          if (this.y < -10) this.y = canvas.offsetHeight + 10;
          if (this.y > canvas.offsetHeight + 10) this.y = -10;
        }
      }
      
      draw(ctx, scrollProgress, reducedMotion) {
        const scale = 1 + this.z * 0.3 + scrollProgress * 0.2;
        const glowSize = reducedMotion ? 0 : (Math.sin(this.pulse) * 0.5 + 0.5) * 4;
        const finalRadius = this.radius * scale;
        const finalOpacity = this.opacity * (1 - scrollProgress * 0.3);
        
        // Glow effect
        if (!reducedMotion && glowSize > 0) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, finalRadius + glowSize
          );
          gradient.addColorStop(0, `hsla(${this.hue}, 80%, 65%, ${finalOpacity * 0.8})`);
          gradient.addColorStop(0.5, `hsla(${this.hue}, 80%, 65%, ${finalOpacity * 0.3})`);
          gradient.addColorStop(1, `hsla(${this.hue}, 80%, 65%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.fillRect(
            this.x - finalRadius - glowSize,
            this.y - finalRadius - glowSize,
            (finalRadius + glowSize) * 2,
            (finalRadius + glowSize) * 2
          );
        }
        
        // Core particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${finalOpacity})`;
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Scroll listener
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroHeight = canvas.offsetHeight;
      scrollProgressRef.current = Math.min(scrolled / heroHeight, 1);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      const scrollProgress = scrollProgressRef.current;
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update(scrollProgress, prefersReducedMotion);
        particle.draw(ctx, scrollProgress, prefersReducedMotion);
      });
      
      // Draw connections
      if (!prefersReducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.15 * (1 - scrollProgress * 0.5);
              const avgHue = (particles[i].hue + particles[j].hue) / 2;
              
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `hsla(${avgHue}, 80%, 70%, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      
      // Neural field effect (scroll-driven)
      if (!prefersReducedMotion && scrollProgress > 0) {
        const fieldIntensity = scrollProgress * 0.3;
        const gradient = ctx.createRadialGradient(
          canvas.offsetWidth / 2, canvas.offsetHeight / 2, 0,
          canvas.offsetWidth / 2, canvas.offsetHeight / 2, canvas.offsetWidth / 2
        );
        gradient.addColorStop(0, `hsla(260, 80%, 60%, ${fieldIntensity * 0.1})`);
        gradient.addColorStop(0.5, `hsla(250, 80%, 60%, ${fieldIntensity * 0.05})`);
        gradient.addColorStop(1, 'hsla(240, 80%, 60%, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="hero-animation-canvas"
      aria-hidden="true"
    />
  );
}
