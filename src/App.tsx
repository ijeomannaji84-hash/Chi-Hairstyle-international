import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Lookbook } from './components/Lookbook';
import { ServicesMenu } from './components/ServicesMenu';
import { AIConsultationSection } from './components/AIConsultationSection';
import { StylistSuite } from './components/StylistSuite';
import { ProductShelf } from './components/ProductShelf';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { INITIAL_APPOINTMENTS, SERVICES } from './data/salonData';
import { Appointment, ProductItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'lookbook' | 'services' | 'consultation' | 'stylist-suite' | 'shelf'>('lookbook');
  
  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingPreselectServiceId, setBookingPreselectServiceId] = useState<string | undefined>(undefined);
  const [bookingPreselectStylist, setBookingPreselectStylist] = useState<string | undefined>(undefined);

  // Cart / Shopping Bag state
  const [cartItems, setCartItems] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const handleOpenBooking = (serviceId?: string, stylistName?: string) => {
    setBookingPreselectServiceId(serviceId);
    setBookingPreselectStylist(stylistName);
    setIsBookingOpen(true);
  };

  const handleNewAppointment = (newApt: Appointment) => {
    setAppointments([newApt, ...appointments]);
  };

  const handleUpdateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleAddToCart = (product: ProductItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleApplyConsultationToBooking = (serviceName: string) => {
    // Match service name to ID
    const matched = SERVICES.find(s => 
      s.title.toLowerCase().includes(serviceName.toLowerCase()) ||
      serviceName.toLowerCase().includes(s.title.toLowerCase())
    );
    handleOpenBooking(matched ? matched.id : SERVICES[0].id);
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col font-sans-clean antialiased selection:bg-stone-900 selection:text-white">
      
      {/* 3-Zone Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section shown on primary discovery tabs */}
        {(activeTab === 'lookbook' || activeTab === 'services') && (
          <Hero
            onOpenBooking={() => handleOpenBooking()}
            onOpenConsultation={() => setActiveTab('consultation')}
            onExploreLookbook={() => setActiveTab('lookbook')}
          />
        )}

        {/* Tab View Router */}
        {activeTab === 'lookbook' && (
          <>
            <Lookbook
              onBookLook={(serviceId, stylistName) => handleOpenBooking(serviceId, stylistName)}
            />
            <ServicesMenu
              onSelectService={(serviceId) => handleOpenBooking(serviceId)}
              onOpenBooking={() => handleOpenBooking()}
            />
          </>
        )}

        {activeTab === 'services' && (
          <ServicesMenu
            onSelectService={(serviceId) => handleOpenBooking(serviceId)}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'consultation' && (
          <AIConsultationSection
            onApplyPlanToBooking={handleApplyConsultationToBooking}
          />
        )}

        {activeTab === 'stylist-suite' && (
          <StylistSuite
            appointments={appointments}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'shelf' && (
          <ProductShelf
            onAddToCart={handleAddToCart}
            cartProductIds={cartItems.map(i => i.product.id)}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenConsultation={() => setActiveTab('consultation')}
        onSelectTab={setActiveTab}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={bookingPreselectServiceId}
        initialStylistName={bookingPreselectStylist}
        onAppointmentBooked={handleNewAppointment}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

    </div>
  );
}
