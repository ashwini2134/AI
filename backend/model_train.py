import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

data = pd.DataFrame({
    "monthly_income": np.random.randint(20000, 200000, 1000),
    "monthly_expense": np.random.randint(5000, 180000, 1000),
    "cash_withdrawals": np.random.randint(0, 60000, 1000),
    "failed_transactions": np.random.randint(0, 12, 1000),
    "loan_emi": np.random.randint(0, 60000, 1000),
})

data["risk"] = (
    (data["monthly_expense"] > data["monthly_income"]) |
    (data["cash_withdrawals"] > 25000) |
    (data["failed_transactions"] > 3) |
    (data["loan_emi"] > 25000)
).astype(int)

X = data.drop("risk", axis=1)
y = data["risk"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, "risk_model.pkl")
print("✅ Model trained and saved as risk_model.pkl")
