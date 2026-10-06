import Link from "next/link";

export default function Home() {
  const kardz = [
    { href: "/grammar",    taitl: "grammar",    disk: "wyakrn - bhasha ke niyam" },
    { href: "/dictionary", taitl: "dictionary", disk: "diksneri - shabd aur matlab" },
    { href: "/numbers",    taitl: "numbers",    disk: "sandkhya - heks sistm" },
    { href: "/phonemes",   taitl: "phonemes",   disk: "swr aur wynzn chart" },
  ];

  return (
    <main style={{ padding: "3rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "3rem", margin: 0 }}>xngloai</h1>
      <p style={{ opacity: 0.7, marginTop: "0.5rem" }}>
        xnglo artifisiyl intelizens - xh26 bhasha
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem", marginTop: "3rem"
      }}>
        {kardz.map(c => (
          <Link key={c.href} href={c.href} style={{
            display: "block", padding: "1.5rem", border: "1px solid #222",
            borderRadius: "8px", textDecoration: "none", color: "#fff"
          }}>
            <h3 style={{ margin: 0, fontSize: "1.3rem" }}>{c.taitl}</h3>
            <p style={{ margin: "0.5rem 0 0", opacity: 0.6, fontSize: "0.9rem" }}>{c.disk}</p>
          </Link>
        ))}
      </div>

      <p style={{ opacity: 0.4, marginTop: "3rem", fontSize: "0.85rem" }}>
        kuming sun: gugl lxgin + xi chat
      </p>
    </main>
  );
}
