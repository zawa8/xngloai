"use client";
import { useState, useEffect } from "react";

export default function NumbersPage() {
  const [nums, setNums] = useState(null);
  const [months, setMonths] = useState(null);
  useEffect(() => {
    fetch("/data/xnglo_numbers.json").then(r => r.json()).then(setNums);
    fetch("/data/xnglo_months.json").then(r => r.json()).then(setMonths);
  }, []);
  if (!nums || !months) return <main style={{ padding: "2rem" }}>loding...</main>;
  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>numbers / sandkhya</h1>
      <p style={{ opacity: 0.6 }}>xnglo heks: {nums.hex_symbols}</p>
      <h2 style={{ marginTop: "2rem" }}>1-15 wrdz</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem" }}>
        {Object.entries(nums.words).map(([w, v]) => (
          <div key={w} style={{ padding: "1rem", border: "1px solid #222", borderRadius: "6px", background: "#0f0f0f" }}>
            <div style={{ fontSize: "1.5rem", color: "#7dd3fc" }}>{v.hex}</div>
            <div style={{ fontWeight: 600 }}>{w}</div>
            <div style={{ opacity: 0.6, fontSize: "0.85rem" }}>{v.hindi}</div>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: "2rem" }}>mxnth / mahine</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #333" }}>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>#</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>xnglo</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>iNgliS</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>kin (heks)</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>diz</th>
          </tr>
        </thead>
        <tbody>
          {months.months.map(m => (
            <tr key={m.num} style={{ borderBottom: "1px solid #1a1a1a" }}>
              <td style={{ padding: "0.5rem" }}>{m.num}</td>
              <td style={{ padding: "0.5rem", color: "#7dd3fc" }}>{m.xnglo}</td>
              <td style={{ padding: "0.5rem" }}>{m.english}</td>
              <td style={{ padding: "0.5rem", fontFamily: "monospace" }}>{m.qin}</td>
              <td style={{ padding: "0.5rem", opacity: 0.7 }}>{m.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
