import React, { useState } from 'react';
import { SERVICES, STYLISTS, ADD_ONS } from '../data/salonData';
import { Service, Stylist, AddOnOption, Appointment } from '../types';
import { X, Calendar, Clock, Check, ChevronLeft, ChevronRight, User, Sparkles, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialStylistName?: string;
  onAppointmentBooked: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialStylistName,
  onAppointmentBooked
}) => {
  if (!isOpen) return null;

  // Find initial service or default to first
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || SERVICES[0].id
  );

  // Find initial stylist or default to 'first-available'
  const matchedStylist = initialStylistName
    ? STYLISTS.find(s => s.name.toLowerCase().includes(initialStylistName.toLowerCase()))
    : null;

  const [selectedStylistId, setSelectedStylistId] = useState<string>(
    matchedStylist ? matchedStylist.id : 'first-available'
  );

  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  
  // Date picker state: 7 days forward
  const today = new Date();
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].iso);
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');

  // Client form
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [hairNotes, setHairNotes] = useState<string>('');

  // Step indicator: 1 = Service & Stylist, 2 = Date & AddOns, 3 = Client Details, 4 = Confirmed
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  const activeService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  const activeStylist = STYLISTS.find(s => s.id === selectedStylistId);

  // Time slots
  const timeSlots = [
    '09:30 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'
  ];

  // Pricing calculations
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const totalInvestment = activeService.price + addOnsTotal;
  const totalDuration = activeService.durationMinutes + selectedAddOns.reduce((sum, item) => sum + item.durationMinutes, 0);

  const toggleAddOn = (addon: AddOnOption) => {
    if (selectedAddOns.some(a => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      return;
    }

    const newAppointment: Appointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      clientEmail,
      clientPhone,
      stylistId: activeStylist ? activeStylist.id : 'any-master',
      stylistName: activeStylist ? activeStylist.name : 'Master Stylist On-Duty',
      serviceId: activeService.id,
      serviceName: activeService.title,
      addOns: selectedAddOns,
      date: selectedDate,
      time: selectedTime,
      totalAmount: totalInvestment,
      status: 'Confirmed',
      notes: hairNotes || undefined,
      createdAt: new Date().toISOString()
    };

    onAppointmentBooked(newAppointment);
    setConfirmedBooking(newAppointment);
    setCurrentStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-[#faf9f6] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-300 shadow-2xl relative flex flex-col">
        
        {/* Header bar */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-stone-500 font-medium">
              Reservation Concierge
            </div>
            <h3 className="font-editorial text-2xl text-stone-900 font-medium">
              {currentStep === 4 ? 'Appointment Confirmed' : 'Book an Atelier Experience'}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step progress tracker */}
        {currentStep < 4 && (
          <div className="px-6 py-2.5 bg-stone-100/80 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span className={currentStep === 1 ? 'font-semibold text-stone-900' : ''}>
              1. Service &amp; Stylist
            </span>
            <span aria-hidden="true">→</span>
            <span className={currentStep === 2 ? 'font-semibold text-stone-900' : ''}>
              2. Date, Time &amp; Add-ons
            </span>
            <span aria-hidden="true">→</span>
            <span className={currentStep === 3 ? 'font-semibold text-stone-900' : ''}>
              3. Client Details
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 flex-1">
          
          {/* STEP 1: SERVICE & STYLIST */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-800 block mb-3">
                  Select Primary Service
                </label>
                <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {SERVICES.map(service => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        selectedServiceId === service.id
                          ? 'border-stone-900 bg-white shadow-2xs'
                          : 'border-stone-200 bg-white/60 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-stone-900">{service.title}</span>
                          <span className="text-xs text-stone-500">· {service.durationMinutes} min</span>
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">{service.description}</p>
                      </div>
                      <div className="text-sm font-semibold text-stone-900 font-mono tabular-nums shrink-0">
                        ${service.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-800 block mb-3">
                  Select Master Stylist
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedStylistId('first-available')}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedStylistId === 'first-available'
                        ? 'border-stone-900 bg-white shadow-2xs'
                        : 'border-stone-200 bg-white/60 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-700">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900">First Available Master</div>
                      <div className="text-[11px] text-stone-500">Optimal schedule flexibility</div>
                    </div>
                  </div>

                  {STYLISTS.map(stylist => (
                    <div
                      key={stylist.id}
                      onClick={() => setSelectedStylistId(stylist.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${
                        selectedStylistId === stylist.id
                          ? 'border-stone-900 bg-white shadow-2xs'
                          : 'border-stone-200 bg-white/60 hover:border-stone-300'
                      }`}
                    >
                      <img
                        src={stylist.avatar}
                        alt={stylist.name}
                        className="w-10 h-10 rounded-full object-cover border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-stone-900 truncate">{stylist.name}</div>
                        <div className="text-[11px] text-stone-500 truncate">{stylist.specialties[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Bar */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">Estimated Duration</span>
                  <span className="text-sm font-semibold text-stone-900 font-mono tabular-nums">{totalDuration} min</span>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  Continue to Schedule →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE, TIME & ADD-ONS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              
              {/* Date Selector */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-800 block mb-2.5">
                  Select Calendar Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map(item => (
                    <button
                      key={item.iso}
                      type="button"
                      onClick={() => setSelectedDate(item.iso)}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        selectedDate === item.iso
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold block opacity-80">{item.dayName}</span>
                      <span className="text-base font-semibold font-mono tabular-nums block my-0.5">{item.dateNumber}</span>
                      <span className="text-[10px] block opacity-80">{item.month}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-800 block mb-2.5">
                  Available Chair Arrival Times
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 text-xs font-mono font-medium rounded-md border text-center transition-colors cursor-pointer ${
                        selectedTime === time
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-on Rituals */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-800 block mb-2.5">
                  Add-On Botanical Treatments (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADD_ONS.map(addon => {
                    const isChecked = selectedAddOns.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                          isChecked
                            ? 'border-stone-900 bg-white shadow-2xs'
                            : 'border-stone-200 bg-white/70 hover:border-stone-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-400 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-stone-900">{addon.title}</span>
                            <span className="text-xs font-mono font-medium text-stone-800 tabular-nums">+${addon.price}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{addon.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer navigation */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  Continue to Details →
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: CLIENT DETAILS FORM */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              
              <div className="bg-white p-4 rounded-lg border border-stone-200 text-xs space-y-1.5 mb-4">
                <div className="text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
                  Reservation Summary
                </div>
                <div className="flex justify-between text-stone-900 font-medium">
                  <span>{activeService.title}</span>
                  <span className="font-mono">${activeService.price}</span>
                </div>
                {selectedAddOns.map(a => (
                  <div key={a.id} className="flex justify-between text-stone-600">
                    <span>+ {a.title}</span>
                    <span className="font-mono">${a.price}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-stone-100 flex justify-between font-semibold text-stone-900 text-sm">
                  <span>Total Investment ({totalDuration} min)</span>
                  <span className="font-mono">${totalInvestment}</span>
                </div>
                <div className="text-[11px] text-stone-500 pt-1">
                  Stylist: <span className="text-stone-800 font-medium">{activeStylist ? activeStylist.name : 'First Available Master'}</span> · {selectedDate} at {selectedTime}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="e.g. Adrienne Fontaine"
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    placeholder="adrienne@example.com"
                    className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Hair History &amp; Style Aspirations (Optional)
                </label>
                <textarea
                  rows={2}
                  value={hairNotes}
                  onChange={e => setHairNotes(e.target.value)}
                  placeholder="Mention any previous bleach, chemical relaxers, or inspiration photos you have in mind..."
                  className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-xs"
                >
                  Confirm Reservation (${totalInvestment})
                </button>
              </div>

            </form>
          )}

          {/* STEP 4: CONFIRMATION PASS */}
          {currentStep === 4 && confirmedBooking && (
            <div className="text-center py-4 space-y-6">
              
              <div className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-1">
                  Booking Confirmed
                </span>
                <h4 className="font-editorial text-2xl text-stone-900 font-medium">
                  We look forward to welcoming you, {confirmedBooking.clientName}
                </h4>
                <p className="text-xs text-stone-600 mt-2 max-w-md mx-auto">
                  A calendar confirmation and preparation note has been dispatched to {confirmedBooking.clientEmail}.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto bg-white p-5 rounded-xl border border-stone-300 shadow-xs text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="font-editorial text-lg tracking-wider uppercase font-medium text-stone-900">
                    Atelier Élan
                  </span>
                  <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                    {confirmedBooking.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Service</span>
                    <span className="font-semibold text-stone-900">{confirmedBooking.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Stylist</span>
                    <span className="font-semibold text-stone-900">{confirmedBooking.stylistName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Date &amp; Time</span>
                    <span className="font-semibold text-stone-900">{confirmedBooking.date} at {confirmedBooking.time}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Investment</span>
                    <span className="font-semibold text-stone-900 font-mono">${confirmedBooking.totalAmount}</span>
                  </div>
                </div>

                {confirmedBooking.addOns.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 text-xs text-stone-600">
                    <span className="font-medium text-stone-900">Add-ons: </span>
                    {confirmedBooking.addOns.map(a => a.title).join(', ')}
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  Return to Atelier
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
