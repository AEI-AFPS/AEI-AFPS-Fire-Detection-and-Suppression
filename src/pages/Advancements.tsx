import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { Activity, CloudCog, Smartphone, ShieldAlert, Cpu, Network } from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Continuous telemetry streams system health, temperature, and pressure data directly to the dashboard, ensuring no risk goes unnoticed.',
  },
  {
    icon: CloudCog,
    title: 'Predictive Diagnostics',
    description: 'Advanced algorithms analyze historical data to predict maintenance needs and system anomalies before they become critical failures.',
  },
  {
    icon: Network,
    title: 'Cloud-Connected Fleet',
    description: 'Monitor your entire fleet across multiple mining sites from a single centralized web portal with robust role-based access control.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Alerts & Control',
    description: 'Receive instant push notifications and SMS alerts for critical events. Remotely trigger diagnostics right from your mobile device.',
  },
  {
    icon: ShieldAlert,
    title: 'Automated Compliance',
    description: 'Generate automated audit trails and compliance reports instantly, drastically reducing administrative overhead and regulatory risks.',
  },
  {
    icon: Cpu,
    title: 'Edge Processing',
    description: 'On-machine edge computing ensures that critical fire suppression decisions are made in milliseconds, even without network connectivity.',
  }
];

const Advancements = () => {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative bg-navy-dark py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="h-0.5 w-full bg-gradient-flame absolute top-0" />
        
        <div className="container-full relative z-10">
          <p className="text-flame-gold text-sm font-semibold uppercase tracking-[0.2em] mb-3 animate-fade-down">Future Scope</p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-up leading-tight max-w-4xl">
            Next-Generation <span className="text-gradient-flame">Platform</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl animate-fade-up delay-200 leading-relaxed">
            We are revolutionizing heavy machinery fire detection and suppression by bridging the gap between robust mechanical systems and intelligent digital oversight.
          </p>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="section-padding bg-background">
        <div className="container-full">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4">
              Intelligence at Scale
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our upcoming IoT platform is engineered to transform passive fire suppression into an active, data-driven safety ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="relative p-[2px] rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="bg-card border border-border/50 rounded-3xl p-8 h-full relative overflow-hidden z-10 flex flex-col shadow-sm">
                  <div className="w-14 h-14 bg-flame-crimson/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-flame-crimson" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-muted/30 border-t border-border/50">
        <div className="container-full text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-flame-crimson/10 text-flame-crimson font-medium text-sm mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flame-crimson opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-flame-crimson"></span>
            </span>
            Currently in Active R&D
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            Want to be a pilot partner?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            We are actively collaborating with select mining clients to field-test our IoT capabilities. Join our early access program to shape the future of safety.
          </p>
          <Link
            to="/contact?type=partner&name=IoT%20Pilot%20Program"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-flame-crimson text-white shadow hover:bg-flame-crimson/90 h-12 px-8"
          >
            Contact our R&D Team
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Advancements;
