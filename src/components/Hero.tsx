import React from 'react';
import { ArrowUpRight, Sparkles, Calendar } from 'lucide-react';
import { HERO_IMAGE } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenConsultation: () => void;
  onExploreLookbook: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenConsultation,
  onExploreLookbook,
}) => {
  return (
    <section className="relative border-b border-stone-200 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        
        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-7">
            
            {/* Unboxed category / location kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
              <span>Haute Coiffure</span>
              <span aria-hidden="true">·</span>
              <span>Mayfair &amp; Soho Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Bespoke Hair Architecture</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.08] font-medium tracking-tight text-balance">
              Precision cuts, bespoke color formulas, and elevated hair rituals.
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-base lg:text-lg text-stone-600 font-normal leading-relaxed max-w-xl">
              Led by Master Stylists Elena Vance, Marcus Rivera, and Maya Lin. 
              We curate dimensional balayage, reflective glass silk presses, and 
              textured curl architecture rooted in trichological hair health.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-stone-300" />
                Book Your Chair
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 border border-stone-300 hover:border-stone-900 bg-white/70 hover:bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center gap-2 cursor-pointer shadow-2xs active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-stone-700" />
                AI Hair Diagnostic
              </button>

              <button
                onClick={onExploreLookbook}
                className="px-4 py-3 text-stone-600 hover:text-stone-900 text-xs font-medium tracking-wider uppercase inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                View Lookbook
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Editorial Stylist Mention */}
            <div className="pt-4 border-t border-stone-200/80 flex items-center gap-6 text-xs text-stone-500">
              <div>
                <span className="font-semibold text-stone-900">Elena Vance</span> — Color &amp; Blonding
              </div>
              <span aria-hidden="true" className="text-stone-300">/</span>
              <div>
                <span className="font-semibold text-stone-900">Marcus Rivera</span> — Precision &amp; Silk
              </div>
            </div>

          </div>

          {/* Right Column: Hero Studio Atmosphere Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100 shadow-md border border-stone-200/80 group">
              <img
                src={HERO_IMAGE}
                alt="Atelier Élan minimalist hair salon interior with arched illuminated mirrors and travertine stations"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Quiet caption badge */}
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 backdrop-blur-md bg-stone-950/60 p-3 rounded-lg flex items-center justify-between border border-white/10">
                <span className="font-medium tracking-wide">Station 01 — The Sunlit Main Gallery</span>
                <span className="text-stone-300">Appointment Only</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Full-Width Trust / Craft Strip */}
        <div className="mt-14 pt-10 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-stone-900 font-semibold text-sm tracking-tight mb-1">
              Bespoke Color Formulations
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              Every gloss and lightener is customized in our dispensary to preserve structural keratin.
            </p>
          </div>

          <div>
            <div className="text-stone-900 font-semibold text-sm tracking-tight mb-1">
              Texture Inclusivity
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              Certified mastery in 1A through 4C coil structures, dry curl architecture, and thermal silk presses.
            </p>
          </div>

          <div>
            <div className="text-stone-900 font-semibold text-sm tracking-tight mb-1">
              The Botanical Wash House
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              Private low-lit shampoo sanctuary featuring Japanese scalp exfoliation and deep steam therapy.
            </p>
          </div>

          <div>
            <div className="text-stone-900 font-semibold text-sm tracking-tight mb-1">
              Seamless Digital Care
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              Permanent digital client formula archives and custom AI aftercare regimens for every visit.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
