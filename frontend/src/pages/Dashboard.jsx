import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  ShieldAlert,
  PieChart as PieIcon,
  Download,
  Bot,
  Search,
} from "lucide-react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

import BlobBackground from "../components/BlobBackground";
import RiskSimulator from "../components/RiskSimulator";

export default function Dashboard() {
  const [report, setReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("report");
    if (data) setReport(JSON.parse(data));
  }, []);

  // ✅ Always run useMemo BEFORE any return
  const filteredTransactions = useMemo(() => {
    if (!report) return [];

    const tx = report.transactions_preview || [];
    if (!searchTerm.trim()) return tx;

    return tx.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [report, searchTerm]);

  // ✅ Now safe to return
  if (!report) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(circle at top, #0f172a, #05070d)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>No report found. Upload file first.</h2>
      </div>
    );
  }

  const downloadReport = () => {
    window.open("http://127.0.0.1:8000/download-report", "_blank");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const pieData = Object.entries(report.category_summary || {}).map(
    ([name, value]) => ({
      name,
      value: Math.round(value),
    })
  );

  const riskColor =
    report.risk_score > 70
      ? "#ef4444"
      : report.risk_score > 40
      ? "#f59e0b"
      : "#22c55e";

  return (
    <div style={styles.page}>
      <BlobBackground />

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.brand}>🤖 Intelli-Audit</h2>

        <div style={styles.menu}>
          <div
            style={styles.menuItemActive}
            onClick={() => scrollToSection("overview")}
          >
            <LayoutDashboard size={18} /> Overview
          </div>

          <div
            style={styles.menuItem}
            onClick={() => scrollToSection("transactions")}
          >
            <FileText size={18} /> Transactions
          </div>

          <div style={styles.menuItem} onClick={() => scrollToSection("fraud")}>
            <ShieldAlert size={18} /> Fraud Alerts
          </div>

          <div
            style={styles.menuItem}
            onClick={() => scrollToSection("spending")}
          >
            <PieIcon size={18} /> Spending Chart
          </div>

          <div
            style={styles.menuItem}
            onClick={() => (window.location.href = "/advisor")}
          >
            <Bot size={18} /> AI Advisor
          </div>
        </div>

        <div style={styles.sidebarFooter}>
          <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
            DevFest PRO Edition
          </p>
        </div>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Topbar */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.title}>AI Risk Dashboard</h1>
            <p style={styles.subtitle}>
              Premium credit risk & fraud detection insights
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            style={styles.downloadBtn}
            onClick={downloadReport}
          >
            <Download size={18} /> Download Report
          </motion.button>
        </div>

        {/* Metric Cards */}
        <div id="overview" style={styles.metricsGrid}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={styles.metricCard}
          >
            <h3 style={styles.metricTitle}>Risk Score</h3>
            <h2 style={{ margin: 0, color: riskColor }}>
              {report.risk_score}/100
            </h2>
            <p style={styles.metricText}>{report.risk_label}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.metricCard}
          >
            <h3 style={styles.metricTitle}>Risk Probability</h3>
            <h2 style={{ margin: 0 }}>{report.risk_probability}%</h2>
            <p style={styles.metricText}>ML confidence score</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={styles.metricCard}
          >
            <h3 style={styles.metricTitle}>Recommendation</h3>
            <h2 style={{ margin: 0 }}>{report.recommendation}</h2>
            <p style={styles.metricText}>Decision suggestion</p>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div style={styles.contentGrid}>
          {/* Gauge */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.card}
          >
            <h2 style={styles.cardTitle}>📍 Risk Gauge</h2>

            <div style={styles.gaugeWrap}>
              <div style={styles.gaugeCircle}>
                <div
                  style={{
                    ...styles.gaugeNeedle,
                    transform: `rotate(${
                      (report.risk_score / 100) * 180 - 90
                    }deg)`,
                  }}
                />
                <div style={{ ...styles.gaugeCenter, borderColor: riskColor }} />
              </div>

              <h2 style={{ marginTop: "15px", color: riskColor }}>
                {report.risk_score}/100
              </h2>

              <p style={{ color: "#9ca3af", marginTop: "5px" }}>
                {report.summary}
              </p>
            </div>
          </motion.div>

          {/* Spending Pie Chart */}
          <motion.div
            id="spending"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.card}
          >
            <h2 style={styles.cardTitle}>📊 Spending Categories</h2>

            {pieData.length === 0 ? (
              <p style={{ color: "#9ca3af" }}>No category data found.</p>
            ) : (
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={95}
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>
        </div>

        {/* Risk Simulator */}
        <RiskSimulator baseReport={report} />

        {/* Fraud Flags */}
        <motion.div
          id="fraud"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={styles.cardFull}
        >
          <h2 style={styles.cardTitle}>🚨 Fraud / Red Flags</h2>

          {(report.red_flags || []).length === 0 ? (
            <p style={{ color: "#9ca3af" }}>No major red flags detected.</p>
          ) : (
            <div style={styles.flagsWrap}>
              {(report.red_flags || []).map((flag, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  style={styles.flagChip}
                >
                  ⚠ {flag}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Transaction Table */}
        <motion.div
          id="transactions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={styles.cardFull}
        >
          <div style={styles.tableHeader}>
            <h2 style={styles.cardTitle}>🧾 Transactions</h2>

            <div style={styles.searchBox}>
              <Search size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search transactions..."
                style={styles.searchInput}
              />
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <p style={{ color: "#9ca3af" }}>No matching transactions found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {Object.keys(filteredTransactions[0] || {}).map((k) => (
                      <th key={k} style={styles.th}>
                        {k}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((v, i) => (
                        <td key={i} style={styles.td}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    background: "radial-gradient(circle at top, #0f172a, #05070d)",
    color: "white",
    position: "relative",
  },

  sidebar: {
    width: "260px",
    padding: "25px",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(14px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 2,
  },

  brand: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
  },

  menu: {
    marginTop: "35px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    borderRadius: "14px",
    color: "#cbd5e1",
    cursor: "pointer",
    background: "rgba(255,255,255,0.03)",
  },

  menuItemActive: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    borderRadius: "14px",
    cursor: "pointer",
    background:
      "linear-gradient(to right, rgba(37,99,235,0.6), rgba(34,197,94,0.4))",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  sidebarFooter: {
    marginTop: "30px",
    paddingTop: "15px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },

  main: {
    flex: 1,
    padding: "30px",
    position: "relative",
    zIndex: 2,
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  title: { fontSize: "34px", margin: 0 },

  subtitle: {
    margin: "6px 0 0",
    color: "#9ca3af",
    fontSize: "14px",
  },

  downloadBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 18px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(to right, #2563eb, #22c55e)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  metricsGrid: {
    marginTop: "25px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "15px",
  },

  metricCard: {
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  metricTitle: { margin: 0, fontSize: "14px", color: "#9ca3af" },

  metricText: {
    marginTop: "8px",
    color: "#cbd5e1",
    fontSize: "14px",
  },

  contentGrid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
    gap: "18px",
  },

  card: {
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  cardFull: {
    marginTop: "20px",
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  cardTitle: { marginTop: 0, fontSize: "18px" },

  gaugeWrap: { textAlign: "center", marginTop: "15px" },

  gaugeCircle: {
    width: "240px",
    height: "120px",
    margin: "auto",
    borderTopLeftRadius: "240px",
    borderTopRightRadius: "240px",
    background: "rgba(255,255,255,0.08)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  gaugeNeedle: {
    width: "4px",
    height: "110px",
    background: "white",
    position: "absolute",
    bottom: "0px",
    left: "50%",
    transformOrigin: "bottom center",
  },

  gaugeCenter: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "4px solid",
    position: "absolute",
    bottom: "-9px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#0f172a",
  },

  flagsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "10px",
  },

  flagChip: {
    padding: "10px 14px",
    borderRadius: "999px",
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)",
    fontSize: "13px",
    color: "#fecaca",
  },

  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.25)",
    color: "#cbd5e1",
  },

  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    width: "220px",
  },

  table: { width: "100%", borderCollapse: "collapse", marginTop: "15px" },

  th: {
    padding: "12px",
    textAlign: "left",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: "13px",
    color: "#e5e7eb",
  },

  td: {
    padding: "12px",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "#cbd5e1",
    fontSize: "13px",
  },
};