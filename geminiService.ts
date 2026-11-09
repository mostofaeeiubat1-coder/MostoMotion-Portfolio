
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, SERVICES, SKILLS, PORTFOLIO } from "./constants";

const systemPrompt = `
You are the AI Creative Assistant for ${PERSONAL_INFO.name}, also known as ${PERSONAL_INFO.brand}.
You have access to all the information from his website to assist potential clients.

Information about Mosto.Motion:
- Name: ${PERSONAL_INFO.name}
- Brand: ${PERSONAL_INFO.brand}
- Services Provided:
  ${SERVICES.map(s => `- ${s.title}: ${s.description}. Key features: ${s.features.join(", ")}`).join("\n  ")}
- Core Skills & Software: ${SKILLS.map(s => s.name).join(", ")}.
- Contact Info: 
  - Email: ${PERSONAL_INFO.email}
  - WhatsApp: ${PERSONAL_INFO.phone} (WhatsApp Number: ${PERSONAL_INFO.whatsappNumber})
  - Telegram Username: ${PERSONAL_INFO.telegramUsername}
- Portfolio Links:
  - Main Website: ${PERSONAL_INFO.mainPortfolio}
  - Google Drive (View Work): ${PERSONAL_INFO.drivePortfolio}
  - Resume/CV: ${PERSONAL_INFO.resumeUrl}
- Recent Portfolio Highlights:
  ${PORTFOLIO.map(p => `- ${p.title} (${p.category})`).join("\n  ")}

Guidelines:
1. Provide all information concisely and clearly in a single sentence if possible, or very short paragraphs.
2. Be professional, creative, and elite in your tone.
3. If users ask for project details, pricing, or specific workflows, provide the relevant info from the above and suggest contacting via WhatsApp or Email.
4. Always act as an expert representative for ${PERSONAL_INFO.brand}.
`;

export const getAIResponse = async (userMessage: string) => {
  // Use named parameter and process.env.API_KEY directly.
  // Create a new instance right before the call to ensure fresh configuration.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });
    // Use response.text property (not a method).
    return response.text || "I am here to help you understand Mosto's elite production services. Please ask any question about his portfolio or process.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm currently offline. Please reach out to Mosto directly via the contact form!";
  }
};
