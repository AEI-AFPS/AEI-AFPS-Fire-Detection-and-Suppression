import { Layout } from '../components/layout/Layout';
import { CertificationsBar } from '../components/home/CertificationsBar';
import { Testimonials } from '../components/shared/Testimonials';
import { Globe3DDemo } from '../components/shared/GlobeDemo';
import { CheckCircle, Target, Eye, Users, Flame } from 'lucide-react';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { AwardsCarousel } from '../components/shared/AwardsCarousel';

const milestones = [
  { year: '2004', title: 'Company Founded',       description: 'Established in Hyderabad with a vision to provide safety solutions.' },
  { year: '2005', title: 'DGMS Approval',         description: 'Received first DGMS approval for fire detection and suppression systems.' },
  { year: '2010', title: 'ISO Certification',     description: 'Achieved ISO 9001 and ISO 14001 certifications.' },
  { year: '2015', title: 'Pan-India Expansion',   description: 'Extended service network across all major mining regions.' },
  { year: '2020', title: '10000+ Installations',   description: 'Milestone of 10000+ successful system installations.' },
];

const whyPoints = [
  { title: '100% Resource Dedication', desc: 'Focused expertise in protecting heavy machinery from fire and related operational risks for over 20 years.' },
  { title: '75% Mining Focus', desc: 'Deep domain expertise serving the mining sector.' },
  { title: '1 of One', desc: 'The only company specializing in protecting off-road equipment from fire.' },
  { title: 'Customizable Solutions', desc: 'We engineer to customer need, not the lowest compliance bar.' },
  { title: '0 Conglomerate Ties', desc: 'Independent with no internal competition for resources.' },
  { title: 'DGMS Approved', desc: 'Meeting all rigorous safety regulations and mandates.' },
];

const About = () => {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative bg-navy-dark py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top-left, hsl(6 85% 42% / 0.15), transparent 60%)' }}
        />
        <div className="h-0.5 w-full bg-gradient-flame absolute top-0" />

        <div className="container-full relative z-10">
          <p className="text-flame-gold text-sm font-semibold uppercase tracking-[0.2em] mb-3 animate-fade-down">
            Who We Are
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-5 animate-fade-up leading-tight">
            About <span className="text-gradient-flame">Associated Engg.</span>
          </h1>
          <p className="text-lg text-white/70 max-w-3xl animate-fade-up delay-200">
            India's trusted partner for automatic fire detection and suppression systems in the mining and construction industry.
          </p>
        </div>
      </section>

      {/* ── Company Overview ── */}
      <section className="section-padding">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            <div className="animate-slide-right">
              <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">Our Story</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                Two Decades of Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
                <p>
                  Associated Engineering Industries (AEI – AFPS Division) specializes in Automatic Fire Detection and Suppression Systems
                  for heavy earth-moving machinery. Headquartered in Uppal, Hyderabad, we have been serving the
                  mining and construction industry for over two decades.
                </p>
                <p>
                  Our systems are designed to protect operators, equipment, and assets in high-risk environments.
                  Every product we manufacture meets the stringent safety standards set by the Directorate General
                  of Mines Safety (DGMS).
                </p>
                <p>
                  With a pan-India service network, we provide comprehensive support from installation to maintenance,
                  ensuring your machinery remains protected at all times.
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="relative p-[2px] rounded-2xl md:rounded-3xl animate-slide-left">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="bg-card rounded-2xl p-8 border border-border/50 relative overflow-hidden shadow-elevated h-full">
                <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
                <div className="relative grid grid-cols-2 gap-8">
                  {[
                    { value: '20+',  label: 'Years Experience' },
                    { value: '10000+',label: 'Installations' },
                    { value: '100+', label: 'Clients' },
                    { value: '24/7', label: 'Support' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-heading text-4xl lg:text-5xl font-bold text-gradient-flame">{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="section-padding bg-muted/40">
        <div className="container-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: Eye,
                title: 'Our Vision',
                text: "To be India's most trusted provider of fire safety solutions for heavy machinery, setting industry standards for quality, innovation, and customer service.",
              },
              {
                icon: Target,
                title: 'Our Mission',
                text: 'To protect lives and assets through innovative fire detection and suppression technology, delivering reliable solutions that exceed regulatory requirements and customer expectations.',
              },
              {
                icon: Target,
                title: 'Our Approach',
                text: ( 
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-around ">
                    <li className="flex flex-col">
                      <strong className="text-foreground">Safety First</strong>
                      <span className="mt-1 text-sm">Protection designed around real operating conditions.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-foreground">Engineering Reliability</strong>
                      <span className="mt-1 text-sm">Robust systems for demanding industrial environments.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-foreground">Application-Focused Solutions</strong>
                      <span className="mt-1 text-sm">Solutions selected and configured according to equipment and operating requirements.</span>
                    </li>
                    <li className="flex flex-col">
                      <strong className="text-foreground">Service Support</strong>
                      <span className="mt-1 text-sm">Installation, maintenance and technical assistance.</span>
                    </li>
                  </ul>
                ),
              },
            ].map((item) => (
              <div key={item.title} className={`relative p-[2px] rounded-2xl md:rounded-3xl hover:-translate-y-2 transition-transform duration-300 ${item.title === 'Our Approach' ? 'md:col-span-2' : ''}`}>
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="group bg-card border border-border/50 rounded-2xl p-8 lg:p-10 relative overflow-hidden h-full shadow-elevated">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-flame-crimson/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-flame-crimson/10 border border-flame-crimson/20 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="h-7 w-7 text-flame-crimson" />
                    </div>
                    <h3 className="font-heading text-2xl lg:text-3xl font-semibold group-hover:text-flame-crimson transition-colors m-0">{item.title}</h3>
                  </div>
                  <div className="relative z-10 text-muted-foreground leading-relaxed">{item.text}</div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-flame group-hover:w-full transition-all duration-500 z-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose AEI ── */}
      <section className="section-padding">
        <div className="container-full">
          <div className="text-center mb-12">
            <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">Our Advantages</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {whyPoints.map((item, i) => (
              <div key={i} className="relative p-[2px] rounded-xl hover:-translate-y-1 transition-transform duration-200">
                <GlowingEffect spread={20} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="flex flex-col items-start gap-2 p-5 bg-card border border-border/50 rounded-xl relative overflow-hidden h-full z-10">
                  <div className="flex items-center gap-3 w-full">
                    <CheckCircle className="h-5 w-5 text-flame-orange shrink-0" />
                    <h3 className="text-foreground font-semibold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm lg:text-base mt-1 ml-8">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="section-padding">
        <div className="container-full">
          <div className="text-center mb-12">
            <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">Leadership</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">Driven by Vision, Delivered through Experience</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base lg:text-lg">
              Our executive team combines deep domain expertise with a commitment to indigenous innovation and customer-first execution. Customer satisfaction is not a metric — it is our paramount objective.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* CEO */}
            <div className="bg-card border border-border/50 rounded-3xl p-8 text-center hover:border-flame-crimson/30 transition-colors shadow-elevated">
              <div className="w-32 h-32 mx-auto rounded-full bg-muted border-4 border-background shadow-md flex items-center justify-center overflow-hidden mb-6">
                <Users className="w-12 h-12 text-muted-foreground/50" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">Mr. A V Mallikarjun</h3>
              {/* <p className="text-flame-orange text-sm font-semibold uppercase tracking-wider mb-4">Chief Executive Officer</p> */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                Leads strategy, operations and innovation — championing indigenous engineering and customer-first execution.
              </p>
            </div>
            {/* Managing Partner */}
            <div className="bg-card border border-border/50 rounded-3xl p-8 text-center hover:border-flame-crimson/30 transition-colors shadow-elevated">
              <div className="w-32 h-32 mx-auto rounded-full bg-muted border-4 border-background shadow-md flex items-center justify-center overflow-hidden mb-6">
                <Users className="w-12 h-12 text-muted-foreground/50" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">Mr. M N Kishore Kumar</h3>
              {/* <p className="text-flame-orange text-sm font-semibold uppercase tracking-wider mb-4">Managing Partner</p> */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ensures operational excellence and drives sustainable growth across all our major divisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-padding bg-muted/40 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container-full relative z-10">
          <div className="text-center mb-12">
            <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">Company History</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">Our Journey</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 lg:gap-10 mb-8 last:mb-0 group">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-flame rounded-full flex items-center justify-center shrink-0 shadow-flame group-hover:scale-110 transition-transform duration-300">
                    <span className="font-heading font-bold text-white text-xs leading-tight text-center">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-flame-crimson/40 to-transparent mt-2 min-h-[3rem]" />
                  )}
                </div>
                <div className="pb-8 pt-2">
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-foreground group-hover:text-flame-orange transition-colors">{milestone.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm lg:text-base">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Installation Process Overview ── */}
      <section className="section-padding">
        <div className="container-full">
          <div className="text-center mb-12">
            <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">Installation</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">System Installation Process</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base lg:text-lg">
              Engineered for each machine — installed for long-term reliability.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center max-w-6xl mx-auto">
            {[
              { id: '1', title: 'Machine Assessment' },
              { id: '2', title: 'Component Placement' },
              { id: '3', title: 'Nozzle Targeting' },
              { id: '4', title: 'Hose Routing' },
              { id: '5', title: 'Accessible Actuators' },
              { id: '6', title: 'Customer Validation' }
            ].map((step) => (
              <div key={step.id} className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-foreground font-bold font-heading mb-4 group-hover:bg-flame-crimson group-hover:text-white group-hover:border-flame-crimson transition-all">
                  {step.id}
                </div>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards Section ── */}
      <section className="py-8 md:py-16">
        <div className="container-full">
          <AwardsCarousel />
        </div>
      </section>

      {/* ── Global Presence (Globe) ── */}
      <section className="section-padding bg-muted/40 overflow-hidden relative">
        <div className="container-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="text-center lg:text-left flex-1 relative z-10">
            <p className="text-flame-orange text-sm font-semibold uppercase tracking-[0.2em] mb-3">Global Reach</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground">Where Our Products Are</h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto lg:mx-0 text-base lg:text-lg">
              Our advanced fire detection and suppression systems are securing heavy machinery across various international mining and construction hubs. We proudly serve industry leaders across the globe, bringing safety to the harshest environments.
            </p>
          </div>
          <div className="w-full lg:w-[60%] xl:w-[65%] flex-shrink-0 -mr-4 lg:-mr-32 relative">
            <Globe3DDemo />
          </div>
        </div>
      </section>

      <Testimonials />

      <CertificationsBar />
    </Layout>
  );
};

export default About;
