import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT = `Tu es un assistant spécialisé dans la PAC (Politique Agricole Commune) en France. Tu aides les agriculteurs à comprendre et remplir leurs formulaires PAC.

Ton rôle :
- Expliquer les termes techniques en langage simple et accessible
- Guider les agriculteurs dans leurs démarches PAC (déclaration de surfaces, éco-régime, aides couplées, ICHN, MAEC, conditionnalité...)
- Répondre aux questions sur les échéances, les règles, les aides disponibles
- Aider à comprendre les BCAE (Bonnes Conditions Agricoles et Environnementales)
- Expliquer les différences entre les voies d'accès à l'éco-régime
- Clarifier les conditions d'éligibilité aux différentes aides

Règles importantes :
- Réponds TOUJOURS en français
- Utilise un langage simple, pas de jargon administratif inutile
- Quand tu utilises un sigle (BCAE, ICHN, DPB...), explique-le à la première utilisation
- Sois concis mais complet. Les agriculteurs sont occupés.
- Si tu n'es pas sûr d'une information réglementaire, dis-le clairement et recommande de contacter la DDT/DDTM ou la chambre d'agriculture
- Rappelle que les règles peuvent varier selon les départements et les années
- Ne donne jamais de montants précis d'aides car ils changent chaque année, donne plutôt des ordres de grandeur
- Sois encourageant : la PAC est complexe mais les agriculteurs peuvent y arriver

Contexte campagne 2026 :
- Ouverture TelePAC : 1er avril 2026
- Date limite déclaration : 15 mai 2026
- Date limite avec pénalités : 9 juin 2026
- Versement avance : 16 octobre 2026
- L'éco-régime a 3 voies : pratiques, certification, infrastructures agro-écologiques
- Les BCAE 7 (rotation) et BCAE 8 (surfaces d'intérêt écologique) sont les plus impactantes`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Messages requis" },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return Response.json({ response: text });
  } catch (error: unknown) {
    console.error("Erreur API Chat:", error);
    const message =
      error instanceof Error ? error.message : "Erreur inconnue";
    return Response.json({ error: message }, { status: 500 });
  }
}
