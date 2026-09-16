import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ContactForm } from '../components/contact/ContactForm';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { GlowingEffect } from '../components/ui/glowing-effect';

const contactItems = [
  {
    icon: MapPin,
    title: 'Office Address',
    content: (
      <>Uppal Industrial Area,<br />Hyderabad, Telangana 500039<br />India</>
    ),
  },
  {
    icon: Phone,
    title: 'Phone',
    content: (
      <a href="tel:+91 79953 28191" className="hover:text-flame-orange transition-colors">
        +91 79953 28191
      </a>
    ),
    sub: 'For sales and general enquiries',
  },
  {
    icon: Mail,
    title: 'Email',
    content: (
      <a href="mailto:manitejagaddam1@gmail.com" className="hover:text-flame-orange transition-colors">
        info@aei-afps.com
      </a>
    ),
    sub: "We'll respond within 24 hours",
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: (
      <>Monday – Saturday: 9:00 AM – 6:00 PM<br />Sunday: Closed</>
    ),
  },
];

const Contact = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Scroll to form when arriving from a pre-fill link (product, project, brochure request)
    if (searchParams.has('type')) {
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        // Small timeout ensures the page layout has settled
        setTimeout(() => {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  }, [searchParams]);


  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative bg-navy-dark py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="h-0.5 w-full bg-gradient-flame absolute top-0" />
        <div className="container-full relative z-10">
          <p className="text-flame-gold text-sm font-semibold uppercase tracking-[0.2em] mb-3 animate-fade-down">Get In Touch</p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-5 animate-fade-up leading-tight">
            Contact <span className="text-gradient-flame">Us</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl animate-fade-up delay-200">
            Get in touch with our team for enquiries, quotes, or technical support.
          </p>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="section-padding">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

            {/* Contact Info */}
            <div className="animate-slide-right">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
                Reach Out to Our Team
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you need a quote, technical assistance, or have questions about our products,
                our team is here to help.
              </p>

              <div className="space-y-5">
                {contactItems.map((item) => (
                  <div key={item.title} className="relative p-[2px] rounded-xl hover:-translate-y-1 transition-transform duration-200">
                    <GlowingEffect spread={20} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                    <div className="flex items-start gap-4 p-5 bg-card border border-border/50 rounded-xl relative overflow-hidden h-full z-10">
                      <div className="relative z-10 w-11 h-11 bg-flame-crimson/10 border border-flame-crimson/20 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-flame-orange" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                        <div className="text-muted-foreground text-sm">{item.content}</div>
                        {item.sub && <p className="text-xs text-muted-foreground/70 mt-1">{item.sub}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact-form" className="relative p-[2px] rounded-2xl animate-slide-left">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 lg:p-10 shadow-elevated relative overflow-hidden h-full z-10">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-flame z-20" />
                <div className="relative z-10 flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-flame-crimson/10 border border-flame-crimson/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-flame-orange" />
                  </div>
                  <h2 className="font-heading text-xl md:text-2xl text-foreground">send an enquiry</h2>
                </div>
                <p className="relative z-10 text-muted-foreground text-sm mb-6">
                  Fill out the form below and our team will get back to you shortly.
                </p>
                <div className="relative z-10">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Map ── */}
      <section className="h-[400px] w-full relative overflow-hidden border-t border-border/50">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.457813271101!2d78.5509704760851!3d17.39664088349272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99000a6ff5fb%3A0x65328dcfab275c85!2sAssociate%20Eng%20industries!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin" 
          className="absolute inset-0 w-full h-full grayscale-[30%]" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
        
        {/* Overlay Button */}
        <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-8 z-10">
          <a 
            href="https://www.google.com/maps/place/Associate+Eng+industries/@17.3966358,78.5535454,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb99000a6ff5fb:0x65328dcfab275c85!8m2!3d17.3966358!4d78.5535454!16s%2Fg%2F11xkgc56_4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 bg-card border border-border/50 text-foreground font-semibold text-sm rounded-full shadow-elevated hover:shadow-glow hover:border-flame-orange hover:-translate-y-1 transition-all duration-300"
          >
            <MapPin className="w-5 h-5 text-flame-orange" />
            Open in Google Maps
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
