"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const newMsgs = [...messages, { role: "user", text }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMsgs, { role: "model", text: data.reply }]);
      } else {
        setMessages([...newMsgs, { role: "model", text: "error: " + (data.error || "unknown") }]);
      }
    } catch (e) {
      setMessages([...newMsgs, { role: "model", text: "error: " + e.message }]);
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") {
    return <main style={{ padding: "2rem" }}>loding...</main>;
  }

  if (!session) {
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>xngloai chat</h1>
        <p style={{ opacity: 0.7 }}>chat ke liye sain in karein</p>
        <Link href="/signin" style={{
          display: "inline-block", marginTop: "1rem", padding: "0.6rem 1.2rem",
          background: "#fff", color: "#000", borderRadius: "6px",
          textDecoration: "none", fontWeight: 600,
        }}>sain in</Link>
      </main>
    );
  }

  return (
    <main style={{
      padding: "1rem",
      maxWidth: "800px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 80px)",
      fontFamily: "inherit",
    }}>
      <h1 style={{ marginTop: 0 }}>xngloai chat</h1>

      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem",
        background: "#0f0f0f",
        border: "1px solid #222",
        borderRadius: "8px",
        marginBottom: "1rem",
        fontFamily: "inherit",
      }}>
        {messages.length === 0 && (
          <p style={{ opacity: 0.5, textAlign: "center", marginTop: "2rem" }}>
            nxmste {session.user.name}! kuch pucho...
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: m.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "75%",
              padding: "0.6rem 0.9rem",
              borderRadius: "10px",
              background: m.role === "user" ? "#3b82f6" : "#1a1a1a",
              whiteSpace: "pre-wrap",
              fontSize: "0.95rem",
              fontFamily: "inherit",
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ opacity: 0.5, fontStyle: "italic" }}>soch raha hu...</div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="kuch likho..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#111",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={send}
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            background: "#3b82f6",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            fontFamily: "inherit",
          }}
        >
          bhezo
        </button>
      </div>
    </main>
  );
}
