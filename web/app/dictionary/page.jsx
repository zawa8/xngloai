"use client";
import { useState, useEffect } from "react";
import { S } from "@/lib/strings";

export default function DictionaryPage() {
  const [dict, setDict] = useState(null);
  const [q, setQ] = useState("");
  useEffect(() => { fetch("/data/xnglo_dictionary.json").then(r => r.json()).then(setDict); }, []);
  if (!dict) return <main style={{ padding: "2rem" }}>{S.diks_loding}</main>;
  const words = Object.entries(dict.words || {});
  const filtered = q ? words.filter(([w, v]) =>
    w.toLowerCase().includes(q.toLowerCase()) ||
    (v.meaning && v.meaning.toLowerCase().includes(q.toLowerCase())) ||
    (v.hindi && v.hindi.includes(q))) : words;
  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>{S.diks_taitl}</h1>
      <p style={{ opacity: 0.6 }}>{S.diks_sbtaitl}: {words.length} | code: {dict.code}</p>
      <input type="text" placeholder={S.diks_sarch} value={q} onChange={e => setQ(e.target.value)}
        style={{ width: "100%", padding: "0.75rem", marginTop: "1rem", background: "#111", border: "1px solid #333", borderRadius: "6px", color: "#fff", fontSize: "1rem" }} />
      <div style={{ marginTop: "1.5rem", display: "grid", gap: "0.75rem" }}>
        {filtered.map(([w, v]) => (
          <div key={w} style={{ padding: "1rem", border: "1px solid #222", borderRadius: "6px", background: "#0f0f0f" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: "1.1rem", color: "#7dd3fc" }}>{w}</strong>
              <span style={{ fontSize: "0.8rem", opacity: 0.5, fontStyle: "italic" }}>{v.type}</span>
            </div>
            <div style={{ marginTop: "0.5rem", opacity: 0.8 }}>{v.emoji && <span style={{ marginRight: "0.5rem" }}>{v.emoji}</span>}{v.meaning}</div>
            <div style={{ opacity: 0.5, fontSize: "0.9rem" }}>{v.hindi}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
