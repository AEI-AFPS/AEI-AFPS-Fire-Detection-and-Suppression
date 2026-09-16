import { ShieldCheck, Award, CheckCircle, Star } from 'lucide-react';

const certifications = [
  { icon: ShieldCheck, name: 'ISO 9001:2015', description: 'Quality Management' },
  { icon: Award,       name: 'ISO 14001:2015', description: 'Environmental Mgmt.' },
  { icon: CheckCircle, name: 'DGMS Approved',  description: 'Mines Safety Certified' },
  { icon: Star,        name: '20+ Years',      description: 'Industry Experience' },
  { icon: Award,       name: 'MSME Registered',  description: 'Micro, Small & Medium Enterprises' },
  { icon: Award,       name: 'ASCB Global',  description: 'Accreditation of Certification Body' },
];

export function CertificationsBar() {
  return (
    <section className="bg-navy-dark border-y border-white/8 relative overflow-hidden">
      {/* Flame line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-flame" />

      <div className="container-full py-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-0 md:divide-x md:divide-white/10">
          {certifications.map((cert, i) => (
            <div
              key={cert.name}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 px-6 text-center sm:text-left animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 bg-flame-crimson/15 border border-flame-crimson/25 rounded-lg flex items-center justify-center shrink-0">
                <cert.icon className="h-5 w-5 text-flame-orange" />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-sm">{cert.name}</p>
                <p className="text-xs text-white/40 mt-0.5">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-flame" />
    </section>
  );
}
