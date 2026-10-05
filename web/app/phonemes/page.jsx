import fs from "fs";
import path from "path";
import { S } from "@/lib/strings";

function loadPhonemes() {
  const p = path.join(process.cwd(), "public", "data", "xnglo_phonemes.json");
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

export default function PhonemesPage() {
  const data = loadPhonemes();
  const syl = data.syllables;
  return (
    <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1>{S.fon_taitl}</h1>
      <p style={{ opacity: 0.6 }}>{Object.keys(syl).length} {S.fon_sbtaitl}</p>
      <div style={{ overflowX: "auto", marginTop: "1.5rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "monospace" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #333" }}>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>base</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>x</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>a</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>e</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>i</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>u</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>o</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>h</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(syl).map(([base, arr]) => (
              <tr key={base} style={{ borderBottom: "1px solid #1a1a1a" }}>
                <td style={{ padding: "0.5rem", color: "#7dd3fc", fontWeight: 700 }}>{base}</td>
                {arr.map((s, i) => <td key={i} style={{ padding: "0.5rem" }}>{s}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.examples && (
        <section style={{ marginTop: "2rem" }}>
          <h2>{S.fon_xampl}</h2>
          <ul>
            {Object.entries(data.examples).map(([k, v]) => (
              <li key={k}><code>{k}</code> = {v}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
