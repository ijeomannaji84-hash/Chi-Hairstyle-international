import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, Check, AlertCircle, HelpCircle } from 'lucide-react';
import { AIConsultationResult } from '../types';

interface AIConsultationSectionProps {
  onApplyPlanToBooking: (serviceName: string) => void;
}

export const AIConsultationSection: React.FC<AIConsultationSectionProps> = ({ onApplyPlanToBooking }) => {
  const [hairType, setHairType] = useState<string>('Curly (3A-3C)');
  const [porosity, setPorosity] = useState<string>('Medium (Balanced)');
  const [chemicalHistory, setChemicalHistory] = useState<string>('Highlighted / Balayage');
  const [maintenanceLevel, setMaintenanceLevel] = useState<string>('Medium (Every 8-10 weeks)');
  const [primaryGoal, setPrimaryGoal] = useState<string>('Dimensional warmth with healthy bounce');
  const [lifestyleNotes, setLifestyleNotes] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AIConsultationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/hair-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hairType,
          porosity,
          chemicalHistory,
          maintenanceLevel,
          primaryGoal,
          lifestyleNotes
        })
      });

      const data = await response.json();
      if (data.success && data.consultation) {
        setResult(data.consultation);
      } else {
        throw new Error(data.error || 'Failed to generate consultation');
      }
    } catch (err: any) {
      console.error('Consultation fetch error:', err);
      setErrorMsg('Unable to connect with AI Diagnostic. Displaying curated stylist recommendations below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            <span>Intelligent Trichology</span>
            <span aria-hidden="true">·</span>
            <span>Virtual Consultation</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
            AI Hair Diagnostic &amp; Architecture Generator
          </h2>
          <p className="text-stone-600 text-sm mt-2 leading-relaxed">
            Our atelier AI assistant analyzes your hair fiber profile, porosity, and styling aspirations to 
            generate a tailored cutting geometry, chemical approach, and at-home wash day protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Questionnaire */}
          <div className="lg:col-span-5 bg-white p-7 rounded-xl border border-stone-200/90 shadow-2xs">
            <h3 className="text-base font-semibold text-stone-900 mb-5 flex items-center justify-between">
              <span>Your Hair Fiber Profile</span>
              <span className="text-xs font-normal text-stone-400">Step 1 of 1</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Hair Type */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                  1. Hair Texture &amp; Curl Pattern
                </label>
                <select
                  value={hairType}
                  onChange={e => setHairType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                >
                  <option value="Straight (1A-1C)">Straight (Type 1A - 1C)</option>
                  <option value="Wavy (2A-2C)">Wavy (Type 2A - 2C)</option>
                  <option value="Curly (3A-3C)">Curly (Type 3A - 3C)</option>
                  <option value="Coily / Tight Curls (4A-4C)">Coily / Tight Curls (Type 4A - 4C)</option>
                </select>
              </div>

              {/* Porosity */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                  2. Hair Porosity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Low', 'Medium', 'High'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPorosity(p)}
                      className={`py-2 px-2 text-xs rounded border text-center transition-all cursor-pointer ${
                        porosity.startsWith(p)
                          ? 'border-stone-900 bg-stone-900 text-white font-medium'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chemical History */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                  3. Previous Chemical History
                </label>
                <select
                  value={chemicalHistory}
                  onChange={e => setChemicalHistory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                >
                  <option value="Virgin / Natural (No chemical processing)">Virgin / Natural (No chemical processing)</option>
                  <option value="Highlighted / Balayage">Highlighted / Balayage</option>
                  <option value="Bleached Platinum / Global Lightener">Bleached Platinum / Global Lightener</option>
                  <option value="Single Process Permanent Tint">Single Process Permanent Tint</option>
                  <option value="Chemical Relaxer or Japanese Straightening">Chemical Relaxer or Japanese Straightening</option>
                </select>
              </div>

              {/* Maintenance Level */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                  4. Salon Maintenance Commitment
                </label>
                <select
                  value={maintenanceLevel}
                  onChange={e => setMaintenanceLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                >
                  <option value="Low (2-3 times per year, seamless grow-out)">Low (2-3 times/year, seamless grow-out)</option>
                  <option value="Medium (Every 8-10 weeks for gloss & dusting)">Medium (Every 8-10 weeks)</option>
                  <option value="High (Every 4-6 weeks for precision roots)">High (Every 4-6 weeks)</option>
                </select>
              </div>

              {/* Primary Goal */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                  5. Primary Hair Goal
                </label>
                <input
                  type="text"
                  value={primaryGoal}
                  onChange={e => setPrimaryGoal(e.target.value)}
                  placeholder="e.g. Lived-in honey blonde with curtain bangs"
                  className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                  Additional Notes (Wash frequency, scalp sensitivity)
                </label>
                <textarea
                  rows={2}
                  value={lifestyleNotes}
                  onChange={e => setLifestyleNotes(e.target.value)}
                  placeholder="e.g. Wash 2x weekly, prone to dry scalp in winter..."
                  className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-300" />
                    Generating Trichological Analysis...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-stone-300" />
                    Generate Atelier Prescription
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: AI Prescription Output */}
          <div className="lg:col-span-7">
            {errorMsg && (
              <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {result ? (
              <div className="bg-white p-8 rounded-xl border border-stone-200/90 shadow-2xs space-y-6 animate-in fade-in duration-300">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold block">
                      Recommended Experience
                    </span>
                    <h3 className="font-editorial text-2xl text-stone-900 font-semibold mt-0.5">
                      {result.curatedService}
                    </h3>
                  </div>

                  <button
                    onClick={() => onApplyPlanToBooking(result.curatedService)}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                  >
                    Reserve This Service <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Cutting Architecture & Technique Focus */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider block mb-1">
                      Styling Architecture &amp; Silhouette
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200/70">
                      {result.stylingArchitecture}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider block mb-1">
                      Technique &amp; Formulation Focus
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {result.techniqueFocus}
                    </p>
                  </div>
                </div>

                {/* At-Home Wash Day Protocol */}
                <div>
                  <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider block mb-2.5">
                    Prescribed At-Home Wash Day Protocol
                  </span>
                  <div className="space-y-2">
                    {result.atHomeRegimen.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ingredient Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                  <div className="bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-100">
                    <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wider block mb-2">
                      Key Ingredients to Seek
                    </span>
                    <ul className="space-y-1 text-xs text-emerald-800 list-disc list-inside">
                      {result.ingredientChecklist.recommended.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-rose-50/60 p-3.5 rounded-lg border border-rose-100">
                    <span className="text-xs font-semibold text-rose-900 uppercase tracking-wider block mb-2">
                      Ingredients / Habits to Avoid
                    </span>
                    <ul className="space-y-1 text-xs text-rose-800 list-disc list-inside">
                      {result.ingredientChecklist.avoid.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stylist Pro Tip */}
                <div className="pt-4 border-t border-stone-100 bg-stone-900 text-stone-100 p-4 rounded-lg flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold uppercase tracking-wider block text-amber-300 mb-0.5">
                      Master Stylist Pro-Tip
                    </span>
                    <p className="text-stone-300 leading-relaxed font-sans">{result.stylistProTip}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
                  <span>Maintenance Cadence: <strong className="text-stone-800">{result.maintenanceTimeline}</strong></span>
                  <button
                    onClick={() => onApplyPlanToBooking(result.curatedService)}
                    className="text-stone-900 font-semibold hover:underline"
                  >
                    Proceed to Booking →
                  </button>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[380px] bg-stone-50 rounded-xl border border-dashed border-stone-300 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center mb-4 text-stone-500 shadow-2xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-xl text-stone-800 font-medium">
                  Awaiting Your Hair Fiber Profile
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mt-1.5 leading-relaxed">
                  Complete the questionnaire on the left to receive a bespoke cutting blueprint, 
                  toner strategy, and clinical at-home routine.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
