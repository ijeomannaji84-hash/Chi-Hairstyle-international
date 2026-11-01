import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../data/salonData';
import { LookbookItem } from '../types';
import { ArrowUpRight, X, Clock, Sparkles, Check } from 'lucide-react';

interface LookbookProps {
  onBookLook: (serviceId: string, stylistName: string) => void;
}

export const Lookbook: React.FC<LookbookProps> = ({ onBookLook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<LookbookItem | null>(null);

  const categories = ['All', 'Balayage & Color', 'Texture & Smoothing'];

  const filteredItems = selectedCategory === 'All'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section className="py-16 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
              Transformative Portfolio
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
              Curated Hair Lookbook &amp; Formulations
            </h2>
            <p className="text-stone-600 text-sm mt-2 max-w-xl">
              Authentic client transformations completed at our atelier. Each look features 
              exact dispensary formulations, cutting geometry, and maintenance intervals.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg shrink-0 self-start md:self-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/90 hover:border-stone-400 transition-all duration-300 hover:shadow-sm"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 bg-stone-950/80 backdrop-blur-xs text-white text-xs font-medium tracking-wide rounded-md flex items-center gap-1.5">
                    View Formula <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Body with Unboxed Clean Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  {/* Clean unboxed metadata with bullet separator */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.hairType}</span>
                  </div>

                  <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-stone-700">By {item.stylistName}</span>
                  <span className="font-mono tabular-nums">{item.maintenance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail & Formula Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-[#faf9f6] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-300 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-10 p-2 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Left: Image */}
              <div className="md:col-span-5 relative bg-stone-100">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover min-h-[300px] md:min-h-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right: Technical Breakdown */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-medium mb-1.5">
                    <span>{activeModalItem.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeModalItem.hairType}</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-stone-900 font-medium leading-tight">
                    {activeModalItem.title}
                  </h3>

                  <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                    {activeModalItem.description}
                  </p>

                  {/* Stylist Formulation Spec Box */}
                  <div className="mt-6 bg-white p-4 rounded-lg border border-stone-200 space-y-3">
                    <div className="text-xs uppercase tracking-wider font-semibold text-stone-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-stone-700" />
                      Dispensary Formulation &amp; Method
                    </div>
                    <p className="text-xs text-stone-700 font-mono bg-stone-50 p-2.5 rounded border border-stone-200/80 leading-relaxed">
                      {activeModalItem.formulaNotes}
                    </p>
                  </div>

                  {/* Metadata Specs */}
                  <div className="mt-5 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-stone-500 block">Lead Stylist</span>
                      <span className="font-medium text-stone-900">{activeModalItem.stylistName}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Touch-Up Cadence</span>
                      <span className="font-medium text-stone-900 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-500" />
                        {activeModalItem.maintenance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer CTA */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      const item = activeModalItem;
                      setActiveModalItem(null);
                      onBookLook(item.serviceId, item.stylistName);
                    }}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Check className="w-4 h-4" />
                    Book This Transformation
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
