import React, { useState } from "react";
import { motion } from "framer-motion";

export default function RiskSimulator({ baseReport }) {
  const base = baseReport?.features || {};

  const [income, setIncome] = useState(base.monthly_income || 50000);
  const [expense, setExpense] = useState(base.monthly_expense || 25000);
  const [emi, setEmi] = useState(base.loan_emi || 5000);
  const [cash, setCash] = useState(base.cash_withdrawals || 2000);

  // Simple simulation formula
  const simulatedRisk = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (expense / (income + 1)) * 60 +
          (emi / (income + 1)) * 30 +
          (cash / (income + 1)) * 20
      )
    )
  );

  const simulatedLabel =
    simulatedRisk > 70
      ? "HIGH RISK"
      : simulatedRisk > 40
      ? "MEDIUM RISK"
      : "LOW RISK";

  const color =
    simulatedRisk > 70 ? "#ef4444" : simulatedRisk > 40 ? "#f59e0b" : "#22c55e";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={styles.card}
    >
      <h2 style={styles.title}>🎯 Loan Risk Simulator</h2>
      <p style={styles.desc}>
        Adjust values to see how risk score changes. This helps loan officers
        understand improvements needed.
      </p>

      <div style={styles.grid}>
        <div style={styles.sliderBox}>
          <label>💰 Monthly Income: ₹{Math.round(income)}</label>
          <input
            type="range"
            min="10000"
            max="200000"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.sliderBox}>
          <label>📉 Monthly Expense: ₹{Math.round(expense)}</label>
          <input
            type="range"
            min="1000"
            max="150000"
            value={expense}
            onChange={(e) => setExpense(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.sliderBox}>
          <label>🏦 EMI Payments: ₹{Math.round(emi)}</label>
          <input
            type="range"
            min="0"
            max="60000"
            value={emi}
            onChange={(e) => setEmi(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.sliderBox}>
          <label>🏧 Cash Withdrawals: ₹{Math.round(cash)}</label>
          <input
            type="range"
            min="0"
            max="80000"
            value={cash}
            onChange={(e) => setCash(Number(e.target.value))}
            style={styles.slider}
          />
        </div>
      </div>

      <div style={styles.resultBox}>
        <h2 style={{ margin: 0, color }}>
          Simulated Risk Score: {simulatedRisk}/100
        </h2>
        <p style={{ marginTop: "8px", color: "#cbd5e1" }}>
          Status: <b style={{ color }}>{simulatedLabel}</b>
        </p>

        <p style={styles.tip}>
          ✅ Tip: Reducing expenses or EMI improves risk score drastically.
        </p>
      </div>
    </motion.div>
  );
}

const styles = {
  card: {
    marginTop: "20px",
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  title: {
    marginTop: 0,
    fontSize: "20px",
  },

  desc: {
    color: "#9ca3af",
    fontSize: "14px",
    marginBottom: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },

  sliderBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    color: "#e5e7eb",
    fontSize: "14px",
  },

  slider: {
    width: "100%",
    cursor: "pointer",
  },

  resultBox: {
    marginTop: "20px",
    padding: "18px",
    borderRadius: "16px",
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.08)",
    textAlign: "center",
  },

  tip: {
    marginTop: "10px",
    color: "#9ca3af",
    fontSize: "13px",
  },
};