import React from 'react';
import { Sparkles, Scissors, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  activeTab: 'lookbook' | 'services' | 'consultation' | 'stylist-suite' | 'shelf';
  setActiveTab: (tab: 'lookbook' | 'services' | 'consultation' | 'stylist-suite' | 'shelf') => void;
  onOpenBooking: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  cartCount,
  onOpenCart
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('lookbook')}
          className="text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <span className="font-editorial text-2xl tracking-[0.18em] uppercase font-medium text-stone-900 group-hover:text-stone-700 transition-colors whitespace-nowrap">
            Atelier Élan
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('lookbook')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'lookbook'
                ? 'text-stone-950 font-semibold'
                : 'hover:text-stone-950'
            }`}
          >
            Lookbook
            {activeTab === 'lookbook' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-950" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'services'
                ? 'text-stone-950 font-semibold'
                : 'hover:text-stone-950'
            }`}
          >
            Services &amp; Rituals
            {activeTab === 'services' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-950" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('consultation')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'consultation'
                ? 'text-stone-950 font-semibold'
                : 'hover:text-stone-950'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            AI Consultation
            {activeTab === 'consultation' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-950" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('stylist-suite')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'stylist-suite'
                ? 'text-stone-950 font-semibold'
                : 'hover:text-stone-950'
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-stone-700" />
            Stylist Suite
            {activeTab === 'stylist-suite' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-950" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('shelf')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'shelf'
                ? 'text-stone-950 font-semibold'
                : 'hover:text-stone-950'
            }`}
          >
            Atelier Shelf
            {activeTab === 'shelf' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-950" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="p-2.5 text-stone-700 hover:text-stone-950 hover:bg-stone-100/80 rounded-full transition-colors relative cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-stone-100 text-[10px] font-mono rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-medium tracking-wider uppercase text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Book Appointment
          </button>
        </div>

      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-stone-200/60 px-4 py-2.5 bg-[#faf9f6] text-[11px] font-medium tracking-wider uppercase text-stone-600 overflow-x-auto">
        <button
          onClick={() => setActiveTab('lookbook')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'lookbook' ? 'text-stone-900 font-bold' : ''}`}
        >
          Lookbook
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'services' ? 'text-stone-900 font-bold' : ''}`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('consultation')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'consultation' ? 'text-stone-900 font-bold' : ''}`}
        >
          Consultation
        </button>
        <button
          onClick={() => setActiveTab('stylist-suite')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'stylist-suite' ? 'text-stone-900 font-bold' : ''}`}
        >
          Stylist Suite
        </button>
        <button
          onClick={() => setActiveTab('shelf')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'shelf' ? 'text-stone-900 font-bold' : ''}`}
        >
          Shelf
        </button>
      </div>
    </header>
  );
};
