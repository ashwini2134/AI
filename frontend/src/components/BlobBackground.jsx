import React from "react";
import { motion } from "framer-motion";

export default function BlobBackground() {
  return (
    <div style={styles.wrapper}>
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...styles.blob, ...styles.blob1 }}
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...styles.blob, ...styles.blob2 }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...styles.blob, ...styles.blob3 }}
      />
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    zIndex: 0,
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    filter: "blur(120px)",
    opacity: 0.55,
  },
  blob1: {
    top: "-100px",
    left: "-120px",
    background: "rgba(37,99,235,0.9)",
  },
  blob2: {
    bottom: "-120px",
    right: "-120px",
    background: "rgba(34,197,94,0.9)",
  },
  blob3: {
    top: "40%",
    left: "40%",
    background: "rgba(168,85,247,0.8)",
  },
};