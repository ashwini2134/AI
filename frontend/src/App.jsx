import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analyzer from "./pages/Analyzer";
import Dashboard from "./pages/Dashboard";
import Advisor from "./pages/Advisor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/advisor" element={<Advisor />} />
      </Routes>
    </BrowserRouter>
  );
}
