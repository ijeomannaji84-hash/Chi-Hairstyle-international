import React, { useState } from 'react';
import { Appointment, ClientFormula, FormulaResult } from '../types';
import { INITIAL_CLIENT_FORMULAS } from '../data/salonData';
import { Scissors, Search, Plus, Sparkles, Clock, CheckCircle2, AlertTriangle, ChevronRight, X, Loader2 } from 'lucide-react';

interface StylistSuiteProps {
  appointments: Appointment[];
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  onOpenBooking: () => void;
}

export const StylistSuite: React.FC<StylistSuiteProps> = ({
  appointments,
  onUpdateAppointmentStatus,
  onOpenBooking
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'formulas' | 'calculator'>('schedule');
  const [formulas, setFormulas] = useState<ClientFormula[]>(INITIAL_CLIENT_FORMULAS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // New formula modal state
  const [isNewFormulaModalOpen, setIsNewFormulaModalOpen] = useState<boolean>(false);
  const [newClientName, setNewClientName] = useState<string>('');
  const [newClientPhone, setNewClientPhone] = useState<string>('');
  const [newHairProfile, setNewHairProfile] = useState<string>('');
  const [newNaturalBase, setNewNaturalBase] = useState<number>(5);
  const [newTargetLevel, setNewTargetLevel] = useState<number>(7);
  const [newFormulaRecipe, setNewFormulaRecipe] = useState<string>('');
  const [newTonerRecipe, setNewTonerRecipe] = useState<string>('');
  const [newAllergies, setNewAllergies] = useState<string>('None recorded');
  const [newNotes, setNewNotes] = useState<string>('');

  // Formula Calculator state
  const [calcStartingLevel, setCalcStartingLevel] = useState<number>(5);
  const [calcTargetLevel, setCalcTargetLevel] = useState<number>(8);
  const [calcDesiredReflect, setCalcDesiredReflect] = useState<string>('Neutral Cool Beige');
  const [calcUnderlyingPigment, setCalcUnderlyingPigment] = useState<string>('Raw Orange/Yellow');
  const [calcGreyPercentage, setCalcGreyPercentage] = useState<string>('0%');
  const [calcHairCondition, setCalcHairCondition] = useState<string>('Normal to sensitized');
  const [calcLoading, setCalcLoading] = useState<boolean>(false);
  const [calculatedFormula, setCalculatedFormula] = useState<FormulaResult | null>(null);

  // Financial & Chair Metrics
  const totalRevenue = appointments.reduce((sum, a) => sum + a.totalAmount, 0);
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const inChairCount = appointments.filter(a => a.status === 'In Chair' || a.status === 'Processing').length;

  const handleAddFormula = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newFormula: ClientFormula = {
      id: `form-${Date.now()}`,
      clientName: newClientName,
      clientPhone: newClientPhone || '(555) 000-0000',
      hairProfile: newHairProfile || 'Medium density, balanced porosity',
      naturalBase: newNaturalBase,
      targetLevel: newTargetLevel,
      formulaRecipe: newFormulaRecipe,
      tonerRecipe: newTonerRecipe,
      patchTestDate: new Date().toISOString().split('T')[0],
      allergies: newAllergies || 'None',
      notes: newNotes,
      lastVisit: new Date().toISOString().split('T')[0]
    };

    setFormulas([newFormula, ...formulas]);
    setIsNewFormulaModalOpen(false);
    // Reset form
    setNewClientName('');
    setNewClientPhone('');
    setNewHairProfile('');
    setNewFormulaRecipe('');
    setNewTonerRecipe('');
    setNewNotes('');
  };

  const handleRunCalculator = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalcLoading(true);
    try {
      const response = await fetch('/api/formula-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startingLevel: calcStartingLevel,
          targetLevel: calcTargetLevel,
          underlyingPigment: calcUnderlyingPigment,
          desiredReflect: calcDesiredReflect,
          greyPercentage: calcGreyPercentage,
          hairCondition: calcHairCondition
        })
      });
      const data = await response.json();
      if (data.success && data.formula) {
        setCalculatedFormula(data.formula);
      }
    } catch (err) {
      console.error('Calculator error:', err);
    } finally {
      setCalcLoading(false);
    }
  };

  const filteredFormulas = formulas.filter(f => 
    f.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.hairProfile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.formulaRecipe.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-14 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-stone-700" />
              <span>Backstage Operations</span>
              <span aria-hidden="true">·</span>
              <span>Master Stylist &amp; Colorist Suite</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
              Chair Schedule &amp; Dispensary Formulas
            </h2>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-200 rounded-lg shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Today's Chairs ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'formulas'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Client Formula Book ({formulas.length})
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Color Lab Calculator
            </button>
          </div>
        </div>

        {/* Top Metric Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 block">Today's Chair Revenue</span>
            <span className="text-2xl font-semibold text-stone-900 font-mono tabular-nums mt-1 block">
              ${totalRevenue}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 block">Total Bookings</span>
            <span className="text-2xl font-semibold text-stone-900 font-mono tabular-nums mt-1 block">
              {appointments.length}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 block">Currently In Chair / Steam</span>
            <span className="text-2xl font-semibold text-stone-900 font-mono tabular-nums mt-1 block">
              {inChairCount}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 block">Completed Rituals</span>
            <span className="text-2xl font-semibold text-stone-900 font-mono tabular-nums mt-1 block">
              {completedCount}
            </span>
          </div>
        </div>

        {/* TAB 1: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900">Today's Active Schedule</h3>
                <p className="text-xs text-stone-500">Live chair status management and client notes</p>
              </div>

              <button
                onClick={onOpenBooking}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Walk-In / Add Booking
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {appointments.map(apt => (
                <div key={apt.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors">
                  
                  {/* Left: Client & Service */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 text-center shrink-0">
                      <span className="text-xs font-mono font-semibold text-stone-900 block">{apt.time}</span>
                      <span className="text-[10px] font-mono text-stone-400 block">{apt.id}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-900">{apt.clientName}</span>
                        <span className="text-xs text-stone-500 font-mono">{apt.clientPhone}</span>
                      </div>
                      <div className="text-xs text-stone-600 mt-0.5">
                        <strong className="text-stone-800">{apt.serviceName}</strong> with {apt.stylistName}
                      </div>

                      {apt.addOns.length > 0 && (
                        <div className="text-[11px] text-stone-500 mt-1">
                          Rituals: {apt.addOns.map(a => a.title).join(' · ')}
                        </div>
                      )}

                      {apt.notes && (
                        <div className="text-[11px] text-stone-600 italic mt-1 bg-stone-100 px-2 py-0.5 rounded inline-block">
                          Note: {apt.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Investment & Interactive Status Selector */}
                  <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                    <span className="text-sm font-semibold font-mono tabular-nums text-stone-900">
                      ${apt.totalAmount}
                    </span>

                    <select
                      value={apt.status}
                      onChange={(e) => onUpdateAppointmentStatus(apt.id, e.target.value as Appointment['status'])}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-md border cursor-pointer focus:outline-none ${
                        apt.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : apt.status === 'In Chair'
                          ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                          : apt.status === 'Processing'
                          ? 'bg-purple-50 text-purple-800 border-purple-200 font-semibold'
                          : 'bg-stone-100 text-stone-800 border-stone-300'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="In Chair">In Chair</option>
                      <option value="Processing">Processing / Steam</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT FORMULA BOOK */}
        {activeTab === 'formulas' && (
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search client name, base level, or formula..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <button
                onClick={() => setIsNewFormulaModalOpen(true)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start"
              >
                <Plus className="w-3.5 h-3.5" /> New Formula Record
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFormulas.map(form => (
                <div key={form.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">{form.clientName}</h4>
                        <span className="text-[11px] font-mono text-stone-400">{form.clientPhone}</span>
                      </div>
                      <span className="text-[11px] font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                        Base L{form.naturalBase} → L{form.targetLevel}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600 mt-2">
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Hair Profile</span>
                      <p>{form.hairProfile}</p>
                    </div>

                    <div className="mt-3 bg-stone-50 p-2.5 rounded border border-stone-200/70 text-xs">
                      <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold block mb-0.5">
                        Base Color Formula
                      </span>
                      <p className="font-mono text-stone-800 text-[11px] leading-relaxed">{form.formulaRecipe}</p>
                    </div>

                    {form.tonerRecipe && (
                      <div className="mt-2 bg-stone-50 p-2.5 rounded border border-stone-200/70 text-xs">
                        <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold block mb-0.5">
                          Toner / Gloss Glaze
                        </span>
                        <p className="font-mono text-stone-800 text-[11px] leading-relaxed">{form.tonerRecipe}</p>
                      </div>
                    )}

                    {form.allergies && form.allergies !== 'None' && (
                      <div className="mt-2 text-[11px] text-amber-800 bg-amber-50/70 px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Allergy / Sensitivities: {form.allergies}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Patch Tested: {form.patchTestDate}</span>
                    <span>Last Visit: {form.lastVisit}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: COLOR LAB CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
              <h3 className="text-base font-semibold text-stone-900 mb-1">Color Dispensary Formulator</h3>
              <p className="text-xs text-stone-500 mb-4">Calculates developer vol, gram ratios, and counter-balancing toner glazes</p>

              <form onSubmit={handleRunCalculator} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                      Starting Level (1-10)
                    </label>
                    <select
                      value={calcStartingLevel}
                      onChange={e => setCalcStartingLevel(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(l => (
                        <option key={l} value={l}>Level {l}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                      Target Level (1-10)
                    </label>
                    <select
                      value={calcTargetLevel}
                      onChange={e => setCalcTargetLevel(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(l => (
                        <option key={l} value={l}>Level {l}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Desired Reflect / Tone
                  </label>
                  <select
                    value={calcDesiredReflect}
                    onChange={e => setCalcDesiredReflect(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white"
                  >
                    <option value="Neutral Cool Beige">Neutral Cool Beige (.12 / 8N)</option>
                    <option value="Scandinavian Icy Blonde">Scandinavian Icy Ash (.11 / 10V)</option>
                    <option value="Warm Honey Amber">Warm Honey Amber (.34 / 8WG)</option>
                    <option value="Mocha Espresso">Mocha Espresso (.7 / 5M)</option>
                    <option value="Copper Sunburst">Copper Sunburst (.43 / 7C)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Grey Hair Coverage
                  </label>
                  <select
                    value={calcGreyPercentage}
                    onChange={e => setCalcGreyPercentage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white"
                  >
                    <option value="0%">0% (Natural or bleached base)</option>
                    <option value="25%">25% scattered grey</option>
                    <option value="50%">50% blended grey</option>
                    <option value="75%">75%+ resistant grey (Needs natural N series)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Underlying Melanin Exposed
                  </label>
                  <input
                    type="text"
                    value={calcUnderlyingPigment}
                    onChange={e => setCalcUnderlyingPigment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={calcLoading}
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {calcLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-300" />
                      Computing Formulations...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-stone-300" />
                      Calculate Chemical Formulation
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Results */}
            <div className="lg:col-span-7">
              {calculatedFormula ? (
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-stone-400">Recommended System</span>
                      <h4 className="text-lg font-semibold text-stone-900">{calculatedFormula.formulaType}</h4>
                    </div>
                    <span className="text-xs font-mono font-semibold bg-stone-100 px-2.5 py-1 rounded text-stone-800">
                      Developer: {calculatedFormula.developerVolume}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-semibold text-stone-700 block mb-1">Base Formulation &amp; Grams:</span>
                      <p className="font-mono bg-stone-50 p-2.5 rounded border border-stone-200 text-stone-900">
                        {calculatedFormula.baseMix}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-stone-700 block mb-1">Glossing / Counter-Balancing Toner:</span>
                      <p className="font-mono bg-stone-50 p-2.5 rounded border border-stone-200 text-stone-900">
                        {calculatedFormula.tonerMix}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <span className="text-stone-500 block text-[11px]">Processing Time</span>
                        <span className="font-semibold text-stone-900">{calculatedFormula.timingMinutes}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[11px]">Bond Repair Ratio</span>
                        <span className="font-semibold text-stone-900">{calculatedFormula.bondBuilderRule}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-600">
                      <strong className="text-stone-800">Neutralization Strategy: </strong>
                      {calculatedFormula.neutralizationNote}
                    </div>

                    <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200">
                      <strong>Safety Protocol: </strong>{calculatedFormula.safetyPrecautions}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="min-h-[300px] bg-stone-50 rounded-xl border border-dashed border-stone-300 p-8 flex flex-col items-center justify-center text-center">
                  <Scissors className="w-8 h-8 text-stone-400 mb-2" />
                  <span className="text-sm font-semibold text-stone-700">Dispensary Formulation Engine Ready</span>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm">
                    Configure your starting natural base level, grey ratio, and desired reflect tone to generate mixing ratios.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* New Formula Modal */}
      {isNewFormulaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-stone-300 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h4 className="text-base font-semibold text-stone-900">New Client Color Record</h4>
              <button
                onClick={() => setIsNewFormulaModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFormula} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={e => setNewClientName(e.target.value)}
                    placeholder="e.g. Margot Sterling"
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={newClientPhone}
                    onChange={e => setNewClientPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Hair Texture &amp; Density</label>
                <input
                  type="text"
                  value={newHairProfile}
                  onChange={e => setNewHairProfile(e.target.value)}
                  placeholder="e.g. Type 2B wavy, fine texture, porous ends"
                  className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Natural Base Level</label>
                  <select
                    value={newNaturalBase}
                    onChange={e => setNewNaturalBase(parseInt(e.target.value, 10))}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(l => (
                      <option key={l} value={l}>Level {l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Target Finished Level</label>
                  <select
                    value={newTargetLevel}
                    onChange={e => setNewTargetLevel(parseInt(e.target.value, 10))}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(l => (
                      <option key={l} value={l}>Level {l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Base Formula &amp; Developer</label>
                <input
                  type="text"
                  required
                  value={newFormulaRecipe}
                  onChange={e => setNewFormulaRecipe(e.target.value)}
                  placeholder="e.g. 40g 8N + 10g 8V + 50g 20Vol"
                  className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Toner / Glaze Recipe</label>
                <input
                  type="text"
                  value={newTonerRecipe}
                  onChange={e => setNewTonerRecipe(e.target.value)}
                  placeholder="e.g. 09V + Clear equal parts for 15 min"
                  className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Allergies / Scalp Notes</label>
                <input
                  type="text"
                  value={newAllergies}
                  onChange={e => setNewAllergies(e.target.value)}
                  placeholder="e.g. Sensitive to PPD, patch test passed"
                  className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewFormulaModalOpen(false)}
                  className="px-3 py-1.5 text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded cursor-pointer"
                >
                  Save Formula Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
