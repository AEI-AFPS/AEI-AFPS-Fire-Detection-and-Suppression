import { Award, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: Clock,
    title: '20+ Years Experience',
  description: 'Over two decades of expertise in manufacturing fire Detection and Suppression systems for heavy machinery.',
    glow: 'from-flame-crimson/20 to-transparent',
  },
  {
    icon: Award,
    title: 'DGMS Approved',
    description: 'All our systems meet the stringent safety standards set by the Directorate General of Mines Safety.',
    glow: 'from-flame-orange/20 to-transparent',
  },
  {
    icon: MapPin,
    title: 'Pan-India Service',
    description: 'Comprehensive service and support network across all major mining and industrial regions in India.',
    glow: 'from-flame-gold/20 to-transparent',
  },
  {
    icon: ShieldCheck,
    title: 'ISO Certified',
    description: 'ISO 9001 and ISO 14001 certified operations ensuring quality and environmental responsibility.',
    glow: 'from-flame-crimson/20 to-transparent',
  },
];

export function WhyAEI() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding bg-muted/40 relative overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 particle-bg opacity-40 pointer-events-none" />

      <div className="container-full relative z-10" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-10 lg:mb-14 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-foreground">
            Why Choose <span className="text-gradient-flame">US</span>?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-base lg:text-lg">
            India's leading manufacturer of automatic fire detection and suppression systems for heavy earth-moving machinery.
          </p>
        </div>

        {/* Cards grid — full width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`
                relative group bg-card border border-border/50 rounded-2xl p-6 lg:p-7
                hover:shadow-elevated hover:-translate-y-2 overflow-hidden transition-all duration-300
                ${visible ? 'animate-fade-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Glow radial behind card */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${feature.glow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon */}
              <div className="relative w-14 h-14 bg-flame-crimson/10 border border-flame-crimson/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-flame-crimson/20 group-hover:border-flame-crimson/40 transition-all duration-300">
                <feature.icon className="h-7 w-7 text-flame-crimson" />
              </div>

              {/* Text */}
              <h3 className="font-heading text-xl lg:text-2xl font-semibold text-foreground mb-3 group-hover:text-flame-crimson transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-flame group-hover:w-full transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
