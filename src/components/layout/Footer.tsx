import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, Flame } from 'lucide-react';
import logo from '/tiff_logo_optimized.webp';
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_ADDRESS, COMPANY_NAME, COMPANY_DIVISION } from '../../config/contact';

const quickLinks = [
  { name: 'Home',         path: '/' },
  { name: 'About Us',     path: '/about' },
  { name: 'Products',     path: '/products' },
  { name: 'Projects',     path: '/projects' },
  { name: 'Advancements', path: '/advancements' },
  { name: 'Applications', path: '/applications' },
  { name: 'Contact Us',   path: '/contact' },
];

const productLinks = [
  { name: 'Fire Detection Systems',  path: '/products?category=fire-detection' },
  { name: 'Safety & Monitoring',      path: '/products?category=safety-monitoring' },
  { name: 'Industrial Lighting',      path: '/products?category=industrial-lighting' },
  { name: 'Advancements',      path: '/products?category=advancements' },
];

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground relative overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Flame accent line at top */}
      <div className="h-0.5 w-full bg-gradient-flame" />

      {/* ── Main Footer Grid ── */}
      <div className="container-full py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">

          {/* Company Info */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="AEI FireGuard" className="w-12 h-12 object-contain" />
              <div>
                <p className="font-heading font-semibold text-foreground text-sm leading-tight">
                  {COMPANY_NAME}
                </p>
                <p className="text-[10px] text-flame-orange uppercase tracking-[0.2em] font-medium mt-0.5">
                  {COMPANY_DIVISION}
                </p>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              India's trusted manufacturer of DGMS-approved Automatic Fire Detection
              Systems for heavy earth-moving machinery.
            </p>

            <div className="flex gap-2 flex-wrap">
              {['ISO 9001', 'ISO 14001', 'DGMS', 'MSME'].map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-flame-crimson/15 text-flame-orange border border-flame-crimson/25 text-[11px] font-semibold rounded-md"
                >
                  <Flame className="h-2.5 w-2.5" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-foreground tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-flame-orange transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-flame-crimson/50 rounded-full group-hover:bg-flame-orange transition-colors shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-foreground tracking-wide uppercase">
              Our Products
            </h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-flame-orange transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-flame-crimson/50 rounded-full group-hover:bg-flame-orange transition-colors shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-4 text-foreground tracking-wide uppercase">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-flame-orange shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                  {CONTACT_ADDRESS}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-flame-orange transition-colors"
                >
                  <Phone className="h-4 w-4 text-flame-orange" />
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 text-muted-foreground text-sm hover:text-flame-orange transition-colors"
                >
                  <Mail className="h-4 w-4 text-flame-orange" />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-border/20 relative z-10">
        <div className="container-full py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/60">
          <p>
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <Flame className="h-3 w-3 text-flame-crimson" />
            DGMS Approved Fire Detection & Suppression Systems
          </p>
        </div>
      </div>
    </footer>
  );
}
