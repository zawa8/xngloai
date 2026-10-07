import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import {
  xh38ascfont, xb38ascfont, xe38ascfont, xg38ascfont, xj38ascfont,
  xk38ascfont, xm38ascfont, xo38ascfont, xp38ascfont, xs38ascfont, xt38ascfont,
} from "@/components/hsciifp/varfonts";
import LocalFontPicker from "@/components/hsciifp/LocalFontPicker";
import MicButton from "@/components/hsciifp/MicButton";
import BekBatan from "@/components/BekBatan";
import AuthButton from "@/components/AuthButton";

export const metadata = {
  title: "xngloai - xnglo artifisiyl intelizens",
  description: "xh26 bhasha ka AI assistant",
};

export default function RootLayout({ children }) {
  const allVars = [
    xh38ascfont.variable, xb38ascfont.variable, xe38ascfont.variable,
    xg38ascfont.variable, xj38ascfont.variable, xk38ascfont.variable,
    xm38ascfont.variable, xo38ascfont.variable, xp38ascfont.variable,
    xs38ascfont.variable, xt38ascfont.variable,
  ].join(" ");

  return (
    <html lang="en" className={allVars}>
      <body style={{
        margin: 0, fontFamily: "var(--xh38ascfont), system-ui, sans-serif",
        background: "#0a0a0a", color: "#fff", minHeight: "100vh"
      }}>
        <SessionProvider>
          <nav style={{
            display: "flex", gap: "1rem", padding: "1rem 2rem",
            borderBottom: "1px solid #222", alignItems: "center", flexWrap: "wrap"
          }}>
            <BekBatan />
            <Link href="/" style={{ color: "#fff", fontWeight: 700, fontSize: "1.2rem", textDecoration: "none" }}>
              xngloai
            </Link>
            <Link href="/grammar"    style={{ color: "#aaa", textDecoration: "none" }}>grammar</Link>
            <Link href="/dictionary" style={{ color: "#aaa", textDecoration: "none" }}>dictionary</Link>
            <Link href="/numbers"    style={{ color: "#aaa", textDecoration: "none" }}>numbers</Link>
            <Link href="/phonemes"   style={{ color: "#aaa", textDecoration: "none" }}>phonemes</Link>

            <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <LocalFontPicker />
              <MicButton />
              <AuthButton />
            </div>
          </nav>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
