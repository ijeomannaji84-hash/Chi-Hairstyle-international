import { Service, Stylist, LookbookItem, AddOnOption, ClientFormula, ProductItem, Appointment } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_hair_studio_1793520590471.jpg';

export const STYLISTS: Stylist[] = [
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    title: 'Creative Director & Blonding Specialist',
    bio: '12 years crafting bespoke dimensional color in Paris and New York. Known for lived-in balayage, gentle root smudges, and high-impact low-maintenance blonding.',
    specialties: ['Dimensional Balayage', 'Corrective Blonding', 'Curtain Bangs & Face Framing'],
    avatar: '/src/assets/images/lookbook_blonding_sculpt_1793520592229.jpg',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    instagram: '@elenavance.hair'
  },
  {
    id: 'marcus-rivera',
    name: 'Marcus Rivera',
    title: 'Master Hair Sculptor & Silk Press Authority',
    bio: 'Precision dry cutter and master of thermal styling. Trained at Vidal Sassoon, Marcus specializes in ultra-sleek glass hair finishes and architectural geometric bobs.',
    specialties: ['Glass Silk Press', 'Precision Blunt Bobs', 'Keratin Smoothing'],
    avatar: '/src/assets/images/lookbook_silk_press_cut_1793520592111.jpg',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    instagram: '@marcus.rivera.cuts'
  },
  {
    id: 'maya-lin',
    name: 'Maya Lin',
    title: 'Texture Architect & Curl Specialist',
    bio: 'Dedicated to embracing natural coil patterns and wave structures. Deva & Rezo certified, Maya blends moisture steam therapy with curl-by-curl dimensional shaping.',
    specialties: ['Curl Revival Cut', 'Hydration Steam Baths', 'Dimensional Pintura Highlights'],
    avatar: '/src/assets/images/lookbook_textured_curls_1793520592511.jpg',
    availableDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    instagram: '@mayalin.curls'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'sculptural-cut',
    title: 'Sculptural Precision Cut & Blowout',
    category: 'Cuts & Styling',
    description: 'Bespoke wet-to-dry architectural haircut customized to your head shape and natural growth patterns. Includes botanical wash ritual and editorial blowout finish.',
    durationMinutes: 60,
    price: 130,
    recommendedFor: 'All hair textures needing shape definition, movement, and face-framing dimension.',
    includedRituals: ['Consultation & scalp analysis', 'Custom essential oil wash', 'Precision scissor/razor cut', 'Velvet blowdry & style']
  },
  {
    id: 'dimensional-balayage',
    title: 'Dimensional Balayage & Glaze',
    category: 'Balayage & Color',
    description: 'Hand-painted freehand ribbons of light paired with a customized shadow root and high-gloss toner. Delivers seamless grow-out and luminous depth.',
    durationMinutes: 180,
    price: 310,
    recommendedFor: 'Clients seeking soft, sun-kissed dimension with zero harsh demarcation lines.',
    includedRituals: ['Bond-protecting additive', 'Custom demi-permanent gloss', 'Scalp massage & hot towel ritual', 'Polished wave styling']
  },
  {
    id: 'glass-silk-press',
    title: 'Glass Hair Silk Press & Steam Infusion',
    category: 'Texture & Smoothing',
    description: 'Non-chemical thermal smoothing designed for textured and curly hair. Begins with a clarifying detox, deep ceramic steam bath, and precision tension wrap.',
    durationMinutes: 90,
    price: 165,
    recommendedFor: 'Type 3 & 4 curls desiring mirror-like shine, high movement, and zero thermal damage.',
    includedRituals: ['Scalp purifying scrub', 'Nutrient-rich steam bath', 'Heat defense shield', 'Precision silk press with titanium iron']
  },
  {
    id: 'curl-revival-cut',
    title: 'Curl Revival & Hydration Sculpt',
    category: 'Texture & Smoothing',
    description: 'Dry curl-by-curl sculptural shaping respecting your natural shrinkage and volume. Followed by a luxury botanical moisture bath and custom diffuser set.',
    durationMinutes: 90,
    price: 160,
    recommendedFor: 'Waves, curls, and coils wanting defined spring, eliminated weight bulk, and lasting bounce.',
    includedRituals: ['Dry structural curl cut', 'Botanical moisture wash', 'Clump defining gel application', 'Low-temp hooded/diffuser set']
  },
  {
    id: 'platinum-transformation',
    title: 'Platinum Transformation & Molecular Repair',
    category: 'Balayage & Color',
    description: 'Full-head scalp-to-ends lightening or transformative corrective foilayage. Formulated with clinical bond-builders and double-process icy or beige toning.',
    durationMinutes: 240,
    price: 390,
    recommendedFor: 'Significant color changes, maximum brightness, or brass color correction.',
    includedRituals: ['Complete K18 molecular repair system', 'Double toner glaze', 'Scalp soothing aloe mist', 'Luxury finish styling']
  },
  {
    id: 'gloss-scalp-ritual',
    title: 'High-Gloss Toner & Scalp Detox Ritual',
    category: 'Treatment Rituals',
    description: 'Express refresh between major color sessions. Neutralizes brassy undertones, seals hair cuticles, and unclogs follicles with a purifying botanical head spa.',
    durationMinutes: 60,
    price: 115,
    recommendedFor: 'Existing color maintenance at 6-8 weeks, or anyone lacking mirror shine.',
    includedRituals: ['Scalp exfoliating peel', 'Acidic demi-permanent gloss', 'Aromatherapeutic head massage', 'Quick luxury blowout']
  }
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: 'k18-repair',
    title: 'K18 Molecular Peptide Repair Mist',
    price: 45,
    durationMinutes: 15,
    description: 'Patented bioactive peptide that reconnects broken keratin chains at the core.'
  },
  {
    id: 'scalp-exfoliation',
    title: 'Japanese Head Spa Scalp Exfoliation',
    price: 35,
    durationMinutes: 15,
    description: 'Purifying scrub with tea tree and salicylic acid to remove product build-up.'
  },
  {
    id: 'custom-glaze-booster',
    title: 'Clear Acidic Glaze Shine Booster',
    price: 50,
    durationMinutes: 20,
    description: 'Locks in 4-6 weeks of glass-like light reflection without altering base shade.'
  },
  {
    id: 'fringe-bang-cut',
    title: 'Fringe & Curtain Bang Architecture',
    price: 25,
    durationMinutes: 15,
    description: 'Specialized cheekbone-grazing curtain bangs or micro-bang precision trim.'
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'lb-1',
    title: 'Dimensional Caramel Mocha Balayage',
    category: 'Balayage & Color',
    image: '/src/assets/images/lookbook_balayage_brunette_1793520590616.jpg',
    stylistName: 'Elena Vance',
    serviceId: 'dimensional-balayage',
    hairType: 'Wavy / Type 2B',
    maintenance: '12–14 weeks',
    formulaNotes: 'Base Level 4. Lightened to Level 8 with clay balayage. Glazed with 08GI + 08WG equal parts.',
    description: 'Soft hand-painted ribbons focusing on mid-lengths and face frame. Designed for natural dark brunettes who want golden warmth without brass.'
  },
  {
    id: 'lb-2',
    title: 'Mirror Glass Silk Press & Blunt Bob',
    category: 'Texture & Smoothing',
    image: '/src/assets/images/lookbook_silk_press_cut_1793520592111.jpg',
    stylistName: 'Marcus Rivera',
    serviceId: 'glass-silk-press',
    hairType: 'Coily / Type 4A-4B',
    maintenance: '3–4 weeks',
    formulaNotes: 'Deep moisture steam infusion with marula oil; one-pass ceramic thermal smoothing at 405°F.',
    description: 'Ultra-reflective glass hair finish with zero chemical relaxers. Precision scissor cut right at the collarbone creates an effortlessly chic perimeter.'
  },
  {
    id: 'lb-3',
    title: 'Voluminous Amber Hydration Curl Revival',
    category: 'Texture & Smoothing',
    image: '/src/assets/images/lookbook_textured_curls_1793520592511.jpg',
    stylistName: 'Maya Lin',
    serviceId: 'curl-revival-cut',
    hairType: 'Curly / Type 3B-3C',
    maintenance: '10–12 weeks',
    formulaNotes: 'Dry architectural curl sculpting; Pintura freehand highlights toned with 09AA + clear gloss.',
    description: 'Layered spherical silhouette allowing coils to stack with maximum spring and weightless movement, highlighted with subtle honey reflections.'
  },
  {
    id: 'lb-4',
    title: 'Scandinavian Cream Blonde & Curtain Bangs',
    category: 'Balayage & Color',
    image: '/src/assets/images/lookbook_blonding_sculpt_1793520592229.jpg',
    stylistName: 'Elena Vance',
    serviceId: 'platinum-transformation',
    hairType: 'Straight to Soft Wave / Type 1C-2A',
    maintenance: '8–10 weeks',
    formulaNotes: 'Micro-foiling with 20 Vol; root shadow 8N demi-permanent; all-over glaze 10VV + 10GI.',
    description: 'Seamless butter-cream tones blended into a gentle root smudge. Cheekbone-length curtain bangs frame the face and transition softly into textured waves.'
  }
];

export const INITIAL_CLIENT_FORMULAS: ClientFormula[] = [
  {
    id: 'form-1',
    clientName: 'Sophia Laurent',
    clientPhone: '(555) 349-1022',
    hairProfile: 'Fine density, low porosity, natural base 6',
    naturalBase: 6,
    targetLevel: 8,
    formulaRecipe: 'Redken Shades EQ: 30g 08N + 15g 08GI + 45g Processing Solution. Foils: Blondor + 20vol + 4ml K18.',
    tonerRecipe: '09V + 09GI (2:1) on damp hair for 12 minutes.',
    patchTestDate: '2026-08-14',
    allergies: 'None recorded. Sensitive scalp to high-vol on-scalp bleach.',
    notes: 'Client prefers warm beige tones, strictly avoids ash-gray cast. Loves curtain bangs at lip level.',
    lastVisit: '2026-10-18'
  },
  {
    id: 'form-2',
    clientName: 'Nia Adeleke',
    clientPhone: '(555) 781-9034',
    hairProfile: 'Thick density, Type 4A coily, medium porosity',
    naturalBase: 2,
    targetLevel: 2,
    formulaRecipe: 'Deep botanical steam with Baobab & Keratin mist. No chemical lift.',
    tonerRecipe: 'Clear acidic gloss for 20 min under mild heat to seal cuticle.',
    patchTestDate: '2026-09-02',
    allergies: 'Fragrance sensitivity (use unscented sulfate-free shampoo).',
    notes: 'Always use 410°F maximum on titanium plates. Client loves sharp blunt perimeter.',
    lastVisit: '2026-10-24'
  },
  {
    id: 'form-3',
    clientName: 'Camilla Ward',
    clientPhone: '(555) 492-8811',
    hairProfile: 'Medium density, Type 3A curly, high porosity',
    naturalBase: 5,
    targetLevel: 7,
    formulaRecipe: 'Freehand Pintura highlights: 30g Clay Lightener + 30vol. Olaplex No. 1 added.',
    tonerRecipe: '07NB + 08WG equal parts demi-glaze for 15 min.',
    patchTestDate: '2026-07-11',
    allergies: 'None',
    notes: 'Do not use razor on ends to prevent frizz. Dry cut only.',
    lastVisit: '2026-09-29'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1092',
    clientName: 'Clara Mercer',
    clientEmail: 'clara.mercer@example.com',
    clientPhone: '(555) 831-2940',
    stylistId: 'elena-vance',
    stylistName: 'Elena Vance',
    serviceId: 'dimensional-balayage',
    serviceName: 'Dimensional Balayage & Glaze',
    addOns: [ADD_ONS[0]], // K18
    date: '2026-11-01',
    time: '10:00 AM',
    totalAmount: 355,
    status: 'In Chair',
    notes: 'Focus ribbons around hairline; client has wedding in 3 weeks.',
    createdAt: '2026-10-28'
  },
  {
    id: 'APT-1093',
    clientName: 'Imani Davis',
    clientEmail: 'imani.d@example.com',
    clientPhone: '(555) 912-4029',
    stylistId: 'marcus-rivera',
    stylistName: 'Marcus Rivera',
    serviceId: 'glass-silk-press',
    serviceName: 'Glass Hair Silk Press & Steam Infusion',
    addOns: [ADD_ONS[1]], // Scalp Exfoliation
    date: '2026-11-01',
    time: '11:30 AM',
    totalAmount: 200,
    status: 'Processing',
    notes: 'Steam bath in progress; sensitive to hot water.',
    createdAt: '2026-10-29'
  },
  {
    id: 'APT-1094',
    clientName: 'Julianne Scott',
    clientEmail: 'julianne.s@example.com',
    clientPhone: '(555) 441-6099',
    stylistId: 'maya-lin',
    stylistName: 'Maya Lin',
    serviceId: 'curl-revival-cut',
    serviceName: 'Curl Revival & Hydration Sculpt',
    addOns: [ADD_ONS[2]], // Clear Glaze
    date: '2026-11-01',
    time: '02:00 PM',
    totalAmount: 210,
    status: 'Confirmed',
    notes: 'First time client, dry cut first.',
    createdAt: '2026-10-30'
  },
  {
    id: 'APT-1095',
    clientName: 'Zoe Kensington',
    clientEmail: 'zoe.k@example.com',
    clientPhone: '(555) 602-1823',
    stylistId: 'elena-vance',
    stylistName: 'Elena Vance',
    serviceId: 'sculptural-cut',
    serviceName: 'Sculptural Precision Cut & Blowout',
    addOns: [],
    date: '2026-11-01',
    time: '04:30 PM',
    totalAmount: 130,
    status: 'Confirmed',
    notes: 'Trimming curtain bangs and softening weight.',
    createdAt: '2026-10-31'
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Molecular Peptide Bond Mask',
    brand: 'Atelier Élan Lab',
    category: 'Treatment',
    volume: '50ml / 1.7 oz',
    price: 75,
    description: 'Leave-in clinical peptide formula reverses bleach, color, and heat damage in 4 minutes.',
    keyIngredients: ['Bioactive Decapeptide', 'Hydrolyzed Wheat Protein', 'Succinic Acid']
  },
  {
    id: 'prod-2',
    name: 'Liquid Glass Heat Shield & Finishing Nectar',
    brand: 'Atelier Élan Lab',
    category: 'Styling',
    volume: '100ml / 3.4 oz',
    price: 48,
    description: 'Weightless thermal defense up to 450°F that repels ambient humidity for 72 hours.',
    keyIngredients: ['Cold-Pressed Camellia Oil', 'Squalane', 'Rosehip Seed Extract']
  },
  {
    id: 'prod-3',
    name: 'Botanical Curl Hydration Crème',
    brand: 'Atelier Élan Lab',
    category: 'Curl & Texture',
    volume: '200ml / 6.8 oz',
    price: 52,
    description: 'Defines curl clump pattern and seals in water molecules with touchable zero-crunch hold.',
    keyIngredients: ['Murumuru Butter', 'Aloe Vera Leaf Juice', 'Marshmallow Root']
  },
  {
    id: 'prod-4',
    name: 'Exfoliating Scalp Clarifying Elixir',
    brand: 'Atelier Élan Lab',
    category: 'Scalp Care',
    volume: '120ml / 4.0 oz',
    price: 42,
    description: 'Pre-wash AHA/BHA tonic that dissolves sebum buildup and restores scalp microbiome.',
    keyIngredients: ['2% Salicylic Acid', 'Glycolic Acid', 'Japanese Green Tea Extract']
  }
];
