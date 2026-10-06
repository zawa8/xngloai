import fs from "fs";
import path from "path";

function loadGrammar() {
  const p = path.join(process.cwd(), "public", "data", "xnglo_grammar.json");
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

export default function GrammarPage() {
  const data = loadGrammar();
  const g = data.grammar;
  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>grammar / wyakrn</h1>
      <p style={{ opacity: 0.6 }}>bhasha ke niyam ({data.code})</p>
      {Object.entries(g).map(([key, section]) => (
        <section key={key} style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid #222", borderRadius: "8px" }}>
          <h2 style={{ marginTop: 0, color: "#7dd3fc" }}>{section.title}</h2>
          {section.rule && <p>{section.rule}</p>}
          {section.count && <p>kaunt: {section.count}</p>}
          {section.alphabet && <p style={{ fontFamily: "monospace" }}>{section.alphabet}</p>}
          {section.example && (
            <div style={{ background: "#111", padding: "1rem", borderRadius: "6px", marginTop: "0.5rem" }}>
              {Object.entries(section.example).map(([k, v]) => (
                <div key={k} style={{ marginBottom: "0.25rem" }}><strong>{k}:</strong> {v}</div>
              ))}
            </div>
          )}
          {section.list && (
            <ul style={{ marginTop: "0.5rem" }}>
              {Object.entries(section.list).map(([k, v]) => (
                <li key={k}><code>{k}</code> = {v}</li>
              ))}
            </ul>
          )}
          {section.rules && (
            <ul>
              {Object.entries(section.rules).map(([k, v]) => (
                <li key={k}><strong>{k}:</strong> {v}</li>
              ))}
            </ul>
          )}
          {section.types && !Array.isArray(section.types) && (
            <ul>
              {Object.entries(section.types).map(([k, v]) => (
                <li key={k}><strong>{k}:</strong> {v}</li>
              ))}
            </ul>
          )}
          {section.types && Array.isArray(section.types) && <p>{section.types.join(", ")}</p>}
        </section>
      ))}
    </main>
  );
}
