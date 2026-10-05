export const metadata = {
  title: "xngloai - xnglo artificial intelligence",
  description: "xnglo (xh26) bhasha ka AI assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0a0a0a", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
