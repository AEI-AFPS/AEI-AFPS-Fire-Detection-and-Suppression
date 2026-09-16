import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Shield, ArrowRight, CheckCircle, Flame, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
</style>

/* ── Animated counter hook ── */
function useCounter(target: number, duration: number = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return count;
}

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCounter(visible ? value : 0, 1600);

  return (
    <div
      ref={ref}
      className="text-center animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="font-heading text-4xl xl:text-5xl font-bold text-gradient-flame">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-1 tracking-wide">{label}</div>
    </div>
  );
}

/* ── Floating particle ── */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full bg-gradient-flame opacity-100 z-1 pointer-events-none "
      style={style}
    />
  );
}

export function HeroSection() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    width: `${4 + Math.random() * 6}px`,
    height: `${4 + Math.random() * 6}px`,
    left: `${Math.random() * 100}%`,
    top: `${20 + Math.random() * 70}%`,
    animationDelay: `${i * 0.4}s`,
    animationDuration: `${4 + Math.random() * 4}s`,
    animation: 'float 6s ease-in-out infinite',
  }));

  return (
    <section className="relative min-h-[88vh] lg:min-h-[80vh] flex items-center overflow-hidden w-full">
      {/* ── Background layers ── */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/aei%20truck.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/70 z-0" />
      {/* <div className="absolute inset-0 gradient-hero opacity-60 z-0" /> */}

      {/* Grid overlay */}
      {/* <div className="absolute inset-0 grid-bg opacity-50" /> */}

      {/* Animated spotlight (Aceternity-style) */}
      {/* <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(6 85% 42% / 0.18) 0%, transparent 65%)',
          animation: 'float 8s ease-in-out infinite',
        }}
      /> */}
      {/* <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(29 90% 54% / 0.12) 0%, transparent 60%)',
          animation: 'float 6s ease-in-out infinite reverse',
        }}
      /> */}

      {/* Floating particles */}
      {/* {particles.map((p, i) => <Particle key={i} style={p} />)} */}

      {/* ── Content ── */}
      <div className="container-full relative z-10 py-16 xl:py-20">
        <div className="max-w-none">

          {/* Top badge */}
          <div className="flex items-center gap-2 mb-6 animate-fade-down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-flame-crimson/15 border border-flame-crimson/30 rounded-full">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flame-orange opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-flame-crimson" />
              </div>
              <Shield className="h-4 w-4 text-flame-gold" />
              <span className="text-flame-gold font-semibold text-xs uppercase tracking-widest">
                DGMS Approved Systems
              </span>
            </div>
          </div>

          {/* Main heading — full-width, Aceternity text reveal */}
          <h1
            className="font-heading text-foreground leading-[1.1] tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            <style>
              {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');`}
            </style>
            <span className="text-gradient-flame block font-bold text-5xl sm:text-5xl lg:text-6xl xl:text-7xl mb-3 " style={{ fontFamily: "'Montserrat', sans-serif" }}>
              ASSOCIATED ENGG. INDUSTRIES
            </span>
            <span className="text-white font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">Automatic Fire{' '}</span>{' '}
            <span className="text-gradient-flame font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">Detection & Suppression Systems</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-lg md:text-xl lg:text-2xl text-white/70 mb-10 leading-relaxed max-w-3xl animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            Protecting mining and construction equipment with cutting-edge fire
            suppression technology. Trusted by industry leaders across India for
            over two decades.
          </p>

          {/* Trust signals */}
          <div
            className="flex flex-wrap gap-4 mb-10 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            {[
              'ISO 9001 Certified',
              'ISO 14001 Certified',
              'MSME Registered',
              'ASCB Global', 
              // 'IAF Approved',
              '10000+ Installations',
              'Pan-India Service',
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-flame-orange shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-flame text-white font-semibold text-base rounded-xl shadow-flame hover:shadow-glow hover:scale-105 active:scale-100 transition-all duration-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Flame className="h-5 w-5" />
                Explore Products
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shimmer beam */}
              <span className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              to="/contact?type=general"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-flame text-white font-semibold text-base rounded-xl shadow-flame hover:shadow-glow hover:scale-105 active:scale-100 transition-all duration-200 overflow-hidden"
            >
              <Zap className="h-5 w-5 text-flame-orange" />
              Request a Quote
            </Link>
          </div>

          <div
            className="mt-16 pt-10 mb-20 border-t border-foreground/10 grid grid-cols-2 sm:grid-cols-4 gap-8 animate-fade-up"
            style={{ animationDelay: '500ms' }}
          >
            <Stat value={20}   suffix="+" label="Years Experience" delay={0} />
            <Stat value={10000} suffix="+" label="Installations"    delay={100} />
            <Stat value={100}  suffix="+" label="Clients Served"   delay={200} />
            <Stat value={24}   suffix="/7" label="Support"         delay={300} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
