from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_pdf_report(report_data, output_file="audit_report.pdf"):
    c = canvas.Canvas(output_file, pagesize=letter)
    width, height = letter

    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, height - 50, "Intelli-Audit AI - Credit Risk Report")

    c.setFont("Helvetica", 12)
    c.drawString(50, height - 90, f"Risk Level: {report_data['risk_label']}")
    c.drawString(50, height - 110, f"Risk Score: {report_data['risk_score']} / 100")
    c.drawString(50, height - 130, f"Risk Probability: {report_data['risk_probability']}%")

    c.drawString(50, height - 170, "Executive Summary:")
    c.drawString(50, height - 190, report_data["summary"][:100])

    c.drawString(50, height - 230, "Recommendation:")
    c.drawString(50, height - 250, report_data["recommendation"])

    y = height - 300
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y, "Key Financial Metrics:")

    c.setFont("Helvetica", 12)
    y -= 25
    for key, val in report_data["features"].items():
        if key in ["category_summary", "red_flags"]:
            continue
        c.drawString(50, y, f"{key}: {val}")
        y -= 18

    y -= 10
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y, "Red Flags Detected:")
    y -= 25
    c.setFont("Helvetica", 12)

    flags = report_data.get("red_flags", [])
    if not flags:
        c.drawString(50, y, "No major red flags detected.")
    else:
        for flag in flags[:6]:
            c.drawString(50, y, f"- {flag[:90]}")
            y -= 18

    c.save()
    return output_file
