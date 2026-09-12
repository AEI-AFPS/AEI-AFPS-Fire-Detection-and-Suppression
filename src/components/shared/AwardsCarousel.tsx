import React from 'react';
import { Award as AwardIcon } from 'lucide-react';
import { useAwards } from '../../lib/store';
import { GlowingEffect } from '../ui/glowing-effect';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

export const AwardsCarousel = () => {
  const { data: awards, isLoading } = useAwards();

  if (isLoading) {
    return null;
  }

  const hasAwards = awards && awards.length > 0;

  return (
    <div className="relative py-12 rounded-3xl overflow-hidden shadow-elevated px-4 md:px-12">
      {/* Flame gradient background — same as "Ready to Protect" CTA */}
      <div className="absolute inset-0 bg-gradient-flame" />

      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating glow orbs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="container-full relative z-10">

        {/* Header — title left, nav buttons right, no overlap */}
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              <AwardIcon className="h-4 w-4" />
              <span>Recognition</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Awards & <span className="text-yellow-200">Achievements</span>
            </h2>
          </div>

          {/* Nav buttons — always in their own column, never over text */}
          {hasAwards && (
            <div className="flex gap-2 shrink-0 pt-1">
              {/* We render placeholder divs here; actual buttons are inside Carousel below */}
              {/* Using a portal-like approach via data-carousel-prev/next is complex, 
                  so we use a separate state-less UI pattern: buttons will be rendered 
                  inside the Carousel but positioned via CSS safely */}
            </div>
          )}
        </div>

        {hasAwards ? (
          <Carousel
            opts={{
              align: 'start',
              loop: false,
              dragFree: true,
            }}
            className="w-full"
          >
            {/* Nav row above carousel, part of Carousel context */}
            <div className="flex justify-end gap-2 mb-4">
              <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white text-gray-800 border-white hover:bg-flame-crimson hover:text-white hover:border-flame-crimson transition-all h-10 w-10 rounded-full shadow-md" />
              <CarouselNext className="static translate-y-0 translate-x-0 bg-white text-gray-800 border-white hover:bg-flame-crimson hover:text-white hover:border-flame-crimson transition-all h-10 w-10 rounded-full shadow-md" />
            </div>

            <CarouselContent className="-ml-4 md:-ml-6">
              {awards.map((award) => (
                <CarouselItem
                  key={award.id}
                  className="pl-4 md:pl-6 basis-[85%] sm:basis-[45%] md:basis-[35%] lg:basis-[28%]"
                >
                  <div className="relative h-full group transition-transform duration-300 hover:-translate-y-2 flex flex-col">
                    {/* Transparent image area */}
                    <div className="relative h-52 flex items-center justify-center p-4">
                      {award.image_url ? (
                        <img
                          src={award.image_url}
                          alt={award.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          style={{ mixBlendMode: 'multiply' }}
                        />
                      ) : (
                        <AwardIcon className="h-16 w-16 text-white/40" />
                      )}

                      {award.year && (
                        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {award.year}
                        </div>
                      )}
                    </div>

                    {/* White background text section */}
                    <div className="pt-4 pb-5 px-4 flex-1 flex flex-col bg-white rounded-b-2xl rounded-t-none">
                      <h3 className="font-heading text-base font-bold text-gray-900 mb-1 line-clamp-2">
                        {award.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="py-12 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-center">
            <AwardIcon className="h-12 w-12 text-white/30 mb-3" />
            <p className="text-white/60 font-medium">No awards added yet.</p>
            <p className="text-sm text-white/40 mt-1">Admin can add awards in the dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};
