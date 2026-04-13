# Intelli-Audit AI DevFest PRO (Top 5 Edition)

## Features
- Premium Landing Page + Demo Video
- Upload CSV/PDF statement
- ML Risk Score + Gauge UI
- Fraud / Red Flag Detection
- Spending Category Pie Chart
- PDF Report Download
- Gemini AI Loan Advisor Chatbot

---

## Backend Setup (Windows)

### 1) Go to backend folder
```bash
cd backend
```

### 2) Install requirements
```bash
py -m pip install -r requirements.txt
```

### 3) Add Gemini API Key
Create `.env` file inside backend folder:

```env
GEMINI_API_KEY=YOUR_KEY_HERE
```

### 4) Run backend
```bash
py -m uvicorn app:app --reload
```

Backend URL: http://127.0.0.1:8000

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: http://localhost:5173

---

## Pages
- / (Landing Page)
- /analyzer
- /dashboard
- /advisor
