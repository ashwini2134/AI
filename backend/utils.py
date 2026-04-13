import pandas as pd
import pdfplumber

CATEGORY_KEYWORDS = {
    "Food": ["zomato", "swiggy", "restaurant", "cafe", "food"],
    "Shopping": ["amazon", "flipkart", "myntra", "shopping", "store"],
    "Travel": ["uber", "ola", "rapido", "metro", "bus", "flight"],
    "Bills": ["electricity", "water", "gas", "bill", "recharge", "broadband"],
    "Rent": ["rent", "house rent"],
    "Medical": ["hospital", "pharmacy", "medical"],
    "ATM/Cash": ["atm", "cash withdrawal"],
    "Loan/EMI": ["emi", "loan"],
    "Transfers": ["neft", "imps", "upi transfer"]
}

def categorize_transaction(desc: str):
    d = str(desc).lower()
    for cat, keys in CATEGORY_KEYWORDS.items():
        for k in keys:
            if k in d:
                return cat
    return "Other"

def detect_red_flags(df):
    flags = []

    cash_total = df[df["Description"].str.contains("ATM|CASH", case=False, na=False)]["Debit"].sum()
    if cash_total > 15000:
        flags.append(f"High ATM/Cash withdrawals detected (₹{int(cash_total)})")

    failed_count = df[df["Description"].str.contains("FAILED|DECLINED", case=False, na=False)].shape[0]
    if failed_count >= 1:
        flags.append(f"{failed_count} failed/declined transactions detected")

    if df["Debit"].sum() > df["Credit"].sum():
        flags.append("Expenses exceed income (negative cashflow risk)")

    big_spend = df[df["Debit"] > 10000]
    if len(big_spend) > 0:
        flags.append(f"{len(big_spend)} high-value debit transactions above ₹10,000")

    low_balance = df[df["Balance"] < 2000]
    if len(low_balance) > 0:
        flags.append("Account balance frequently drops below ₹2,000")

    return flags

def analyze_bank_csv(file_path):
    df = pd.read_csv(file_path)

    df["Debit"] = df["Debit"].fillna(0)
    df["Credit"] = df["Credit"].fillna(0)

    df["Category"] = df["Description"].apply(categorize_transaction)

    total_income = df["Credit"].sum()
    total_expense = df["Debit"].sum()

    cash_withdrawals = df[df["Category"] == "ATM/Cash"]["Debit"].sum()
    failed_transactions = df[df["Description"].str.contains("FAILED|DECLINED", case=False, na=False)].shape[0]

    loan_emi = df[df["Category"] == "Loan/EMI"]["Debit"].sum()

    red_flags = detect_red_flags(df)

    category_summary = df.groupby("Category")["Debit"].sum().sort_values(ascending=False).to_dict()

    return {
        "monthly_income": float(total_income),
        "monthly_expense": float(total_expense),
        "cash_withdrawals": float(cash_withdrawals),
        "failed_transactions": int(failed_transactions),
        "loan_emi": float(loan_emi),
        "category_summary": category_summary,
        "red_flags": red_flags
    }, df

def extract_pdf_text(file_path):
    text_data = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text_data += extracted + "\n"
    return text_data

def analyze_bank_pdf(file_path):
    text = extract_pdf_text(file_path)

    monthly_income = text.lower().count("credit") * 5000
    monthly_expense = text.lower().count("debit") * 3000
    cash_withdrawals = text.lower().count("atm") * 2000
    failed_transactions = text.lower().count("failed")

    df_preview = pd.DataFrame([{"PDF_Text_Snippet": text[:400] + "..."}])

    return {
        "monthly_income": float(monthly_income),
        "monthly_expense": float(monthly_expense),
        "cash_withdrawals": float(cash_withdrawals),
        "failed_transactions": int(failed_transactions),
        "loan_emi": 0.0,
        "category_summary": {},
        "red_flags": ["PDF analysis mode is basic demo-level extraction"]
    }, df_preview
