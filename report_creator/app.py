from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

from services.pdf_service import generate_pdf
from services.excel_service import generate_excel

load_dotenv()

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL")

LAST_PDF = None
LAST_EXCEL = None


def get_connection():

    if not DATABASE_URL:
        raise Exception("DATABASE_URL no encontrada")

    db_url = DATABASE_URL

    if "?" in db_url:
        db_url = db_url.split("?")[0]

    return psycopg2.connect(db_url)


# =========================
# FINANCIAL INSIGHTS
# =========================
def generate_insights(incomes, outflows, sales):

    total_income = sum(
        float(i[0])
        for i in incomes
    )

    total_expenses = sum(
        float(o[0])
        for o in outflows
    )

    total_sales = sum(
        float(s[1]) * int(s[2])
        for s in sales
    )

    total_revenue = (
        total_income +
        total_sales
    )

    profit = (
        total_revenue -
        total_expenses
    )

    profit_margin = 0

    if total_revenue > 0:
        profit_margin = (
            profit / total_revenue
        ) * 100

    if profit <= 0:
        status = "Negative Balance"

    elif profit_margin < 10:
        status = "Low Profitability"

    elif profit_margin < 25:
        status = "Healthy Profitability"

    else:
        status = "Excellent Profitability"

    return {
        "income": round(total_income, 2),
        "expenses": round(total_expenses, 2),
        "sales": round(total_sales, 2),
        "revenue": round(total_revenue, 2),
        "profit": round(profit, 2),
        "profit_margin": round(profit_margin, 2),
        "message": status
    }


# =========================
# GENERATE REPORT
# =========================
@app.route("/generate_report", methods=["POST"])
def generate_report():

    global LAST_PDF
    global LAST_EXCEL

    data = request.json

    user_id = data["user_id"]
    report_type = data["report_type"]

    conn = get_connection()
    cur = conn.cursor()

    # =========================
    # INCOMES
    # =========================
    cur.execute("""
        SELECT
            amount,
            description,
            income_type,
            date
        FROM "Incomes"
        WHERE user_id = %s
        ORDER BY date DESC
    """, (user_id,))

    incomes = cur.fetchall()

    # =========================
    # OUTFLOWS
    # =========================
    cur.execute("""
        SELECT
            amount,
            description,
            outflow_type,
            date
        FROM "Outflows"
        WHERE user_id = %s
        ORDER BY date DESC
    """, (user_id,))

    outflows = cur.fetchall()

    # =========================
    # SALES
    # =========================
    cur.execute("""
        SELECT
            item_sold,
            price_of_item,
            quantity_of_sold_items,
            date
        FROM "Sales"
        WHERE user_id = %s
        ORDER BY date DESC
    """, (user_id,))

    sales = cur.fetchall()

    cur.close()
    conn.close()

    rows = []

    # =========================
    # INCOMES REPORT
    # =========================
    if report_type == "incomes":

        for income in incomes:

            rows.append({
                "type": income[2],
                "product": income[1] or "No description",
                "quantity": 1,
                "unit_price": float(income[0]),
                "amount": float(income[0]),
                "date": str(income[3])[:10]
            })

    # =========================
    # EXPENSES REPORT
    # =========================
    elif report_type == "expenses":

        for expense in outflows:

            rows.append({
                "type": expense[2],
                "product": expense[1] or "No description",
                "quantity": 1,
                "unit_price": float(expense[0]),
                "amount": float(expense[0]),
                "date": str(expense[3])[:10]
            })

    # =========================
    # SALES REPORT
    # =========================
    elif report_type == "sales":

        for sale in sales:

            rows.append({
                "type": "Sale",
                "product": sale[0],
                "quantity": int(sale[2]),
                "unit_price": float(sale[1]),
                "amount": float(sale[1]) * int(sale[2]),
                "date": str(sale[3])[:10]
            })

    # =========================
    # PROFIT REPORT
    # =========================
    else:

        insights = generate_insights(
            incomes,
            outflows,
            sales
        )

        rows = [
            {
                "type": "Metric",
                "product": "Total Income",
                "quantity": "",
                "unit_price": "",
                "amount": insights["income"],
                "date": ""
            },
            {
                "type": "Metric",
                "product": "Total Sales",
                "quantity": "",
                "unit_price": "",
                "amount": insights["sales"],
                "date": ""
            },
            {
                "type": "Metric",
                "product": "Total Revenue",
                "quantity": "",
                "unit_price": "",
                "amount": insights["revenue"],
                "date": ""
            },
            {
                "type": "Metric",
                "product": "Total Expenses",
                "quantity": "",
                "unit_price": "",
                "amount": insights["expenses"],
                "date": ""
            },
            {
                "type": "Metric",
                "product": "Net Profit",
                "quantity": "",
                "unit_price": "",
                "amount": insights["profit"],
                "date": ""
            },
            {
                "type": "Metric",
                "product": "Profit Margin (%)",
                "quantity": "",
                "unit_price": "",
                "amount": insights["profit_margin"],
                "date": ""
            }
        ]

    insights = generate_insights(
        incomes,
        outflows,
        sales
    )

    LAST_PDF = generate_pdf(
        rows,
        insights
    )

    LAST_EXCEL = generate_excel(
        rows,
        insights
    )

    return jsonify({
        "success": True,
        "pdf": "http://127.0.0.1:5000/download/pdf",
        "excel": "http://127.0.0.1:5000/download/excel",
        "insights": insights
    })


# =========================
# DOWNLOAD PDF
# =========================
@app.route("/download/pdf")
def download_pdf():

    global LAST_PDF

    if LAST_PDF is None:
        return jsonify({
            "error": "Generate report first"
        }), 404

    LAST_PDF.seek(0)

    return send_file(
        LAST_PDF,
        as_attachment=True,
        download_name="financial_report.pdf",
        mimetype="application/pdf"
    )


# =========================
# DOWNLOAD EXCEL
# =========================
@app.route("/download/excel")
def download_excel():

    global LAST_EXCEL

    if LAST_EXCEL is None:
        return jsonify({
            "error": "Generate report first"
        }), 404

    LAST_EXCEL.seek(0)

    return send_file(
        LAST_EXCEL,
        as_attachment=True,
        download_name="financial_report.xlsx",
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


if __name__ == "__main__":
    app.run(debug=True)