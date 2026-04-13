from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import pandas as pd
import joblib
import os
from dotenv import load_dotenv
import google.generativeai as genai

from utils import analyze_bank_csv, analyze_bank_pdf
from report_generator import generate_pdf_report

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "risk_model.pkl"
model = joblib.load(MODEL_PATH)

latest_pdf_path = None
latest_report_cache = None


@app.get("/")
def home():
    return {"message": "Intelli-Audit AI Backend Running 🚀"}


@app.post("/analyze")
async def analyze_statement(file: UploadFile = File(...)):
    global latest_pdf_path, latest_report_cache

    file_location = f"temp_{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    if file.filename.endswith(".csv"):
        features, df = analyze_bank_csv(file_location)
    else:
        features, df = analyze_bank_pdf(file_location)

    X = pd.DataFrame([{
        "monthly_income": features["monthly_income"],
        "monthly_expense": features["monthly_expense"],
        "cash_withdrawals": features["cash_withdrawals"],
        "failed_transactions": features["failed_transactions"],
        "loan_emi": features["loan_emi"]
    }])

    prediction = model.predict(X)[0]
    prob = model.predict_proba(X)[0][1]

    risk_score = int(prob * 100)
    risk_label = "HIGH RISK" if prediction == 1 else "LOW RISK"
    recommendation = "Loan Rejected ❌" if prediction == 1 else "Loan Approved ✅"

    summary = f"System detected {risk_label}. Monthly income is ₹{int(features['monthly_income'])} while expense is ₹{int(features['monthly_expense'])}. Risk score is {risk_score}/100."

    report = {
        "risk_label": risk_label,
        "risk_probability": round(float(prob) * 100, 2),
        "risk_score": risk_score,
        "summary": summary,
        "recommendation": recommendation,
        "features": features,
        "red_flags": features.get("red_flags", []),
        "category_summary": features.get("category_summary", {}),
        "transactions_preview": df.head(15).to_dict(orient="records")
    }

    latest_report_cache = report
    latest_pdf_path = generate_pdf_report(report, "audit_report.pdf")

    os.remove(file_location)
    return report


@app.get("/download-report")
def download_report():
    global latest_pdf_path
    if latest_pdf_path and os.path.exists(latest_pdf_path):
        return FileResponse(latest_pdf_path, filename="Intelli_Audit_Report.pdf")
    return {"error": "No report found. Analyze a file first."}


@app.post("/chat")
async def chat_with_ai(payload: dict):
    try:
        if not GEMINI_API_KEY:
            return {"reply": "❌ Gemini API key missing. Please add GEMINI_API_KEY in backend/.env file."}

        user_message = payload.get("message", "")
        report = payload.get("report", None)

        if not user_message.strip():
            return {"reply": "⚠️ Empty message received."}

        context = ""
        if report:
            context = f"""
You are a professional fintech credit analyst AI assistant.

Below is the customer's risk report JSON:
{report}

Give a professional, short, actionable response for loan officers.
"""

        model_ai = genai.GenerativeModel("gemini-1.5-pro-latest")

        prompt = context + "\nUser question: " + user_message

        response = model_ai.generate_content(prompt)

        # ✅ Safely extract response
        if response and hasattr(response, "text") and response.text:
            return {"reply": response.text}

        return {"reply": "⚠️ Gemini returned empty response. Check API key or model."}

    except Exception as e:
        return {"reply": f"❌ Backend Error: {str(e)}"}
@app.post("/advisor")
async def advisor(payload: dict):
    if not GEMINI_API_KEY:
        return {"reply": "❌ Gemini API key missing. Please add GEMINI_API_KEY in backend/.env file."}

    user_prompt = payload.get("prompt", "")

    model_ai = genai.GenerativeModel("gemini-1.5-flash")
    response = model_ai.generate_content(user_prompt)

    return {"reply": response.text}