import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Mail, FileText, ChevronDown, CheckSquare, Square, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import logo from '/tiff_logo_optimized.webp';
import { cn } from '../../lib/utils';
import { CONTACT_PHONE, CONTACT_EMAIL } from '../../config/contact';
import { usePWAInstall } from '../../hooks/usePWAInstall';

const navLinks = [
  { name: 'Home',         path: '/' },
  { name: 'About Us',     path: '/about' },
  { name: 'Products',     path: '/products' },
  { name: 'Advancements', path: '/advancements' },
  // { name: 'Projects',     path: '/projects' },
  { name: 'Applications', path: '/applications' },
  { name: 'Contact',      path: '/contact' },
];

const BROCHURES = [
  {
    id: 'afps',
    label: 'AFPS Products Brochure',
    description: 'Automatic Fire Detection & Suppression Systems catalogue',
    file: '/aei-afps.pdf',
    filename: 'AEI-AFPS-Products-Brochure.pdf',
  },
  {
    id: 'general',
    label: 'Safety and security devices for HEMMs',
    description: 'Safety and security devices for HEMMs (Catalogue)',
    file: '/aei-general.pdf',
    filename: 'AEI-General-Brochure.pdf',
  },
] as const;

function InstallAppButtonDesktop() {
  const { isInstallable, installApp } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <Button
      onClick={installApp}
      variant="outline"
      className="ml-2 text-sm font-semibold border-border hover:bg-muted/50 transition-colors hidden xl:flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  );
}

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleBrochure = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleRequestBrochure = () => {
    const ids = Array.from(selected).join(',');
    navigate(`/contact?type=brochure&brochures=${encodeURIComponent(ids)}`);
    setDropdownOpen(false);
    setSelected(new Set());
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <div className="hidden lg:block bg-muted border-b border-border">
        <div className="container-full flex items-center justify-between py-1.5 text-xs">
          <div className="hidden md:flex items-center gap-5 text-muted-foreground">
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="flex items-center gap-1.5 hover:text-flame-orange transition-colors"
            >
              <Phone className="h-3 w-3" />
              {CONTACT_PHONE}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-1.5 hover:text-flame-orange transition-colors"
            >
              <Mail className="h-3 w-3" />
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-flame-crimson font-semibold">DGMS Approved</span>
            <span className="text-muted-foreground/30">|</span>
            <span className="text-muted-foreground">20+ Years of Excellence</span>
          </div>
        </div>
      </div>

      {/* ── Main Nav ─────────────────────────────────────────────────────── */}
      <nav
        className={cn(
          'w-full transition-all duration-300 border-b border-transparent',
          scrolled
            ? 'bg-background/80 backdrop-blur-md shadow-sm border-border/50'
            : 'bg-background'
        )}
      >
        <div className={cn(
          "container-full flex items-center justify-between transition-all duration-300",
          scrolled ? "py-0.5" : "py-1.5"
        )}>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0 transition-all duration-300"
          >
            <div className="relative">
              <img
                src={logo}
                alt="AEI FireGuard"
                className={cn(
                  "w-auto object-contain transition-all duration-300 origin-left",
                  scrolled ? "h-11 scale-80" : "h-14 scale-100"
                )}
              />
              <div className="absolute inset-0 bg-flame-crimson/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative font-medium text-sm uppercase tracking-wide px-3 xl:px-4 py-2 rounded-md transition-all duration-200',
                  location.pathname === link.path
                    ? 'text-flame-orange bg-muted'
                    : 'text-foreground/80 hover:text-flame-orange hover:bg-muted/50'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-flame rounded-full" />
                )}
              </Link>
            ))}

            {/* ── Install App Button ── */}
            <InstallAppButtonDesktop />

            {/* ── Brochure Dropdown ── */}
            <div ref={dropdownRef} className="relative ml-3">
              <Button
                onClick={() => { setDropdownOpen(o => !o); setSelected(new Set()); }}
                className="bg-gradient-flame text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-flame hover:shadow-glow hover:scale-105 transition-all duration-200 border-0 flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Brochure 
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", dropdownOpen && "rotate-180")} />
              </Button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border/60 rounded-xl shadow-elevated overflow-hidden z-50 animate-fade-down">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-border/50 bg-muted/40">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Select brochure(s) to download
                    </p>
                  </div>

                  {/* Brochure options */}
                  <div className="p-2 space-y-1">
                    {BROCHURES.map(b => {
                      const isSelected = selected.has(b.id);
                      return (
                        <button
                          key={b.id}
                          onClick={() => toggleBrochure(b.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-150",
                            isSelected
                              ? "bg-flame-crimson/10 border border-flame-crimson/30"
                              : "hover:bg-muted/60 border border-transparent"
                          )}
                        >
                          {isSelected
                            ? <CheckSquare className="h-4 w-4 text-flame-orange shrink-0" />
                            : <Square className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                          }
                          <FileText className="h-4 w-4 text-flame-orange/70 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground leading-tight">{b.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{b.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Request CTA */}
                  <div className="px-3 pb-3">
                    <button
                      onClick={handleRequestBrochure}
                      disabled={selected.size === 0}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                        selected.size > 0
                          ? "bg-gradient-flame text-white shadow-flame hover:shadow-glow hover:scale-[1.02]"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      )}
                    >
                      <FileText className="h-4 w-4" />
                      {selected.size === 0
                        ? "Select a brochure"
                        : selected.size === 1
                        ? "Request Brochure →"
                        : `Request ${selected.size} Brochures →`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: show only brand on sm, nothing extra on lg+ */}
          <div className="lg:hidden flex items-center">
            {/* Theme Toggle for mobile removed */}
          </div>
        </div>
      </nav>
    </header>
  );
}
