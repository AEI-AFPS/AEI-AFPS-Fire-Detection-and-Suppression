import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Truck, Mountain, Building2, Factory, HardHat, Wrench, Flame, ShieldCheck } from 'lucide-react';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { Car } from 'lucide-react';

const machineryTypes = [
  { name: 'Excavators',   icon: Truck },
  { name: 'Dozers',       icon: Truck },
  { name: 'Dump Trucks',  icon: Truck },
  { name: 'Loaders',      icon: Truck },
  { name: 'Graders',      icon: Truck },
  { name: 'Drill Rigs',   icon: Wrench },
  { name: 'Cranes',       icon: HardHat },
  { name: 'Compactors',   icon: Truck },
  { name: 'Commercial Vehicles',   icon: Car },
];

const sectors = [
  {
    name: 'Mining',
    icon: Mountain,
    description: 'Open-cast and underground mining operations with heavy earth-moving machinery.',
    applications: ['Coal mines', 'Iron ore mines', 'Limestone quarries', 'Bauxite mines'],
    color: 'text-flame-crimson bg-flame-crimson/10 border-flame-crimson/25',
  },
  {
    name: 'Construction',
    icon: Building2,
    description: 'Large-scale construction projects requiring heavy equipment safety.',
    applications: ['Highway construction', 'Dam projects', 'Building construction', 'Infrastructure'],
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    name: 'Industrial',
    icon: Factory,
    description: 'Industrial facilities with material handling and processing equipment.',
    applications: ['Steel plants', 'Power plants', 'Cement factories', 'Port operations'],
    color: 'text-flame-gold bg-flame-gold/10 border-flame-gold/20',
  },
];

const Applications = () => {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative bg-navy-dark py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="h-0.5 w-full bg-gradient-flame absolute top-0" />
        <div className="container-full relative z-10">
          <p className="text-flame-gold text-sm font-semibold uppercase tracking-[0.2em] mb-3 animate-fade-down">Use Cases</p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-5 animate-fade-up leading-tight">
            <span className="text-gradient-flame">Applications</span>
          </h1>
          <p className="text-lg text-white/55 max-w-3xl animate-fade-up delay-200">
            Our fire Detection and Suppression and safety systems are designed for diverse heavy machinery across multiple industries.
          </p>
        </div>
      </section>

      {/* ── Machinery Types ── */}
      <section className="section-padding">
        <div className="container-full">
          <div className="text-center mb-10">
            <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">Equipment Coverage</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Machinery We Protect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our systems are compatible with all types of Heavy Earth Moving Machinery (HEMM) used in mining and construction.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-9 gap-4">
            {machineryTypes.map((m, i) => (
              <div
                key={m.name}
                className="relative p-[2px] rounded-xl hover:-translate-y-2 transition-transform duration-200 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <GlowingEffect spread={20} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="group bg-card border border-border/50 rounded-xl p-4 text-center hover:border-flame-crimson/40 hover:bg-flame-crimson/3 hover:shadow-elevated relative overflow-hidden h-full z-10">
                  <div className="relative z-10 w-12 h-12 bg-flame-crimson/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-flame-crimson/20 transition-colors">
                    <m.icon className="h-6 w-6 text-flame-crimson" />
                  </div>
                  <p className="relative z-10 font-medium text-foreground text-sm">{m.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sectors ── */}
      <section className="section-padding bg-muted/40">
        <div className="container-full">
          <div className="text-center mb-10">
            <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">Industries Served</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">Industry Sectors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sectors.map((sector, i) => (
              <div key={sector.name} className="relative p-[2px] rounded-2xl hover:-translate-y-2 transition-transform duration-300 animate-fade-up" style={{ animationDelay: `${i * 120}ms` }}>
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="group bg-card border border-border/50 rounded-2xl p-8 relative overflow-hidden h-full z-10 shadow-elevated">
                  <div className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border ${sector.color}`}>
                    <sector.icon className="h-7 w-7" />
                  </div>
                  <h3 className="relative z-10 font-heading text-2xl font-semibold text-foreground mb-3 group-hover:text-flame-crimson transition-colors">{sector.name}</h3>
                  <p className="relative z-10 text-muted-foreground mb-5 text-sm leading-relaxed">{sector.description}</p>
                  <ul className="relative z-10 space-y-2">
                    {sector.applications.map((app) => (
                      <li key={app} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-flame-crimson rounded-full shrink-0" />
                        {app}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-flame group-hover:w-full transition-all duration-500 z-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DGMS Compliance ── */}
      <section className="section-padding">
        <div className="container-full">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">Regulatory</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">DGMS Compliance</h2>
              <p className="text-muted-foreground mt-4 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
                The Directorate General of Mines Safety (DGMS) mandates fire Detection and Suppression systems for heavy machinery
                in mining operations. Our AFPS systems meet all DGMS guidelines.
              </p>
            </div>

            <div className="bg-flame-crimson/8 border border-flame-crimson/20 rounded-2xl p-6 lg:p-8 mb-8 flex items-start gap-4">
              <ShieldCheck className="h-7 w-7 text-flame-orange shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">DGMS Circular No. 02/2013</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Mandates installation of automatic fire detection and suppression systems on all heavy earth-moving machinery in open-cast mines.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/products?category=fire-detection"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-flame text-white font-semibold rounded-xl shadow-flame hover:shadow-glow hover:scale-105 transition-all duration-200"
              >
                <Flame className="h-5 w-5" />
                View Fire Detection & Suppression Systems
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-flame" />
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="container-full relative z-10 py-14 text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">Need a Custom Solution?</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 text-base lg:text-lg">
            Our engineering team can design and implement fire detection & suppression systems tailored to your specific machinery and operational requirements.
          </p>
          <Link
            to="/contact?type=general"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-flame-crimson font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Contact Our Experts
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Applications;
