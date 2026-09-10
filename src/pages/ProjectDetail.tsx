import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useProjects } from '../lib/store';
import { MapPin, Calendar, Truck, ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, AlertTriangle, Wrench, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '../components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  
  const { data: storeProjects, isLoading } = useProjects();
  const projects = storeProjects || [];
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && project?.photos) {
      setDirection(-1);
      setSelectedImageIndex((selectedImageIndex - 1 + project.photos.length) % project.photos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && project?.photos) {
      setDirection(1);
      setSelectedImageIndex((selectedImageIndex + 1) % project.photos.length);
    }
  };

  if (isLoading && !storeProjects) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-flame-orange" />
        </div>
      </Layout>
    );
  }

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <Layout>
      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && setSelectedImageIndex(null)}>
        <DialogContent className="max-w-7xl bg-black/95 border-0 p-0 overflow-hidden flex items-center justify-center shadow-2xl h-[90vh]">
          <DialogHeader className="sr-only">
            <DialogTitle>Image View</DialogTitle>
          </DialogHeader>
          
          {selectedImageIndex !== null && project?.photos && project.photos.length > 0 && (
            <div className="relative w-full h-full flex items-center justify-center group overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.img 
                  key={selectedImageIndex}
                  src={project.photos[selectedImageIndex]} 
                  alt="Expanded view" 
                  className="w-full max-h-[90vh] object-contain"
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
              
              {project.photos.length > 1 && (
                <>
                  <button onClick={handlePrevious} className="absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-flame-crimson transition-colors opacity-0 group-hover:opacity-100 z-50">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <button onClick={handleNext} className="absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-flame-crimson transition-colors opacity-0 group-hover:opacity-100 z-50">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm font-medium z-50">
                    {selectedImageIndex + 1} / {project.photos.length}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Back Link ── */}
      <div className="container-full pt-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-flame-orange transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Projects
        </Link>
      </div>

      {/* ── Hero Banner ── */}
      <section className={`relative py-12 md:py-16 lg:py-24 overflow-hidden ${project.coverImage && project.coverImage !== '/placeholder.svg' ? 'bg-black' : 'bg-navy-dark'}`}>
        {project.coverImage && project.coverImage !== '/placeholder.svg' && (
          <img src={project.coverImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        )}
        {/* <div className={`absolute inset-0 bg-gradient-to-t ${project.coverImage && project.coverImage !== '/placeholder.svg' ? 'from-black via-black/40' : 'from-navy-dark via-navy-dark/70'} to-transparent z-0 pointer-events-none`} /> */}
        <div className={`absolute inset-0 bg-gradient-to-r ${project.coverImage && project.coverImage !== '/placeholder.svg' ? 'from-black/80 via-black/20' : 'from-navy-dark/90 via-navy-dark/40'} to-transparent z-0 pointer-events-none`} />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0" />
        <div className="h-0.5 w-full bg-gradient-flame absolute top-0 z-20" />
        <div className="container-full relative z-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wider bg-flame-crimson/15 text-flame-orange border border-flame-crimson/20 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { icon: MapPin,     label: 'Location',  value: project.location },
              { icon: Calendar,   label: 'Date',      value: project.date },
              { icon: Truck,      label: 'Machinery', value: project.machineryType },
              { icon: CheckCircle2, label: 'Units',   value: `${project.units} systems installed` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-card border border-border/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-flame-orange" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Gallery Moved to Bottom */}
      {/* ── Three columns: Challenge / Solution / Results ── */}
      <section className="section-padding">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Challenge */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500" />
              <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <h2 className="font-heading text-xl text-foreground mb-3">The Challenge</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.challenge}</p>
            </div>

            {/* Solution */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-flame" />
              <div className="w-10 h-10 bg-flame-crimson/10 border border-flame-crimson/20 rounded-xl flex items-center justify-center mb-4">
                <Wrench className="h-5 w-5 text-flame-orange" />
              </div>
              <h2 className="font-heading text-xl text-foreground mb-3">Our Solution</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
            </div>

            {/* Results */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-500" />
              <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Lightbulb className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="font-heading text-xl text-foreground mb-4">Key Results</h2>
              <ul className="space-y-3">
                {project.advantages.map((adv) => (
                  <li key={adv} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dynamic Custom Sections ── */}
      {project.sections && project.sections.length > 0 && (
        <section className="py-12 border-t border-border/30 bg-muted/10">
          <div className="container-full">
            <div className="max-w-4xl mx-auto space-y-12">
              {project.sections.map((section, index) => (
                <div key={index} className="prose prose-slate dark:prose-invert max-w-none">
                  <h3 className="font-heading text-2xl text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-flame-crimson/10 text-flame-orange flex items-center justify-center text-sm font-bold border border-flame-crimson/20">
                      {index + 1}
                    </span>
                    {section.title}
                  </h3>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap pl-11">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Project Media Gallery ── */}
      {project.photos && project.photos.length > 0 && (
        <section className="bg-navy-dark border-y border-border/20 overflow-hidden">
          <div className="container-full py-12">
            <h2 className="font-heading text-2xl text-foreground mb-8 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
              {project.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden border border-white/10 cursor-pointer group" onClick={() => setSelectedImageIndex(i)}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                  <img src={photo} alt={`${project.title} gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative py-14 border-t border-border/50 bg-muted/30">
        <div className="container-full text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
            Ready for a similar solution?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
            Our engineers are ready to assess your fleet and design a custom fire detection and suppression system that meets DGMS requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={`/contact?type=project&name=${encodeURIComponent(project.title)}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-flame text-white font-semibold rounded-xl shadow-flame hover:shadow-glow hover:scale-105 transition-all duration-200"
            >
              Get a Free Consultation
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:border-flame-orange hover:text-flame-orange transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              More Projects
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
