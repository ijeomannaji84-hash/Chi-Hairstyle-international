import React, { useState } from 'react';
import { SERVICES, STYLISTS } from '../data/salonData';
import { Clock, Check, Scissors, Sparkles, ArrowRight } from 'lucide-react';

interface ServicesMenuProps {
  onSelectService: (serviceId: string) => void;
  onOpenBooking: () => void;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ onSelectService, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Cuts & Styling', 'Balayage & Color', 'Texture & Smoothing', 'Treatment Rituals'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory);

  return (
    <section className="py-16 bg-stone-100/60 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
              Atelier Menu
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
              Bespoke Hair Services &amp; Scalp Rituals
            </h2>
            <p className="text-stone-600 text-sm mt-2 max-w-xl">
              Transparent, gender-neutral pricing inclusive of consultation, botanical wash house ritual, 
              custom glossing, and editorial blowout.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-stone-200 rounded-lg shrink-0 overflow-x-auto self-start md:self-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white p-7 rounded-xl border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:border-stone-400 transition-all duration-200 group"
            >
              <div>
                {/* Category & Duration unboxed metadata */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <span className="font-medium uppercase tracking-wider">{service.category}</span>
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    <Clock className="w-3.5 h-3.5" />
                    {service.durationMinutes} min
                  </span>
                </div>

                <h3 className="text-xl font-editorial font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                  {service.description}
                </p>

                {/* Included Steps Checklist */}
                <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
                    Included in Experience:
                  </span>
                  {service.includedRituals.map((ritual, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-stone-900 shrink-0 mt-0.5" />
                      <span>{ritual}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Booking Action */}
              <div className="mt-7 pt-5 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Investment</span>
                  <span className="text-xl font-semibold text-stone-900 font-mono tabular-nums">
                    ${service.price}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Select &amp; Book
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Meet the Master Stylists */}
        <div className="mt-20">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
            The Artisans
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-stone-900 font-medium tracking-tight mb-8">
            Meet the Resident Masters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STYLISTS.map(stylist => (
              <div key={stylist.id} className="bg-white p-6 rounded-xl border border-stone-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={stylist.avatar}
                      alt={stylist.name}
                      className="w-16 h-16 rounded-full object-cover border border-stone-300"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-base font-semibold text-stone-900">{stylist.name}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">{stylist.title}</p>
                      <span className="text-[11px] font-mono text-stone-400 mt-1 block">{stylist.instagram}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {stylist.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                    {stylist.specialties.map((spec, i) => (
                      <span key={i} className="text-[11px] text-stone-600 font-medium">
                        {i > 0 && <span className="text-stone-300 mr-1.5">·</span>}
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">In Salon: Tue - Sat</span>
                  <button
                    onClick={onOpenBooking}
                    className="text-stone-900 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    Check Schedule <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
