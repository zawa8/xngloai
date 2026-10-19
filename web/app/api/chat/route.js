import OpenAI from "openai";
import { auth } from "@/auth";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const BASE_RULES = `Xnglo (xh26) language rules:
- Only a-z letters (26)
- 'a' becomes 'x' (anglo = xnglo, android = xndroid)
- 'aa' becomes 'xx' (haan = hxx, pani = pxni)
- j = T sound (tum = jum, tarbooz = jrbuz)
- z = J sound (jal = zxl, june = zun)
- zh = Jh sound (jhula = zhula)
- Hex digits: 0-9 + L Y V W P F (L=10, Y=11, V=12, W=13, P=14, F=15)
- 'seb' = xplle (apple), 'jrbuz' = watermelon, 'hathi' = vajhi`;

const NATIVE_NAMES = {
  xh38: "Hindi (हिन्दी)",
  xb38: "Bengali (বাংলা)",
  xe38: "English",
  xg38: "Gujarati (ગુજરાતી)",
  xj38: "Telugu (తెలుగు)",
  xk38: "Kannada (ಕನ್ನಡ)",
  xm38: "Malayalam (മലയാളം)",
  xo38: "Odia (ଓଡ଼ିଆ)",
  xp38: "Punjabi (ਪੰਜਾਬੀ)",
  xs38: "Sinhala (සිංහල)",
  xt38: "Tamil (தமிழ்)",
};

function buildPrompt(lang) {
  const native = NATIVE_NAMES[lang] || NATIVE_NAMES.xh38;
  const isEnglish = lang === "xe38";

  if (isEnglish) {
    return `You are xngloai, an AI for Xnglo (xh26).

${BASE_RULES}

IMPORTANT:
- Reply in xnglo (xh26) + English ONLY.
- Never use Devanagari, Bengali, or any other Indic script.
- Format: "xnglo reply (English meaning)"
- Example: "seb = xplle (apple)"
- Keep answers SHORT (2-4 lines max).
- If user asks in xnglo, reply in xnglo.
- If in English, reply in xnglo + English.`;
  }

  return `You are xngloai, an AI for Xnglo (xh26).

${BASE_RULES}

IMPORTANT:
- Reply in xnglo (xh26) + ${native} + English ONLY.
- Format: "xnglo reply (${native} meaning / English meaning)"
- Example: "seb = xplle (सेब / apple)"
- Keep answers SHORT (2-4 lines max).
- If user asks in xnglo, reply in xnglo.
- Never add extra explanation. Just the answer in 3 languages.`;
}

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: "sain in required" }, { status: 401 });
    }

    const { message, history = [], lang = "xh38" } = await req.json();
    if (!message) {
      return Response.json({ error: "message required" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: buildPrompt(lang) },
        ...history.map(h => ({
          role: h.role === "user" ? "user" : "assistant",
          content: h.text,
        })),
        { role: "user", content: message },
      ],
      temperature: 0.5,
      max_tokens: 512,
    });

    const reply = completion.choices[0].message.content || "(no reply)";
    return Response.json({ reply });
  } catch (err) {
    console.error("chat error:", err);
    return Response.json({ error: err.message || "server error" }, { status: 500 });
  }
}
