import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK if real API key is present
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey && !geminiApiKey.startsWith('MY_') && geminiApiKey.length > 10) {
  aiClient = new GoogleGenAI({ apiKey: geminiApiKey });
}

// 1. Virtual Hair Consultation Endpoint
app.post('/api/hair-consultation', async (req: Request, res: Response) => {
  try {
    const { hairType, porosity, chemicalHistory, maintenanceLevel, primaryGoal, lifestyleNotes } = req.body;

    if (!hairType) {
      return res.status(400).json({ error: 'Hair type is required' });
    }

    if (aiClient) {
      try {
        const prompt = `You are a world-renowned master hairstylist, color director, and trichology specialist at "Atelier Élan", a bespoke luxury hair salon.
A client has submitted their profile for a digital hair diagnostic:
- Hair Texture / Pattern: ${hairType}
- Hair Porosity: ${porosity || 'Medium'}
- Chemical / Color History: ${chemicalHistory || 'Virgin / Natural'}
- Maintenance Commitment: ${maintenanceLevel || 'Medium (every 8-10 weeks)'}
- Primary Hair Goal: ${primaryGoal || 'Lustrous health and flattering shape'}
- Lifestyle / Notes: ${lifestyleNotes || 'None'}

Please provide a structured, elegant consultation response in valid JSON with these exact keys:
{
  "curatedService": "Name of best Atelier Élan service (e.g., Sculptural Cut & Blowout, Dimensional Balayage & Glaze, Silk Press & Steam, or Curl Revival)",
  "techniqueFocus": "2-3 sentences explaining the exact cutting or coloring technique needed for their texture and density",
  "stylingArchitecture": "How this haircut/style frames face and enhances natural texture",
  "atHomeRegimen": [
    "Step 1: Cleansing & prep with specific recommendation",
    "Step 2: Deep conditioning or bond-building frequency",
    "Step 3: Leave-in moisture and thermal protection protocol",
    "Step 4: Nighttime preservation (e.g. silk scrunchie/wrap)"
  ],
  "ingredientChecklist": {
    "recommended": ["3-4 key ingredients to look for"],
    "avoid": ["2-3 ingredients or habits to avoid"]
  },
  "maintenanceTimeline": "Exact schedule for salon touch-ups and glosses",
  "stylistProTip": "One insider master-stylist secret for their specific hair type"
}
Output strictly valid JSON.`;

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI request timeout')), 6000)
        );

        const aiPromise = aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const response: any = await Promise.race([aiPromise, timeoutPromise]);
        const rawText = response.text || '';
        const parsed = JSON.parse(rawText);
        return res.json({ success: true, consultation: parsed, source: 'ai' });
      } catch (aiErr) {
        console.warn('Gemini consultation error or timeout, applying curated trichology fallback:', aiErr);
      }
    }

    // High quality intelligent fallback if API key is not present or parsing fails
    const fallbackConsultation = generateFallbackConsultation(hairType, porosity, primaryGoal, chemicalHistory);
    return res.json({ success: true, consultation: fallbackConsultation, source: 'curated' });
  } catch (error: any) {
    console.error('Error generating hair consultation:', error);
    const fallbackConsultation = generateFallbackConsultation(
      req.body.hairType || 'Wavy',
      req.body.porosity || 'Medium',
      req.body.primaryGoal || 'Health & Shine',
      req.body.chemicalHistory || 'None'
    );
    return res.json({ success: true, consultation: fallbackConsultation, source: 'curated-fallback' });
  }
});

// 2. Stylist Technical Formula Calculator Endpoint
app.post('/api/formula-assistant', async (req: Request, res: Response) => {
  try {
    const { startingLevel, targetLevel, underlyingPigment, desiredReflect, greyPercentage, hairCondition } = req.body;

    if (aiClient) {
      try {
        const prompt = `You are an elite salon color educator and formulation chemist.
A professional colorist is designing a custom salon hair color formula:
- Starting Natural Base Level: Level ${startingLevel || 5}
- Target Level: Level ${targetLevel || 7}
- Desired Reflect/Tone: ${desiredReflect || 'Neutral Sand Ash'}
- Underlying Warmth to neutralize or enhance: ${underlyingPigment || 'Warm Orange/Red'}
- Grey Hair Percentage: ${greyPercentage || '0%'}
- Hair Condition / Porosity: ${hairCondition || 'Normal to sensitized'}

Provide a professional, precise chemical formulation in valid JSON format:
{
  "formulaType": "e.g., Demi-Permanent Gloss / Permanent Lift / Foilayage & Toning",
  "baseMix": "Exact color line ratio (e.g. 40g 7.1 Ash Blonde + 10g 7.0 Natural + 50g 20 Volume Developer)",
  "tonerMix": "Glossing/toning glaze formula (e.g. 1:1 ratio with 5 Vol / Processing Solution for 15-20 min)",
  "developerVolume": "e.g., 20 Vol (6%) or 10 Vol (3%)",
  "timingMinutes": "Total processing time in minutes",
  "neutralizationNote": "Explanation of color wheel counterbalancing for raw underlying warmth",
  "bondBuilderRule": "K18 / Olaplex additive recommendation",
  "safetyPrecautions": "Strand test, porosity equalizer, or patch test notice"
}
Output strictly valid JSON.`;

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI request timeout')), 6000)
        );

        const aiPromise = aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.6,
          },
        });

        const response: any = await Promise.race([aiPromise, timeoutPromise]);
        const parsed = JSON.parse(response.text || '{}');
        return res.json({ success: true, formula: parsed });
      } catch (aiErr) {
        console.warn('Gemini formula error or timeout, applying curated chemical fallback:', aiErr);
      }
    }

    // Fallback formula calculation
    const fallbackFormula = {
      formulaType: (targetLevel > startingLevel) ? 'High-Lift Balayage & Glaze' : 'Deposit-Only Demi-Permanent',
      baseMix: `35g Level ${targetLevel}.1 (Cool Neutral) + 15g Level ${targetLevel}.0 (Natural) + 50g ${targetLevel > startingLevel ? '20 Volume (6%)' : '10 Volume (3%)'} Developer`,
      tonerMix: `Equal parts 9P + 9V Toner with dedicated 5 Vol liquid developer for 12 minutes on damp hair`,
      developerVolume: targetLevel > startingLevel ? '20 Vol (6%)' : '10 Vol (3%)',
      timingMinutes: '35 minutes ambient room temperature (no heat required)',
      neutralizationNote: `Targeting Level ${targetLevel} exposes residual yellow-orange melanin; violet-ash tone balances brass without muddying.`,
      bondBuilderRule: 'Incorporate 4ml bond-repair concentrate into lightener; apply peptide mist prior to toner.',
      safetyPrecautions: 'Verify client strand test if previous box dye or heavy metallic salts are suspected.'
    };
    return res.json({ success: true, formula: fallbackFormula });
  } catch (error) {
    console.error('Formula calculator error:', error);
    return res.status(500).json({ error: 'Failed to generate formula calculation' });
  }
});

function generateFallbackConsultation(hairType: string, porosity: string, goal: string, chemicalHistory: string) {
  const isCurlyCoily = hairType.toLowerCase().includes('curl') || hairType.toLowerCase().includes('coil') || hairType.includes('3') || hairType.includes('4');
  const isHighPorosity = porosity.toLowerCase().includes('high');

  return {
    curatedService: isCurlyCoily ? 'Curl Revival & Hydration Sculpt' : 'Sculptural Dry Cut & Luminous Glaze',
    techniqueFocus: isCurlyCoily
      ? 'Dry curl-by-curl architectural perimeter balancing, followed by a botanical hydration steam infusion to lock elasticity.'
      : 'Internal weight reduction with razor-sculpted face framing curtain layers and micro-dusting for split end preservation.',
    stylingArchitecture: `Tailored specifically for ${hairType} hair to maximize natural dimension, movement, and effortless bounce with minimal styling friction.`,
    atHomeRegimen: [
      `Step 1: Cleanse with gentle sulfate-free chelating wash once weekly; co-wash mid-week if ${hairType} is prone to dryness.`,
      `Step 2: Deep conditioning moisture bath with ceramides and hydrolysed rice protein every 10 days.`,
      'Step 3: Thermal guard leave-in milk up to 450°F before any heat styling or diffusing.',
      'Step 4: Sleep on 100% mulberry silk pillowcase or loose pineapple bun to prevent friction frizz.'
    ],
    ingredientChecklist: {
      recommended: ['Cold-pressed squalane', 'Hydrolysed wheat/rice peptides', 'Murumuru butter', 'Panthenol B5'],
      avoid: ['High-proof drying alcohols', 'Heavy build-up non-water-soluble silicones', 'Excessive mechanical tension without slip']
    },
    maintenanceTimeline: isCurlyCoily ? '8 to 12 weeks for shape maintenance' : '6 to 8 weeks for layer dusting & gloss refresh',
    stylistProTip: 'Always apply your leave-in conditioner while hair is soaking wet in the shower; water acts as the vehicle that locks moisture inside the cuticle.'
  };
}

// Development with Vite vs Production static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Atelier Élan Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
