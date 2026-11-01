import React from 'react';
import { PRODUCTS } from '../data/salonData';
import { ProductItem } from '../types';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';

interface ProductShelfProps {
  onAddToCart: (product: ProductItem) => void;
  cartProductIds: string[];
}

export const ProductShelf: React.FC<ProductShelfProps> = ({ onAddToCart, cartProductIds }) => {
  return (
    <section className="py-16 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
              <span>Atelier Dispensary</span>
              <span aria-hidden="true">·</span>
              <span>Clinical Trichology Shelf</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
              Clinical Hair Care &amp; Thermal Shields
            </h2>
            <p className="text-stone-600 text-sm mt-2 max-w-xl">
              Formulated in clean micro-batches with biomimetic peptides, cold-pressed botanicals, 
              and zero drying alcohols to extend salon color and protect against 450°F heat.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => {
            const isAdded = cartProductIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-stone-200/90 shadow-2xs p-6 flex flex-col justify-between hover:border-stone-400 transition-all duration-200 group"
              >
                <div>
                  {/* Clean unboxed category & volume */}
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="uppercase font-medium tracking-wider">{product.category}</span>
                    <span className="font-mono text-[11px]">{product.volume}</span>
                  </div>

                  <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Active Botanicals */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block mb-1">
                      Hero Actives
                    </span>
                    <div className="text-[11px] text-stone-600 space-y-0.5">
                      {product.keyIngredients.map((ing, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-stone-400" />
                          <span>{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price and Add button */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-lg font-semibold text-stone-900 font-mono tabular-nums">
                    ${product.price}
                  </span>

                  <button
                    onClick={() => onAddToCart(product)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      isAdded
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
