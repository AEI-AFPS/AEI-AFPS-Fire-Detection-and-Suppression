import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Flame, Shield, Radar, Lightbulb, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NoiseBackground } from "@/components/ui/noise-background";

const categories = [
  {
    id: 'fire-detection',
    name: 'Fire Detection and Suppression Systems',
    description: 'DGMS-approved automatic fire suppression for all HEMM types',
    icon: Flame,
    accent: 'text-flame-crimson bg-flame-crimson/10 border-flame-crimson/25',
    hover: 'group-hover:bg-flame-crimson/20 group-hover:border-flame-crimson/50',
  },
  {
    id: 'safety-monitoring',
    name: 'Safety & Monitoring',
    description: 'HD cameras, alarm systems, and AI-powered fatigue detection',
    icon: Shield,
    accent: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    hover: 'group-hover:bg-blue-500/20 group-hover:border-blue-500/40',
  },
  {
    id: 'proximity-detection',
    name: 'Proximity Detection',
    description: 'Radar sensors and 360° collision avoidance systems',
    icon: Radar,
    accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    hover: 'group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40',
  },
  {
    id: 'industrial-lighting',
    name: 'Industrial Lighting',
    description: 'Heavy-duty LED work lights built for night operations',
    icon: Lightbulb,
    accent: 'text-flame-gold bg-flame-gold/10 border-flame-gold/20',
    hover: 'group-hover:bg-flame-gold/20 group-hover:border-flame-gold/40',
  },
  {
    id: 'advancements',
    name: 'Advancements',
    description: 'IoT monitoring, AI thermal detection, and next-gen modular systems',
    icon: Sparkles,
    accent: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    hover: 'group-hover:bg-violet-500/20 group-hover:border-violet-500/40',
  },
];

export function FeaturedProducts() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-[0.03] pointer-events-none" />

      <div className="container-full relative z-10">
        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div>
            <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Product Range
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-foreground">
              Our <span className="text-gradient-flame">Products</span>
            </h2>
          </div>
          
          <Button asChild variant="outline" size="lg" className="shrink-0 self-start lg:self-auto border-flame-crimson/30 text-flame-crimson bg-gradient-flame text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-flame hover:shadow-glow hover:scale-105 transition-all duration-200 border-0">
            <Link to="/products" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`
                group relative bg-card border border-border/50 rounded-2xl p-6 lg:p-8
                hover:shadow-elevated hover:-translate-y-2 overflow-hidden transition-all duration-300
                ${visible ? 'animate-fade-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 border transition-all duration-300 ${cat.accent} ${cat.hover}`}>
                <cat.icon className="h-7 w-7" />
              </div>

              <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-flame-crimson transition-colors duration-300">
                {cat.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {cat.description}
              </p>

              <div className="flex items-center text-flame-crimson text-sm font-semibold">
                Explore
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>

              {/* Bottom beam */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-flame group-hover:w-full transition-all duration-500 rounded-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
