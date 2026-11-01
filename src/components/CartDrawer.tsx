import React from 'react';
import { ProductItem } from '../types';
import { X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: { product: ProductItem; quantity: number }[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const [isOrdered, setIsOrdered] = React.useState(false);

  const handleCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-2xs">
      <div className="bg-[#faf9f6] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-stone-300 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-stone-500 font-medium">
              Atelier Bag
            </div>
            <h3 className="font-editorial text-2xl text-stone-900 font-medium">
              Your Curated Rituals ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {isOrdered ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-2xl text-stone-900">Order Confirmed</h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                Your products will be beautifully boxed and ready at your styling chair or prepared for priority courier dispatch.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 text-stone-500 space-y-3">
              <p className="font-editorial text-xl text-stone-700">Your bag is currently empty.</p>
              <p className="text-xs">Explore our curated clinical formulas or book an atelier styling experience.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg border border-stone-200 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                      {product.category}
                    </span>
                    <h5 className="text-xs font-semibold text-stone-900 truncate">{product.name}</h5>
                    <span className="text-xs font-mono font-medium text-stone-700 mt-1 block">
                      ${product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-stone-200 rounded">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono tabular-nums">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      aria-label="Remove item"
                      className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Subtotal */}
        {!isOrdered && items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-white space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Curbside Pickup or Dispatch</span>
              <span className="text-stone-900 font-medium">Complimentary</span>
            </div>

            <div className="flex items-center justify-between text-sm font-semibold text-stone-900">
              <span>Subtotal</span>
              <span className="font-mono text-base tabular-nums">${subtotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
            >
              Checkout Order <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
