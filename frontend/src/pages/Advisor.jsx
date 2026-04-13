import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, Sparkles, Trash2 } from "lucide-react";
import BlobBackground from "../components/BlobBackground";

export default function Advisor() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // ✅ Backend URL
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

  // Load saved chat
  useEffect(() => {
    const saved = localStorage.getItem("advisor_chat");
    if (saved) setChat(JSON.parse(saved));
  }, []);

  // Save chat
  useEffect(() => {
    localStorage.setItem("advisor_chat", JSON.stringify(chat));
  }, [chat]);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const quickPrompts = [
    "Explain why risk is high",
    "How can I reduce my risk score?",
    "Should the loan be approved?",
    "Detect fraud patterns from transactions",
    "Give 3 financial improvement tips",
  ];

  const sendMessage = async (text) => {
    const finalText = text || message;

    if (!finalText.trim() || loading) return;

    const userMsg = { role: "user", text: finalText };
    setChat((prev) => [...prev, userMsg]);

    setMessage("");
    setLoading(true);

    try {
      // ✅ Get report from localStorage
      const reportData = localStorage.getItem("latest_report");
      const parsedReport = reportData ? JSON.parse(reportData) : null;

      // ✅ Correct payload: backend expects "message"
      const res = await axios.post(`${BACKEND_URL}/chat`, {
        message: finalText,
        report: parsedReport,
      });

      const reply =
        res.data.reply || res.data.response || res.data.message || "No reply.";

      const botMsg = { role: "bot", text: reply };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        err?.message ||
        "Unknown backend error";

      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: `❌ Error: ${errorMessage}\n\n⚠️ Fix Steps:\n1) Ensure backend is running\n2) URL must be: ${BACKEND_URL}\n3) Ensure GEMINI_API_KEY exists in backend/.env\n4) Restart backend after adding .env`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("advisor_chat");
    setChat([]);
  };

  // Mascot mood
  const mascotMood = loading ? "thinking" : chat.length === 0 ? "idle" : "happy";

  return (
    <div style={styles.page}>
      <BlobBackground />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              🧠 AI Loan Advisor{" "}
              <span style={styles.badge}>
                <Sparkles size={14} /> Gemini AI
              </span>
            </h1>
            <p style={styles.subtitle}>
              Ask questions about risk score, fraud alerts, loan approval, and
              improvement tips.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={clearChat}
            style={styles.clearBtn}
          >
            <Trash2 size={18} /> Clear
          </motion.button>
        </div>

        {/* Mascot */}
        <motion.div
          style={styles.mascotWrap}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div style={styles.mascotCircle}>
            <div style={styles.mascotFace}>
              <div style={styles.eyesRow}>
                <div style={styles.eye}></div>
                <div style={styles.eye}></div>
              </div>

              <div
                style={{
                  ...styles.mouth,
                  width: mascotMood === "thinking" ? "18px" : "28px",
                  borderRadius:
                    mascotMood === "thinking" ? "8px" : "0px 0px 18px 18px",
                }}
              ></div>

              {mascotMood === "thinking" && (
                <div style={styles.thinkingDots}>
                  <span className="mascotDot">●</span>
                  <span className="mascotDot">●</span>
                  <span className="mascotDot">●</span>
                </div>
              )}
            </div>
          </div>

          <div style={styles.mascotLabel}>
            {mascotMood === "idle" && "Hi! Ask me about risk score 👋"}
            {mascotMood === "happy" && "I’m here to guide your loan decision ✅"}
            {mascotMood === "thinking" && "Analyzing your request... 🤔"}
          </div>
        </motion.div>

        {/* Quick Prompts */}
        <div style={styles.prompts}>
          {quickPrompts.map((p, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              style={styles.promptBtn}
              onClick={() => sendMessage(p)}
            >
              ⚡ {p}
            </motion.button>
          ))}
        </div>

        {/* Chat Box */}
        <div style={styles.chatBox}>
          {chat.length === 0 && (
            <div style={styles.emptyState}>
              <h2>👋 Welcome!</h2>
              <p>
                Upload a statement first in Analyzer, then ask AI for loan
                decision and fraud insights.
              </p>
            </div>
          )}

          {chat.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                ...styles.msgRow,
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.msgBubble,
                  background:
                    msg.role === "user"
                      ? "linear-gradient(to right, rgba(37,99,235,0.9), rgba(34,197,94,0.7))"
                      : "rgba(255,255,255,0.06)",
                  border:
                    msg.role === "user"
                      ? "1px solid rgba(255,255,255,0.12)"
                      : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={styles.msgMeta}>
                  <span>
                    {msg.role === "user" ? "👤 You" : "🤖 AI Advisor"}
                  </span>
                </div>

                <div style={styles.msgText}>{msg.text}</div>
              </div>
            </motion.div>
          ))}

          {/* Typing animation */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ ...styles.msgRow, justifyContent: "flex-start" }}
            >
              <div
                style={{
                  ...styles.msgBubble,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <div style={styles.msgMeta}>🤖 AI Advisor</div>
                <div style={styles.typing}>
                  <span className="dot">●</span>
                  <span className="dot">●</span>
                  <span className="dot">●</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input */}
        <div style={styles.inputWrap}>
          <input
            style={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask AI something..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              ...styles.sendBtn,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={() => sendMessage()}
            disabled={loading}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>

      {/* Typing + Mascot Animation CSS */}
      <style>
        {`
          .dot {
            font-size: 14px;
            margin-right: 4px;
            animation: blink 1.2s infinite;
          }

          .dot:nth-child(2) {
            animation-delay: 0.2s;
          }

          .dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes blink {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }

          .mascotDot {
            font-size: 10px;
            margin-right: 3px;
            animation: blink 1s infinite;
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "radial-gradient(circle at top, #0f172a, #05070d)",
    color: "white",
    position: "relative",
  },

  container: {
    maxWidth: "1000px",
    margin: "auto",
    position: "relative",
    zIndex: 2,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  title: {
    fontSize: "38px",
    margin: 0,
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    marginLeft: "10px",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#e5e7eb",
  },

  subtitle: {
    marginTop: "8px",
    color: "#9ca3af",
    fontSize: "14px",
  },

  clearBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    background: "rgba(239,68,68,0.2)",
    color: "#fecaca",
    fontWeight: "bold",
  },

  mascotWrap: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
  },

  mascotCircle: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    background:
      "linear-gradient(to right, rgba(37,99,235,0.8), rgba(34,197,94,0.7))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 35px rgba(34,197,94,0.25)",
    border: "2px solid rgba(255,255,255,0.12)",
  },

  mascotFace: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    position: "relative",
  },

  eyesRow: {
    display: "flex",
    gap: "12px",
  },

  eye: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "white",
    boxShadow: "0px 0px 10px rgba(255,255,255,0.6)",
  },

  mouth: {
    height: "10px",
    background: "white",
  },

  thinkingDots: {
    position: "absolute",
    bottom: "-18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#e5e7eb",
  },

  mascotLabel: {
    fontSize: "13px",
    color: "#cbd5e1",
    padding: "10px 14px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  prompts: {
    marginTop: "25px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },

  promptBtn: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "#e5e7eb",
    cursor: "pointer",
    fontSize: "13px",
  },

  chatBox: {
    marginTop: "20px",
    height: "520px",
    overflowY: "auto",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  emptyState: {
    textAlign: "center",
    marginTop: "140px",
    color: "#9ca3af",
  },

  msgRow: {
    display: "flex",
    marginBottom: "14px",
  },

  msgBubble: {
    maxWidth: "75%",
    padding: "14px",
    borderRadius: "16px",
    fontSize: "14px",
    lineHeight: "22px",
  },

  msgMeta: {
    fontSize: "12px",
    marginBottom: "6px",
    color: "#cbd5e1",
  },

  msgText: {
    whiteSpace: "pre-wrap",
  },

  typing: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#e5e7eb",
    fontSize: "14px",
  },

  inputWrap: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    outline: "none",
    fontSize: "14px",
  },

  sendBtn: {
    width: "55px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(to right, #2563eb, #22c55e)",
    color: "white",
  },
};