export type HairType = 'Straight (1A-1C)' | 'Wavy (2A-2C)' | 'Curly (3A-3C)' | 'Coily / Tight Curls (4A-4C)';

export type Porosity = 'Low (Moisture resistant)' | 'Medium (Balanced)' | 'High (Porous / Chemically treated)';

export type MaintenanceLevel = 'Low (2-3 times/year)' | 'Medium (Every 8-10 weeks)' | 'High (Every 4-6 weeks)';

export interface Service {
  id: string;
  title: string;
  category: 'Cuts & Styling' | 'Balayage & Color' | 'Texture & Smoothing' | 'Treatment Rituals';
  description: string;
  durationMinutes: number;
  price: number;
  recommendedFor: string;
  includedRituals: string[];
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  avatar: string;
  availableDays: string[];
  instagram: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  image: string;
  stylistName: string;
  serviceId: string;
  hairType: string;
  maintenance: string;
  formulaNotes: string;
  description: string;
}

export interface AddOnOption {
  id: string;
  title: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  stylistId: string;
  stylistName: string;
  serviceId: string;
  serviceName: string;
  addOns: AddOnOption[];
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  totalAmount: number;
  status: 'Confirmed' | 'In Chair' | 'Processing' | 'Completed';
  notes?: string;
  createdAt: string;
}

export interface ClientFormula {
  id: string;
  clientName: string;
  clientPhone: string;
  hairProfile: string;
  naturalBase: number;
  targetLevel: number;
  formulaRecipe: string;
  tonerRecipe: string;
  patchTestDate: string;
  allergies: string;
  notes: string;
  lastVisit: string;
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  volume: string;
  price: number;
  description: string;
  keyIngredients: string[];
}

export interface AIConsultationResult {
  curatedService: string;
  techniqueFocus: string;
  stylingArchitecture: string;
  atHomeRegimen: string[];
  ingredientChecklist: {
    recommended: string[];
    avoid: string[];
  };
  maintenanceTimeline: string;
  stylistProTip: string;
}

export interface FormulaResult {
  formulaType: string;
  baseMix: string;
  tonerMix: string;
  developerVolume: string;
  timingMinutes: string;
  neutralizationNote: string;
  bondBuilderRule: string;
  safetyPrecautions: string;
}
