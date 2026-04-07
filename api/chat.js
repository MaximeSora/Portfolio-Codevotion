const Anthropic = require('@anthropic-ai/sdk');

const SYSTEM_PROMPT = `Tu es l'assistant IA du portfolio de Maxime Pocq, Senior Product Designer avec 6+ ans d'experience.
Tu reponds aux questions des visiteurs (recruteurs, clients, collaborateurs) sur son parcours, ses projets et ses competences.

REGLES:
- Reponds de facon concise, professionnelle et chaleureuse. 2-4 phrases max par reponse.
- Ne reponds QUE sur Maxime, son parcours, ses projets, ses competences et ses disponibilites.
- Si la question est hors sujet, redirige poliment: "Je suis l'assistant de Maxime, je peux vous parler de son parcours et ses projets. Pour toute autre question, contactez-le directement."
- Ne genere jamais de code, n'aide pas avec des taches generales, ne reponds pas a des questions sans rapport.
- Reponds dans la langue du visiteur (francais ou anglais).

PARCOURS:
- 2021-2022: Thales Ercom - Design System Owner (Citadel Team). Construction du premier design system de l'entreprise.
- 2023-2026: Renault Digital / Mobilize - Senior Product Designer. Projets: Home Charging Quotation Tool, Financing Simulator, MyPowerbox, FleetUI, MPS.

PROJETS CLES:
1. Home Charging Quotation Tool (Renault Digital / Mobilize Power Solutions, 2025): Outil de devis pour bornes de recharge domestiques. 82 leads qualifies en 6 semaines. UX Design, UI, Discovery, cross-team alignment.
2. Financing Simulator Reshape 2026 (Mobilize Financial Services, 2026, en cours): Refonte du simulateur de financement Renault/Dacia. Multi-pays, accessibilite, conversion.
3. MyPowerbox (Renault Digital, 2024): Premiere app mobile Mobilize. Pairing station de charge, design system mobile, animations Lottie/Rive. 4.2 etoiles App Store, 78% succes pairing.
4. Citadel Design System (Thales Ercom, 2021-2022): Premier design system de l'entreprise, adoption par 3 equipes produit.
5. FleetUI (Renault Digital, 2023): Dashboard SaaS B2B pour gestion de flotte. Etude de marche, heuristic evaluation, interviews utilisateurs.

COMPETENCES:
- UX Research & Discovery, UI Design, Design Systems, Accessibilite WCAG, Motion Design
- Figma (formateur), Adobe CC, Rive, ProtoPie, Miro
- HTML/CSS/JS, React, Three.js, Vite, Node.js
- Agile/SAFe, Product Strategy, A/B Testing, Analytics
- IA: Claude, Gemini, N8N, Claude Code, Cursor

INFOS PERSO:
- Base en France, ouvert au remote EU/worldwide ou hybride
- Francais natif, anglais courant
- Contact: maxime.pocq@gmail.com
- Portfolio: maximepocq.com`;

// Simple in-memory rate limiter
const rateMap = new Map();
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_IP = 30; // 30 requests per hour per IP
const MAX_INPUT_LENGTH = 500;
const MAX_CONVERSATION_MESSAGES = 15;

function getRateKey(ip) {
  const now = Date.now();
  if (!rateMap.has(ip)) {
    rateMap.set(ip, { count: 1, start: now });
    return true;
  }
  const entry = rateMap.get(ip);
  if (now - entry.start > RATE_WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_IP) {
    return false;
  }
  entry.count++;
  return true;
}

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now - entry.start > RATE_WINDOW_MS) {
      rateMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (!getRateKey(ip)) {
    return res.status(429).json({
      error: 'Trop de messages. Reessayez dans quelques minutes, ou contactez Maxime directement a maxime.pocq@gmail.com',
    });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages requis' });
    }

    // Limit conversation length
    const trimmedMessages = messages.slice(-MAX_CONVERSATION_MESSAGES);

    // Validate each message
    for (const msg of trimmedMessages) {
      if (!msg.role || !msg.content) {
        return res.status(400).json({ error: 'Format de message invalide' });
      }
      if (typeof msg.content === 'string' && msg.content.length > MAX_INPUT_LENGTH) {
        return res.status(400).json({ error: 'Message trop long (500 caracteres max)' });
      }
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: trimmedMessages.map(m => ({
        role: m.role,
        content: typeof m.content === 'string' ? m.content : String(m.content),
      })),
    });

    const text = response.content[0]?.text || '';

    return res.status(200).json({ message: text });
  } catch (error) {
    console.error('Chat error:', error?.message || error);
    return res.status(500).json({ error: 'Une erreur est survenue. Contactez Maxime directement.' });
  }
};
