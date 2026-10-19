"use client";

import { useLanguage } from "@/lib/LanguageContext";
import languagesData from "@/data/xnglo_languages.json";

export default function SettingsPage() {
  const { lang, setLang } = useLanguage();

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>settings / setingz</h1>

      <section style={{
        marginTop: "2rem",
        padding: "1.5rem",
        border: "1px solid #222",
        borderRadius: "8px",
      }}>
        <h2 style={{ marginTop: 0, color: "#7dd3fc" }}>bhasha (language)</h2>
        <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>
          xpni bhasa cuno. xpi xi isi bhasa me jawab dega.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "0.75rem",
          marginTop: "1rem",
        }}>
          {languagesData.languages.map(l => {
            const active = lang === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={{
                  padding: "1rem",
                  borderRadius: "8px",
                  border: active ? "2px solid #7dd3fc" : "1px solid #222",
                  background: active ? "#0d1a20" : "#0f0f0f",
                  color: "#fff",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: `var(--${l.font}font), system-ui, sans-serif`,
                }}
              >
                <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  {l.native}
                </div>
                <div style={{ opacity: 0.6, fontSize: "0.85rem", marginTop: "0.25rem", fontFamily: "system-ui" }}>
                  {l.code} / {l.name}
                </div>
                {active && (
                  <div style={{ color: "#7dd3fc", fontSize: "0.8rem", marginTop: "0.5rem", fontFamily: "system-ui" }}>
                    ✓ selekted
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
