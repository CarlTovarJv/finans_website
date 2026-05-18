# services/pdf_service.py

from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Spacer,
    Paragraph
)

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter


def generate_pdf(data, filename):

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(
        filename,
        pagesize=letter
    )

    elements = []

    title = Paragraph(
        "Financial Report",
        styles["Title"]
    )

    elements.append(title)

    elements.append(
        Spacer(1, 20)
    )

    table_data = [[

        "Type",
        "Product",
        "Quantity",
        "Unit Price",
        "Amount",
        "Date"

    ]]

    total = 0

    for item in data:

        amount = float(
            item.get("amount", 0)
        )

        total += amount

        table_data.append([

            str(
                item.get("type", "")
            ),

            str(
                item.get("product", "")
            ),

            str(
                item.get("quantity", 0)
            ),

            f"${float(item.get('unit_price', 0)):,.2f}",

            f"${amount:,.2f}",

            str(
                item.get("date", "")
            )

        ])

    table_data.append([

        "",
        "",
        "",
        "TOTAL",
        f"${total:,.2f}",
        ""

    ])

    table = Table(table_data)

    table.setStyle(

        TableStyle([

            (
                "BACKGROUND",
                (0, 0),
                (-1, 0),
                colors.HexColor("#010221")
            ),

            (
                "TEXTCOLOR",
                (0, 0),
                (-1, 0),
                colors.white
            ),

            (
                "GRID",
                (0, 0),
                (-1, -1),
                1,
                colors.black
            ),

            (
                "FONTNAME",
                (0, 0),
                (-1, 0),
                "Helvetica-Bold"
            ),

            (
                "BACKGROUND",
                (0, 1),
                (-1, -1),
                colors.white
            )

        ])

    )

    elements.append(table)

    doc.build(elements)

    print("PDF CREATED:", filename)