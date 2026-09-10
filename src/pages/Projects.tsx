import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { useProjects } from '../lib/store';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { MapPin, Calendar, Truck, ArrowRight, CheckCircle2, Award, Loader2 } from 'lucide-react';

export default function Projects() {
  const { data: storeProjects, isLoading } = useProjects();
  const projects = storeProjects || [];

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative bg-navy-dark py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="h-0.5 w-full bg-gradient-flame absolute top-0" />
        <div className="container-full relative z-10">
          <p className="text-flame-gold text-sm font-semibold uppercase tracking-[0.2em] mb-3 animate-fade-down">
            Our Work
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-5 animate-fade-up leading-tight">
            Completed <span className="text-gradient-flame">Projects</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl animate-fade-up delay-200">
            Real-world deployments across India's leading mining and construction operations.
            See how AEI's fire detection and suppression systems safeguard lives and equipment.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-8 animate-fade-up delay-300">
            {[
              { label: 'Projects Completed', value: '200+' },
              { label: 'States Covered', value: '18+' },
              { label: 'Units Installed', value: '10,000+' },
              { label: 'Years Experience', value: '20+' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-heading text-3xl font-bold text-gradient-flame">{s.value}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="section-padding">
        <div className="container-full">
          {isLoading && !storeProjects ? (
             <div className="flex justify-center p-10"><Loader2 className="h-8 w-8 animate-spin text-flame-orange" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group block"
              >
                <div className="relative p-[2px] rounded-2xl h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <div className="relative z-10 bg-card border border-border/50 rounded-2xl overflow-hidden h-full flex flex-col">

                    {/* Cover image area */}
                    <div className="relative h-48 bg-gradient-to-br from-navy-dark to-[#1a0a0a] flex items-center justify-center overflow-hidden">
                      {project.coverImage && project.coverImage !== '/placeholder.svg' ? (
                        <img src={project.coverImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                      ) : (
                        <>
                          <div className="absolute inset-0 grid-bg opacity-20" />
                          <div className="absolute inset-0 bg-flame-crimson/5 group-hover:bg-flame-crimson/10 transition-colors duration-500" />
                          <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-20 h-20 bg-flame-crimson/15 border border-flame-crimson/25 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Award className="h-10 w-10 text-flame-orange" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Tag chips */}
                      <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold uppercase tracking-wider bg-flame-crimson/20 text-flame-orange border border-flame-crimson/20 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-flame" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="font-heading text-lg lg:text-xl text-foreground mb-3 group-hover:text-flame-orange transition-colors duration-300 leading-snug">
                        {project.title}
                      </h2>

                      {/* Meta info */}
                      <div className="flex flex-col gap-1.5 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-flame-orange shrink-0" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 text-flame-orange shrink-0" />
                          {project.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Truck className="h-3.5 w-3.5 text-flame-orange shrink-0" />
                          {project.units} units · {project.machineryType}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                        {project.description}
                      </p>

                      {/* Key advantages preview */}
                      <div className="space-y-1.5 mb-5">
                        {project.advantages.slice(0, 2).map((adv) => (
                          <div key={adv} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-flame-orange shrink-0 mt-0.5" />
                            {adv}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-sm text-flame-orange font-semibold mt-auto">
                        Read Case Study
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 md:py-20 bg-muted/30 border-t border-border/50">
        <div className="container-full text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Want to be our next <span className="text-gradient-flame">success story?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Talk to our engineers about protecting your fleet with India's most trusted DGMS-approved fire detection and suppression systems.
          </p>
          <Link
            to="/contact?type=general"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-flame text-white font-semibold rounded-xl shadow-flame hover:shadow-glow hover:scale-105 transition-all duration-200"
          >
            Get a Free Consultation
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
