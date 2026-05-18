from flask import (
    Flask,
    request,
    jsonify,
    send_file
)

from flask_cors import CORS

import psycopg2
import re
import os
import uuid

from datetime import datetime

from services.excel_service import generate_excel
from services.pdf_service import generate_pdf

# =========================
# APP
# =========================

app = Flask(__name__)
CORS(app)

# =========================
# PATHS
# =========================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPORTS_DIR = os.path.join(BASE_DIR, "reports")

if not os.path.exists(REPORTS_DIR):
    os.makedirs(REPORTS_DIR)

# =========================
# DATABASE
# =========================

db = psycopg2.connect(
    host="localhost",
    database="ai_finance",
    user="postgres",
    password="CarlCT39648970",
    port="5432"
)

cursor = db.cursor()

# =========================
# HOME
# =========================

@app.route("/")
def home():

    return jsonify({
        "success": True,
        "message": "Kuali AI Backend Running"
    })

# =========================
# IA
# =========================

@app.route("/ia", methods=["POST"])
def ia():

    try:

        data = request.get_json()
        text = data.get("mensaje", "").lower().strip()

        transactions = []

        # =========================
        # DATE
        # =========================

        date_match = re.search(r"\d{4}-\d{2}-\d{2}", text)

        if date_match:
            date = date_match.group()
        else:
            date = datetime.now().strftime("%Y-%m-%d")

        # =========================
        # SPLIT BLOCKS
        # =========================

        blocks = re.split(r"\s+y\s+|\s+and\s+", text)

        for block in blocks:

            transaction_type = ""

            # =========================
            # DETECT TYPE
            # =========================

            if (
                "sale" in block or
                "sales" in block or
                "sold" in block or
                "sell" in block or
                "vend" in block
            ):

                transaction_type = "sale"

            elif (
                "purchase" in block or
                "purchases" in block or
                "purchased" in block or
                "buy" in block or
                "bought" in block or
                "compr" in block
            ):

                transaction_type = "purchase"

            if transaction_type == "":
                continue

            # =========================
            # QUANTITY
            # =========================

            quantity = 1

            quantity_match = re.search(
                r"(?:purchase|purchases|purchased|buy|bought|sold|sale|sales|sell|vend[ií]?|compr[eé]?)\s+(\d+(?:\.\d+)?)",
                block
            )

            if quantity_match:

                quantity_value = float(quantity_match.group(1))

                # BLOCK DECIMAL QUANTITIES

                if not quantity_value.is_integer():

                    return jsonify({
                        "success": False,
                        "error": "Quantity cannot contain decimals"
                    }), 400

                quantity = int(quantity_value)

            # =========================
            # PRICE
            # =========================

            unit_price = 0

            # Detect:
            # for 0.05
            # for $300
            # at 20
            # por 25

            price_match = re.search(
                r"(?:for|at|por|a)\s+\$?(\d+(?:\.\d+)?)",
                block
            )

            if price_match:
                unit_price = float(price_match.group(1))

            # =========================
            # VALIDATIONS
            # =========================

            if quantity <= 0:

                return jsonify({
                    "success": False,
                    "error": "Quantity must be greater than 0"
                }), 400

            if unit_price <= 0:

                return jsonify({
                    "success": False,
                    "error": "Price must be greater than 0"
                }), 400

            # =========================
            # PRODUCT
            # =========================

            product = "product"

            product_patterns = [

                r"(?:purchase|purchases|purchased|buy|bought)\s+\d+\s+(.*?)\s+(?:for|at|\$)",

                r"(?:sold|sale|sales|sell)\s+\d+\s+(.*?)\s+(?:for|at|\$)",

                r"compr[eé]?\s+\d+\s+(.*?)\s+(?:por|a)",

                r"vend[ií]?\s+\d+\s+(.*?)\s+(?:por|a)"
            ]

            for pattern in product_patterns:

                product_match = re.search(pattern, block)

                if product_match:

                    product = product_match.group(1).strip()
                    break

            # =========================
            # CALCULATE
            # =========================

            amount = quantity * unit_price

            transaction_data = {
                "type": transaction_type,
                "product": product,
                "quantity": quantity,
                "unit_price": round(unit_price, 2),
                "amount": round(amount, 2),
                "date": date
            }

            transactions.append(transaction_data)

        # =========================
        # VALIDATION
        # =========================

        if len(transactions) == 0:

            return jsonify({
                "success": False,
                "error": "No valid transaction detected"
            }), 400

        # =========================
        # SAVE DATABASE
        # =========================

        for t in transactions:

            cursor.execute("""
                INSERT INTO transactions
                (type, product, quantity, unit_price, amount, date)
                VALUES (%s,%s,%s,%s,%s,%s)
            """, (
                t["type"],
                t["product"],
                t["quantity"],
                t["unit_price"],
                t["amount"],
                t["date"]
            ))

        db.commit()

        return jsonify({
            "success": True,
            "transactions": transactions
        })

    except Exception as e:

        db.rollback()

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# =========================
# REPORT
# =========================

@app.route("/report", methods=["POST"])
def report():

    try:

        data = request.get_json()
        text = data.get("mensaje", "").lower()

        transaction_filter = None

        # =========================
        # FILTER TYPE
        # =========================

        if (
            "sale report" in text or
            "sales report" in text
        ):
            transaction_filter = "sale"

        elif (
            "purchase report" in text or
            "purchases report" in text
        ):
            transaction_filter = "purchase"

        # =========================
        # DATES
        # =========================

        dates = re.findall(r"\d{4}-\d{2}-\d{2}", text)

        # =========================
        # QUERY
        # =========================

        if len(dates) >= 2:

            start_date = dates[0]
            end_date = dates[1]

            if transaction_filter:

                cursor.execute("""
                    SELECT id, type, product, quantity,
                           unit_price, amount, date
                    FROM transactions
                    WHERE type=%s
                    AND date BETWEEN %s AND %s
                    ORDER BY id ASC
                """, (
                    transaction_filter,
                    start_date,
                    end_date
                ))

            else:

                cursor.execute("""
                    SELECT id, type, product, quantity,
                           unit_price, amount, date
                    FROM transactions
                    WHERE date BETWEEN %s AND %s
                    ORDER BY id ASC
                """, (
                    start_date,
                    end_date
                ))

        elif len(dates) == 1:

            single_date = dates[0]

            if transaction_filter:

                cursor.execute("""
                    SELECT id, type, product, quantity,
                           unit_price, amount, date
                    FROM transactions
                    WHERE type=%s
                    AND date=%s
                    ORDER BY id ASC
                """, (
                    transaction_filter,
                    single_date
                ))

            else:

                cursor.execute("""
                    SELECT id, type, product, quantity,
                           unit_price, amount, date
                    FROM transactions
                    WHERE date=%s
                    ORDER BY id ASC
                """, (
                    single_date,
                ))

        else:

            if transaction_filter:

                cursor.execute("""
                    SELECT id, type, product, quantity,
                           unit_price, amount, date
                    FROM transactions
                    WHERE type=%s
                    ORDER BY id ASC
                """, (
                    transaction_filter,
                ))

            else:

                cursor.execute("""
                    SELECT id, type, product, quantity,
                           unit_price, amount, date
                    FROM transactions
                    ORDER BY id ASC
                """)

        rows = cursor.fetchall()

        if len(rows) == 0:

            return jsonify({
                "success": False,
                "error": "No transactions found"
            })

        # =========================
        # REPORT DATA
        # =========================

        report_data = []

        for row in rows:

            report_data.append({
                "id": row[0],
                "type": row[1],
                "product": row[2],
                "quantity": row[3],
                "unit_price": float(row[4]),
                "amount": float(row[5]),
                "date": str(row[6])
            })

        # =========================
        # FILES
        # =========================

        report_id = str(uuid.uuid4())

        excel_filename = f"{report_id}.xlsx"
        pdf_filename = f"{report_id}.pdf"

        excel_path = os.path.join(
            REPORTS_DIR,
            excel_filename
        )

        pdf_path = os.path.join(
            REPORTS_DIR,
            pdf_filename
        )

        generate_excel(report_data, excel_path)
        generate_pdf(report_data, pdf_path)

        return jsonify({
            "success": True,
            "transactions": report_data,
            "excel": f"http://127.0.0.1:5000/download_excel/{excel_filename}",
            "pdf": f"http://127.0.0.1:5000/download_pdf/{pdf_filename}"
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# =========================
# DOWNLOAD EXCEL
# =========================

@app.route("/download_excel/<filename>")
def download_excel(filename):

    file_path = os.path.join(REPORTS_DIR, filename)

    if not os.path.exists(file_path):

        return jsonify({
            "success": False,
            "error": "Excel file not found"
        }), 404

    return send_file(
        file_path,
        as_attachment=True,
        download_name=filename,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

# =========================
# DOWNLOAD PDF
# =========================

@app.route("/download_pdf/<filename>")
def download_pdf(filename):

    file_path = os.path.join(REPORTS_DIR, filename)

    if not os.path.exists(file_path):

        return jsonify({
            "success": False,
            "error": "PDF file not found"
        }), 404

    return send_file(
        file_path,
        as_attachment=True,
        download_name=filename,
        mimetype="application/pdf"
    )

# =========================
# UPDATE TRANSACTION
# =========================

@app.route("/transaction/<int:id>", methods=["PUT"])
def update_transaction(id):

    try:

        data = request.get_json()

        quantity = int(data["quantity"])
        unit_price = float(data["unit_price"])

        if quantity <= 0:

            return jsonify({
                "success": False,
                "error": "Quantity must be greater than 0"
            }), 400

        if unit_price <= 0:

            return jsonify({
                "success": False,
                "error": "Price must be greater than 0"
            }), 400

        amount = quantity * unit_price

        cursor.execute("""
            UPDATE transactions
            SET type=%s,
                product=%s,
                quantity=%s,
                unit_price=%s,
                amount=%s,
                date=%s
            WHERE id=%s
        """, (
            data["type"],
            data["product"],
            quantity,
            round(unit_price, 2),
            round(amount, 2),
            data["date"],
            id
        ))

        db.commit()

        return jsonify({
            "success": True,
            "message": "Updated successfully"
        })

    except Exception as e:

        db.rollback()

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# =========================
# DELETE TRANSACTION
# =========================

@app.route("/transaction/<int:id>", methods=["DELETE"])
def delete_transaction(id):

    try:

        cursor.execute("""
            DELETE FROM transactions
            WHERE id=%s
        """, (id,))

        db.commit()

        return jsonify({
            "success": True,
            "message": "Deleted successfully"
        })

    except Exception as e:

        db.rollback()

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# =========================
# RUN
# =========================

if __name__ == "__main__":
    app.run(debug=True)