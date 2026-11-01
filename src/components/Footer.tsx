import React from 'react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenConsultation: () => void;
  onSelectTab: (tab: 'lookbook' | 'services' | 'consultation' | 'stylist-suite' | 'shelf') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenConsultation,
  onSelectTab
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Ethos */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-editorial text-2xl tracking-[0.16em] uppercase font-medium text-white block">
              Atelier Élan
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An intimate private hair salon atelier uniting architectural precision cutting, 
              custom dimensional lighteners, and restorative botanical steam therapy.
            </p>
            <div className="pt-2 text-xs text-stone-400">
              <span>Appointment Only</span>
              <span className="mx-2 text-stone-600">·</span>
              <span>Mayfair Gallery &amp; Soho Studio</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold block">
              Explore Atelier
            </span>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onSelectTab('lookbook')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Transformation Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services &amp; Pricing Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('consultation')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Virtual AI Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('shelf')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Clinical Hair Care Shelf
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('stylist-suite')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Stylist &amp; Colorist Suite
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Hours */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold block">
              Salon Hours
            </span>
            <div className="space-y-1.5 text-xs text-stone-300 font-mono">
              <div className="flex justify-between">
                <span>Tuesday – Friday</span>
                <span>09:30 – 19:30</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>09:00 – 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday &amp; Monday</span>
                <span className="text-stone-500">Private Rituals</span>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold block">
              Concierge
            </span>
            <div className="space-y-1 text-xs text-stone-300">
              <p>14 Berkeley Square, Mayfair</p>
              <p className="font-mono text-stone-400">+44 (0)20 7946 0812</p>
              <p className="text-stone-400">concierge@atelierelan.co.uk</p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-stone-100 hover:bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Book Your Chair
              </button>
            </div>
          </div>

        </div>

        {/* Quiet Copyright & Policy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Atelier Élan Salon &amp; Coiffure. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>48-Hour Cancellation Courtesy</span>
            <span aria-hidden="true">·</span>
            <span>All-Inclusive Gender Neutral Pricing</span>
            <span aria-hidden="true">·</span>
            <span>Cruelty-Free Dispensary</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
