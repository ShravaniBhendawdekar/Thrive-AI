import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function POST(req) {
  const { input, type = "resume" } = await req.json();

  if (!input) {
    return new Response(JSON.stringify({ error: "Missing input" }), { status: 400 });
  }

  const prompt = `
    As an expert resume writer, improve the following ${type} description.
    Make it more impactful, quantifiable, and aligned with best industry standards.
    Current content: "${input}"

    Requirements:
    1. Start with strong action verbs
    2. Include measurable outcomes and results where possible
    3. Highlight relevant technical or domain-specific skills
    4. Keep it concise yet detailed
    5. Focus on achievements rather than daily tasks
    6. Use industry-relevant keywords and professional tone
    
    Format the output as a single polished paragraph. Do not add any extra explanation or commentary.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();

    return new Response(JSON.stringify({ result: improvedContent }), { status: 200 });
  } catch (error) {
    console.error("Error enhancing resume:", error);
    return new Response(JSON.stringify({ error: "Failed to enhance text" }), { status: 500 });
  }
}
