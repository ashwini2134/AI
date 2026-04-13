import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Brain,
  FileText,
  Zap,
  Bot,
  BarChart3,
} from "lucide-react";

import BlobBackground from "../components/BlobBackground";
import HeroMascot from "../components/HeroMascot";

export default function Home() {
  return (
    <div style={styles.page}>
      <BlobBackground />

      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🤖 Intelli-Audit AI</h2>

        <div style={styles.navLinks}>
          <a href="#features" style={styles.navLink}>
            Features
          </a>
          <a href="#how" style={styles.navLink}>
            How it Works
          </a>
          <a href="/analyzer" style={styles.navBtn}>
            Start Analyzer 🚀
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.heroLeft}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={styles.tag}
          >
            🚀 DevFest Hackathon • AI Automate 2026 Edition
          </motion.p>

          <h1 style={styles.heroTitle}>
            INTELLI-AUDIT <span style={styles.gradient}>AI</span>
          </h1>

          <p style={styles.heroSub}>
            Smart Bank Statement Analysis + Credit Risk Prediction + Fraud Flag
            Detection + AI Loan Advisor powered by Gemini.
          </p>

          <div style={styles.heroButtons}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/analyzer"
              style={styles.primaryBtn}
            >
              🚀 Start Analyzer
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/dashboard"
              style={styles.secondaryBtn}
            >
              📊 View Dashboard
            </motion.a>
          </div>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <h2 style={styles.statNum}>95%</h2>
              <p style={styles.statText}>Fraud Pattern Insights</p>
            </div>

            <div style={styles.statBox}>
              <h2 style={styles.statNum}>AI</h2>
              <p style={styles.statText}>Gemini Loan Advisor</p>
            </div>

            <div style={styles.statBox}>
              <h2 style={styles.statNum}>PDF</h2>
              <p style={styles.statText}>Auto Report Generator</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          style={styles.heroRight}
        >
          <div style={styles.mascotGlowWrap}>
            <HeroMascot />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" style={styles.section}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.sectionTitle}
        >
          ✨ Powerful Features
        </motion.h2>

        <p style={styles.sectionSub}>
          Built for fintech teams, loan officers, and auditors to make decisions
          faster with automation + AI intelligence.
        </p>

        <div style={styles.featuresGrid}>
          <FeatureCard
            icon={<Brain size={28} />}
            title="ML Risk Prediction"
            desc="Uses a trained ML model to predict loan default risk score from statement patterns."
            color="#22c55e"
          />
          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Fraud / Red Flags"
            desc="Detects suspicious withdrawals, irregular spending, and risky transaction behaviors."
            color="#ef4444"
          />
          <FeatureCard
            icon={<FileText size={28} />}
            title="PDF Report Generator"
            desc="Auto-generates a professional audit report for loan decision-making."
            color="#f59e0b"
          />
          <FeatureCard
            icon={<Bot size={28} />}
            title="Gemini AI Loan Advisor"
            desc="Ask AI questions like: approve/reject, improvements, fraud insights, summary."
            color="#a855f7"
          />
          <FeatureCard
            icon={<BarChart3 size={28} />}
            title="Analytics Dashboard"
            desc="Premium dashboard with risk gauge, spending charts, and transaction exploration."
            color="#3b82f6"
          />
          <FeatureCard
            icon={<Zap size={28} />}
            title="Automation Workflow"
            desc="Upload → Analyze → Predict → Report → Advisor → Decision in one click pipeline."
            color="#14b8a6"
          />
        </div>
      </div>

      {/* How It Works */}
      <div id="how" style={styles.section}>
        <h2 style={styles.sectionTitle}>⚙️ How It Works</h2>

        <p style={styles.sectionSub}>
          A complete end-to-end automation workflow for credit risk evaluation.
        </p>

        <div style={styles.howWrap}>
          {/* Steps */}
          <div style={styles.stepsGrid}>
            <StepCard
              step="01"
              icon="📤"
              title="Upload Statement"
              desc="Upload Bank CSV or PDF statement file."
            />
            <StepCard
              step="02"
              icon="🧠"
              title="AI Risk Analysis"
              desc="ML model calculates risk score and probability."
            />
            <StepCard
              step="03"
              icon="🚨"
              title="Fraud Insights"
              desc="System highlights suspicious behavior and anomalies."
            />
            <StepCard
              step="04"
              icon="📄"
              title="Dashboard + PDF"
              desc="Interactive dashboard + downloadable PDF report."
            />
            <StepCard
              step="05"
              icon="🤖"
              title="Gemini Advisor"
              desc="Chat with AI advisor for final loan decision guidance."
            />
          </div>

          {/* Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            style={styles.mascotBox}
          >
            <div style={styles.mascotGlowWrapSmall}>
              <HeroMascot />
            </div>

            <h3 style={{ marginTop: "10px" }}>🤖 AI Automation Assistant</h3>

            <p style={styles.mascotText}>
              Your smart AI agent that helps banks detect fraud, predict loan
              risk, and generate audit reports instantly.
            </p>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/advisor"
              style={styles.primaryBtn}
            >
              🧠 Try AI Advisor
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} Intelli-Audit AI • Built for DevFest AI
          Automate Hackathon 🚀
        </p>
      </div>
    </div>
  );
}

/* -------------------- Components -------------------- */

function FeatureCard({ icon, title, desc, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={styles.featureCard}
    >
      <div style={{ ...styles.iconBox, color, borderColor: color }}>
        {icon}
      </div>

      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureDesc}>{desc}</p>
    </motion.div>
  );
}

function StepCard({ step, title, desc, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3 }}
      style={styles.stepCard}
    >
      <div style={styles.stepTop}>
        <div style={styles.stepNum}>{step}</div>
        <div style={styles.stepIcon}>{icon}</div>
      </div>

      <h3 style={styles.stepTitle}>{title}</h3>
      <p style={styles.stepDesc}>{desc}</p>
    </motion.div>
  );
}

/* -------------------- Styles -------------------- */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "25px 40px",
    background: "radial-gradient(circle at top, #0f172a, #05070d)",
    color: "white",
    position: "relative",
    overflow: "hidden",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
    paddingBottom: "20px",
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  navLink: {
    textDecoration: "none",
    color: "#cbd5e1",
    fontSize: "14px",
    fontWeight: "500",
  },

  navBtn: {
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "14px",
    background: "linear-gradient(to right, #2563eb, #22c55e)",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
  },

  hero: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "40px",
    alignItems: "center",
    paddingTop: "20px",
    paddingBottom: "70px",
    position: "relative",
    zIndex: 2,
  },

  heroLeft: {},

  heroRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  tag: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    fontSize: "13px",
    color: "#e5e7eb",
    marginBottom: "15px",
  },

  heroTitle: {
    fontSize: "58px",
    margin: "0px",
    fontWeight: "900",
    lineHeight: "1.05",
    letterSpacing: "1px",
  },

  gradient: {
    background: "linear-gradient(to right, #2563eb, #22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSub: {
    marginTop: "18px",
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#cbd5e1",
    maxWidth: "600px",
  },

  heroButtons: {
    display: "flex",
    gap: "14px",
    marginTop: "25px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    display: "inline-block",
    padding: "14px 20px",
    borderRadius: "16px",
    background: "linear-gradient(to right, #2563eb, #22c55e)",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 0px 18px rgba(34,197,94,0.2)",
  },

  secondaryBtn: {
    display: "inline-block",
    padding: "14px 20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
  },

  stats: {
    display: "flex",
    gap: "18px",
    marginTop: "30px",
    flexWrap: "wrap",
  },

  statBox: {
    padding: "12px 18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    minWidth: "150px",
    boxShadow: "0px 0px 20px rgba(59,130,246,0.08)",
  },

  statNum: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "900",
  },

  statText: {
    marginTop: "5px",
    fontSize: "13px",
    color: "#9ca3af",
  },

  section: {
    marginTop: "60px",
    position: "relative",
    zIndex: 2,
  },

  sectionTitle: {
    fontSize: "34px",
    marginBottom: "12px",
  },

  sectionSub: {
    color: "#9ca3af",
    fontSize: "15px",
    maxWidth: "750px",
    lineHeight: "1.6",
  },

  featuresGrid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },

  featureCard: {
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "0.3s",
    boxShadow: "0px 0px 25px rgba(0,0,0,0.2)",
  },

  iconBox: {
    width: "55px",
    height: "55px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.06)",
    border: "2px solid rgba(255,255,255,0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "14px",
  },

  featureTitle: {
    margin: 0,
    fontSize: "18px",
  },

  featureDesc: {
    marginTop: "10px",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#cbd5e1",
  },

  howWrap: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "25px",
    alignItems: "center",
    marginTop: "25px",
  },

  stepsGrid: {
    marginTop: "10px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },

  stepCard: {
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
  },

  stepTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  stepNum: {
    fontSize: "14px",
    fontWeight: "900",
    padding: "6px 12px",
    display: "inline-block",
    borderRadius: "999px",
    background: "rgba(37,99,235,0.25)",
    border: "1px solid rgba(37,99,235,0.3)",
    marginBottom: "12px",
  },

  stepIcon: {
    fontSize: "24px",
  },

  stepTitle: {
    margin: 0,
    fontSize: "18px",
  },

  stepDesc: {
    marginTop: "10px",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#cbd5e1",
  },

  mascotBox: {
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    textAlign: "center",
    boxShadow: "0px 0px 35px rgba(34,197,94,0.08)",
  },

  mascotText: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#9ca3af",
    lineHeight: "1.6",
  },

  mascotGlowWrap: {
    padding: "10px",
    borderRadius: "24px",
    background:
      "linear-gradient(to right, rgba(37,99,235,0.18), rgba(34,197,94,0.12))",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0px 0px 35px rgba(59,130,246,0.12)",
  },

  mascotGlowWrapSmall: {
    padding: "10px",
    borderRadius: "24px",
    background:
      "linear-gradient(to right, rgba(168,85,247,0.12), rgba(34,197,94,0.12))",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0px 0px 35px rgba(168,85,247,0.12)",
  },

  footer: {
    marginTop: "70px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },

  footerText: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "13px",
  },
};