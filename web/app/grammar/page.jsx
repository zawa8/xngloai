import fs from "fs";
import path from "path";

function loadJson(fn) {
  const p = path.join(process.cwd(), "public", "data", fn);
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

export default function GrammarPage() {
  const data = loadJson("xnglo_grammar.json");
  const karak = loadJson("xnglo_karak.json");
  const g = data.grammar;

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>grammar / wyakrn</h1>
      <p style={{ opacity: 0.6 }}>bhasha ke niyam ({data.code})</p>

      {/* karxk eksampl pehle */}
      <section style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid #7dd3fc", borderRadius: "8px", background: "#0d1a20" }}>
        <h2 style={{ marginTop: 0, color: "#7dd3fc" }}>karxk eksampl</h2>
        <p style={{ opacity: 0.7 }}>8 karxk - vakya mẽ kaise pehchane</p>

        {karak.eksampl.map(e => (
          <div key={e.id} style={{ marginTop: "1.5rem", padding: "1rem", background: "#111", borderRadius: "6px" }}>
            <div style={{ color: "#7dd3fc", fontWeight: 700, marginBottom: "0.5rem" }}>
              {e.id}. {e.xnglo}
            </div>
            {e.hindi && <div style={{ opacity: 0.6, fontSize: "0.9rem", marginBottom: "0.5rem" }}>hindi: {e.hindi}</div>}
            <div style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              <strong>kriya:</strong> {e.kriya} | <strong>prakar:</strong> {e.prakar}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #333" }}>
                  <th style={{ textAlign: "left", padding: "0.3rem" }}>shbdx</th>
                  <th style={{ textAlign: "left", padding: "0.3rem" }}>karxk</th>
                  <th style={{ textAlign: "left", padding: "0.3rem" }}>kuest</th>
                </tr>
              </thead>
              <tbody>
                {e.karxk.map((k, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ padding: "0.3rem" }}>{k.k}</td>
                    <td style={{ padding: "0.3rem", color: "#7dd3fc" }}>{k.karxk}</td>
                    <td style={{ padding: "0.3rem", opacity: 0.7 }}>{k.kuest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#111", borderRadius: "6px" }}>
          <strong style={{ color: "#7dd3fc" }}>kriya prakar:</strong>
          <ul style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
            <li><strong>skxrmk:</strong> krja != krm (ram ne pjr likha)</li>
            <li><strong>xkxrmk:</strong> krja = krm (xam gira)</li>
          </ul>
        </div>
      </section>

      {/* baaki grammar sections */}
      {Object.entries(g).map(([key, section]) => (
        <section key={key} style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid #222", borderRadius: "8px" }}>
          <h2 style={{ marginTop: 0, color: "#7dd3fc" }}>{section.title}</h2>
          {section.rule && <p>{section.rule}</p>}
          {section.niym && <p>{section.niym}</p>}
          {section.count && <p>kaunt: {section.count}</p>}
          {section.alphabet && <p style={{ fontFamily: "monospace" }}>{section.alphabet}</p>}

          {section.prakar && (
            <ul>
              {Object.entries(section.prakar).map(([k, v]) => (
                <li key={k}><code>{k}</code> = {v}</li>
              ))}
            </ul>
          )}

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

          {section.udahran && (
            <div style={{ background: "#111", padding: "1rem", borderRadius: "6px" }}>
              {Object.entries(section.udahran).map(([k, v]) => (
                <div key={k}><strong>{k}:</strong> {v}</div>
              ))}
            </div>
          )}

          {section.kriya_prakar && (
            <ul>
              {Object.entries(section.kriya_prakar).map(([k, v]) => (
                <li key={k}><strong>{k}:</strong> {v}</li>
              ))}
            </ul>
          )}

          {section.xur_niym && (
            <ul style={{ marginTop: "0.5rem" }}>
              {section.xur_niym.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
}
