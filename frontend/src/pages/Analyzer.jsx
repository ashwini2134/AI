import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  FileText,
  ShieldCheck,
  BarChart3,
  Bot,
  Sparkles,
} from "lucide-react";

import BlobBackground from "../components/BlobBackground";
import AnalyzerMascot from "../components/AnalyzerMascot";

/* ---------------------- Floating Icons ---------------------- */
function FloatingIcons({ risk }) {
  const color = risk === "HIGH RISK" ? "#ef4444" : "#22c55e";

  return (
    <>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "18px",
          right: "25px",
          fontSize: "22px",
          color: color,
        }}
      >
        {risk === "HIGH RISK" ? "⚠️" : "✅"}
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.6, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: "22px",
          left: "30px",
          fontSize: "20px",
          color: color,
        }}
      >
        📊
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "60%",
          right: "50px",
          fontSize: "18px",
          color: color,
        }}
      >
        💰
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "35%",
          left: "20px",
          fontSize: "18px",
          color: color,
        }}
      >
        🤖
      </motion.div>
    </>
  );
}

/* ---------------------- Result Mascot ---------------------- */
function ResultMascot({ risk }) {
  const glow =
    risk === "HIGH RISK"
      ? "0 0 45px rgba(239,68,68,0.45)"
      : "0 0 45px rgba(34,197,94,0.45)";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "absolute",
        left: "-70px",
        top: "50px",
        padding: "14px",
        borderRadius: "22px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: glow,
      }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{ fontSize: "50px" }}
      >
        {risk === "HIGH RISK" ? "🤖⚠️" : "🤖✨"}
      </motion.div>
    </motion.div>
  );
}

/* ---------------------- Main Component ---------------------- */
export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setReport(null);
    }
  };

  const runAnalysis = async () => {
    if (!file) {
      alert("Please select a bank statement file first!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.log(err);
      alert("Backend error. Please ensure backend is running!");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <BlobBackground />

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          AI Statement <span style={styles.gradient}>Analyzer</span>
        </h1>
        <p style={styles.subTitle}>
          Upload a bank statement and let AI detect credit risk, fraud flags,
          spending patterns, and generate a professional report instantly.
        </p>
      </div>

      {/* Main Layout */}
      <div style={styles.mainGrid}>
        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.uploadCard}
        >
          <div style={styles.cardHeader}>
            <UploadCloud size={28} />
            <h2 style={styles.cardTitle}>Upload Bank Statement</h2>
          </div>

          <p style={styles.uploadInfo}>
            Supported: <b>CSV</b>, <b>PDF</b> (Max 10MB)
          </p>

          {/* Upload Box */}
          <label style={styles.uploadBox}>
            <input
              type="file"
              accept=".csv,.pdf"
              onChange={handleUpload}
              style={{ display: "none" }}
            />

            <div style={styles.uploadIconWrap}>
              <FileText size={34} />
            </div>

            <p style={styles.uploadText}>
              {file ? (
                <>
                  ✅ Selected File:{" "}
                  <span style={styles.fileName}>{file.name}</span>
                </>
              ) : (
                <>
                  Drag & Drop file here or{" "}
                  <span style={{ color: "#22c55e", fontWeight: "bold" }}>
                    Browse
                  </span>
                </>
              )}
            </p>
          </label>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.analyzeBtn}
            onClick={runAnalysis}
            disabled={loading}
          >
            {loading ? "⏳ Running AI Analysis..." : "🚀 Run AI Analysis"}
          </motion.button>

          {/* What you get */}
          <div style={styles.whatYouGet}>
            <h3 style={styles.whatTitle}>✨ What you get</h3>

            <div style={styles.whatGrid}>
              <WhatCard
                icon={<BarChart3 size={22} />}
                title="Spending Insights"
                desc="Categorized income vs expense analytics"
              />
              <WhatCard
                icon={<ShieldCheck size={22} />}
                title="Fraud Flags"
                desc="Suspicious patterns + anomaly detection"
              />
              <WhatCard
                icon={<Sparkles size={22} />}
                title="Risk Score"
                desc="Credit risk probability + ML score"
              />
              <WhatCard
                icon={<Bot size={22} />}
                title="AI Advisor"
                desc="Gemini AI assistant for loan decision"
              />
            </div>
          </div>
        </motion.div>

        {/* Mascot Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          style={styles.mascotCard}
        >
          <div style={styles.mascotGlow}>
            <AnalyzerMascot />
          </div>

          <h2 style={styles.mascotTitle}>🤖 Intelli AI Auditor</h2>
          <p style={styles.mascotSub}>
            “Upload your statement, I’ll scan patterns, detect risk, highlight
            fraud, and suggest the best loan decision.”
          </p>
        </motion.div>
      </div>

      {/* Result Section */}
      {report && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            ...styles.resultCard,
            position: "relative",
            overflow: "hidden",
            boxShadow:
              report.risk_label === "HIGH RISK"
                ? "0 0 60px rgba(239,68,68,0.15)"
                : "0 0 60px rgba(34,197,94,0.15)",
          }}
        >
          <ResultMascot risk={report.risk_label} />
          <FloatingIcons risk={report.risk_label} />

          <div style={styles.resultHeader}>
            <div>
              <h2 style={styles.resultTitle}>📌 AI Analysis Result</h2>
              <p style={styles.resultSub}>
                Automated credit risk report generated using ML + fraud
                detection.
              </p>

              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={styles.aiBadge}
              >
                🤖 AI Processing Complete
              </motion.div>
            </div>

            <div
              style={{
                ...styles.riskBadge,
                background:
                  report.risk_label === "HIGH RISK"
                    ? "rgba(239,68,68,0.18)"
                    : "rgba(34,197,94,0.18)",
                borderColor:
                  report.risk_label === "HIGH RISK"
                    ? "rgba(239,68,68,0.4)"
                    : "rgba(34,197,94,0.4)",
                color:
                  report.risk_label === "HIGH RISK" ? "#ef4444" : "#22c55e",
              }}
            >
              {report.risk_label}
            </div>
          </div>

          {/* Risk Score Progress */}
          <div style={styles.scoreWrap}>
            <div style={styles.scoreTop}>
              <h3 style={styles.scoreTitle}>Risk Score</h3>
              <p style={styles.scoreValue}>{report.risk_score}/100</p>
            </div>

            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${report.risk_score}%`,
                  background:
                    report.risk_score > 70
                      ? "linear-gradient(to right, #ef4444, #f97316)"
                      : "linear-gradient(to right, #22c55e, #3b82f6)",
                }}
              />
            </div>

            <p style={styles.scoreHint}>
              {report.risk_score > 70
                ? "⚠️ High risk detected. Requires strict verification."
                : "✅ Low risk detected. Eligible for approval check."}
            </p>
          </div>

          {/* Main Result Cards */}
          <div style={styles.resultGrid}>
            <div style={styles.resultBox}>
              <p style={styles.resultLabel}>💳 Recommendation</p>
              <h3 style={styles.resultMain}>{report.recommendation}</h3>
            </div>

            <div style={styles.resultBox}>
              <p style={styles.resultLabel}>📊 Risk Probability</p>
              <h3 style={styles.resultMain}>{report.risk_probability}%</h3>
            </div>

            <div style={styles.resultBox}>
              <p style={styles.resultLabel}>💰 Monthly Income</p>
              <h3 style={styles.resultMain}>₹{report.features.monthly_income}</h3>
            </div>

            <div style={styles.resultBox}>
              <p style={styles.resultLabel}>📉 Monthly Expense</p>
              <h3 style={styles.resultMain}>₹{report.features.monthly_expense}</h3>
            </div>
          </div>

          {/* Summary */}
          <div style={styles.summaryBox}>
            <h3 style={styles.summaryTitle}>🧠 AI Summary</h3>
            <p style={styles.summaryText}>{report.summary}</p>
          </div>

          {/* Download Button */}
          <a
            href="http://127.0.0.1:8000/download-report"
            target="_blank"
            rel="noreferrer"
            style={styles.downloadBtnPro}
          >
            📄 Download Professional PDF Report
          </a>
        </motion.div>
      )}
    </div>
  );
}

/* ------------------- Components ------------------- */
function WhatCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.25 }}
      style={styles.whatCard}
    >
      <div style={styles.whatIcon}>{icon}</div>
      <h4 style={styles.whatCardTitle}>{title}</h4>
      <p style={styles.whatCardDesc}>{desc}</p>
    </motion.div>
  );
}

/* ------------------- Styles ------------------- */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "radial-gradient(circle at top, #0f172a, #05070d)",
    color: "white",
    overflow: "hidden",
    position: "relative",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
    position: "relative",
    zIndex: 2,
  },

  title: {
    fontSize: "48px",
    margin: 0,
    fontWeight: "900",
  },

  gradient: {
    background: "linear-gradient(to right, #2563eb, #22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subTitle: {
    marginTop: "12px",
    fontSize: "15px",
    color: "#cbd5e1",
    maxWidth: "750px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.6",
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "25px",
    alignItems: "start",
    position: "relative",
    zIndex: 2,
  },

  uploadCard: {
    padding: "25px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0px 0px 30px rgba(0,0,0,0.25)",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "22px",
  },

  uploadInfo: {
    marginTop: "12px",
    color: "#9ca3af",
    fontSize: "14px",
  },

  uploadBox: {
    marginTop: "18px",
    padding: "22px",
    borderRadius: "18px",
    border: "2px dashed rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.03)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textAlign: "center",
  },

  uploadIconWrap: {
    width: "65px",
    height: "65px",
    borderRadius: "20px",
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "12px",
    color: "#22c55e",
    boxShadow: "0px 0px 20px rgba(34,197,94,0.18)",
  },

  uploadText: {
    margin: 0,
    color: "#cbd5e1",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  fileName: {
    color: "#22c55e",
    fontWeight: "bold",
  },

  analyzeBtn: {
    marginTop: "18px",
    width: "100%",
    padding: "14px",
    borderRadius: "18px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    color: "white",
    background: "linear-gradient(to right, #2563eb, #22c55e)",
    boxShadow: "0px 0px 25px rgba(34,197,94,0.2)",
  },

  whatYouGet: {
    marginTop: "28px",
  },

  whatTitle: {
    marginBottom: "12px",
    fontSize: "18px",
  },

  whatGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "12px",
  },

  whatCard: {
    padding: "14px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
  },

  whatIcon: {
    width: "45px",
    height: "45px",
    borderRadius: "16px",
    background: "rgba(59,130,246,0.12)",
    border: "1px solid rgba(59,130,246,0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
    color: "#3b82f6",
  },

  whatCardTitle: {
    margin: 0,
    fontSize: "14px",
  },

  whatCardDesc: {
    marginTop: "6px",
    fontSize: "12px",
    color: "#9ca3af",
    lineHeight: "1.5",
  },

  mascotCard: {
    padding: "22px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    textAlign: "center",
    boxShadow: "0px 0px 35px rgba(59,130,246,0.12)",
  },

  mascotGlow: {
    padding: "12px",
    borderRadius: "24px",
    background:
      "linear-gradient(to right, rgba(37,99,235,0.15), rgba(34,197,94,0.15))",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0px 0px 30px rgba(34,197,94,0.12)",
    marginBottom: "15px",
  },

  mascotTitle: {
    margin: 0,
    fontSize: "20px",
  },

  mascotSub: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#cbd5e1",
    lineHeight: "1.6",
  },

  /* ------------------ PRO RESULT UI ------------------ */
  resultCard: {
    marginTop: "35px",
    padding: "28px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    zIndex: 2,
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  resultTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "900",
  },

  resultSub: {
    marginTop: "6px",
    marginBottom: 0,
    fontSize: "14px",
    color: "#9ca3af",
  },

  aiBadge: {
    marginTop: "10px",
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.15)",
    border: "1px solid rgba(59,130,246,0.3)",
    fontSize: "12px",
    fontWeight: "600",
    color: "#3b82f6",
  },

  riskBadge: {
    padding: "10px 16px",
    borderRadius: "999px",
    fontWeight: "900",
    fontSize: "14px",
    border: "1px solid",
    letterSpacing: "0.5px",
  },

  scoreWrap: {
    marginTop: "22px",
    padding: "18px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  scoreTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  scoreTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#e5e7eb",
  },

  scoreValue: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "900",
    color: "#ffffff",
  },

  progressBar: {
    marginTop: "12px",
    width: "100%",
    height: "14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: "999px",
    transition: "0.5s ease-in-out",
  },

  scoreHint: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#9ca3af",
  },

  resultGrid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },

  resultBox: {
    padding: "16px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0px 0px 25px rgba(0,0,0,0.25)",
  },

  resultLabel: {
    margin: 0,
    fontSize: "13px",
    color: "#9ca3af",
    fontWeight: "600",
  },

  resultMain: {
    marginTop: "8px",
    marginBottom: 0,
    fontSize: "18px",
    fontWeight: "900",
    color: "#ffffff",
  },

  summaryBox: {
    marginTop: "22px",
    padding: "18px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  summaryTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "900",
  },

  summaryText: {
    marginTop: "10px",
    color: "#cbd5e1",
    fontSize: "14px",
    lineHeight: "1.7",
  },

  downloadBtnPro: {
    display: "inline-block",
    marginTop: "20px",
    width: "100%",
    textAlign: "center",
    padding: "14px 18px",
    borderRadius: "18px",
    background: "linear-gradient(to right, #2563eb, #22c55e)",
    color: "white",
    textDecoration: "none",
    fontWeight: "900",
    fontSize: "15px",
    boxShadow: "0px 0px 25px rgba(34,197,94,0.18)",
  },
};