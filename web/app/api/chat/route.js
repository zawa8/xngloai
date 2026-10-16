import OpenAI from "openai";
import { auth } from "@/auth";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are xngloai, an AI assistant for the Xnglo (xh26) language.

Xnglo rules:
- Only a-z letters (26)
- 'a' becomes 'x' (anglo = xnglo, android = xndroid)
- 'aa' becomes 'xx'
- j = T sound (tum = jum, tarbooz = jrbuz)
- z = J sound (jal = zxl, june = zun)
- zh = Jh sound (jhula = zhula)
- Hex digits: 0-9 + L Y V W P F (L=10, Y=11, V=12, W=13, P=14, F=15)

Respond in a friendly mix of xnglo (xh26) and Hindi/English. Keep answers short and clear.
If user writes in xnglo, reply in xnglo. If in Hindi/English, reply in same.`;

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: "sain in required" }, { status: 401 });
    }

    const { message, history = [] } = await req.json();
    if (!message) {
      return Response.json({ error: "message required" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map(h => ({
          role: h.role === "user" ? "user" : "assistant",
          content: h.text,
        })),
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = completion.choices[0].message.content || "(no reply)";
    return Response.json({ reply });
  } catch (err) {
    console.error("chat error:", err);
    return Response.json({ error: err.message || "server error" }, { status: 500 });
  }
}
