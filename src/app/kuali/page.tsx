"use client";

import { useState } from "react";
import Image from "next/image";

export default function KualiPage() {

    const [message, setMessage] = useState("");
    const [result, setResult] = useState<any>(null);

    // =========================
    // EDIT STATES
    // =========================

    const [editingItem, setEditingItem] = useState<any>(null);

    const [editType, setEditType] = useState("");
    const [editProduct, setEditProduct] = useState("");
    const [editQuantity, setEditQuantity] = useState<any>(1);
    const [editPrice, setEditPrice] = useState<any>("");

    // =========================
    // DOWNLOAD STATES
    // =========================

    const [excelUrl, setExcelUrl] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");

    const API = "http://127.0.0.1:5000";

    // =========================
    // AUTO DETECT
    // =========================

    async function handleSend() {

        const text = message.toLowerCase();

        if (
            text.includes("report")
        ) {
            await generateReport();
        } else {
            await processTransaction();
        }
    }

    // =========================
    // PROCESS TRANSACTION
    // =========================

    async function processTransaction() {

        try {

            const response = await fetch(`${API}/ia`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mensaje: message
                })
            });

            const data = await response.json();

            if (!data.success) {
                alert(data.error);
                return;
            }

            setResult(data);

        } catch (error) {

            console.log(error);
            alert("Connection error");
        }
    }

    // =========================
    // GENERATE REPORT
    // =========================

    async function generateReport() {

        try {

            const response = await fetch(`${API}/report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mensaje: message
                })
            });

            const data = await response.json();

            if (!data.success) {
                alert(data.error || "Error generating report");
                return;
            }

            setResult({
                transactions: data.transactions
            });

            setExcelUrl(data.excel || "");
            setPdfUrl(data.pdf || "");

        } catch (error) {

            console.log(error);
            alert("Connection error");
        }
    }

    // =========================
    // DOWNLOAD FILE
    // =========================

    async function downloadFile(url: string, filename: string) {

        try {

            const response = await fetch(url);

            const blob = await response.blob();

            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = blobUrl;
            link.download = filename;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);

        } catch (err) {

            console.log("Download error:", err);
        }
    }

    // =========================
    // DELETE TRANSACTION
    // =========================

    async function deleteTransaction(id: number) {

        try {

            const res = await fetch(`${API}/transaction/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (!data.success) {
                alert(data.error);
                return;
            }

            setResult((prev: any) => ({
                ...prev,
                transactions: prev.transactions.filter(
                    (t: any) => t.id !== id
                )
            }));

        } catch (err) {

            console.log(err);
        }
    }

    // =========================
    // OPEN EDIT MODAL
    // =========================

    function editTransaction(item: any) {

        setEditingItem(item);

        setEditType(item.type);
        setEditProduct(item.product);
        setEditQuantity(item.quantity);
        setEditPrice(item.unit_price);
    }

    // =========================
    // SAVE EDIT
    // =========================

    async function saveEdit() {

        if (!editingItem) return;

        if (Number(editQuantity) <= 0) {
            alert("Quantity must be greater than 0");
            return;
        }

        if (Number(editPrice) <= 0) {
            alert("Price must be greater than 0");
            return;
        }

        const updatedAmount =
            Number(editQuantity) * Number(editPrice);

        try {

            const res = await fetch(
                `${API}/transaction/${editingItem.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        type: editType,
                        product: editProduct,
                        quantity: Number(editQuantity),
                        unit_price: Number(editPrice),
                        amount: updatedAmount,
                        date: editingItem.date
                    })
                }
            );

            const data = await res.json();

            if (!data.success) {
                alert(data.error);
                return;
            }

            setResult((prev: any) => ({
                ...prev,
                transactions: prev.transactions.map((t: any) =>
                    t.id === editingItem.id
                        ? {
                            ...t,
                            type: editType,
                            product: editProduct,
                            quantity: Number(editQuantity),
                            unit_price: Number(editPrice),
                            amount: updatedAmount
                        }
                        : t
                )
            }));

            setEditingItem(null);

        } catch (err) {

            console.log(err);
        }
    }

    // =========================
    // UI
    // =========================

    return (

        <main className="min-h-screen bg-[#D9D9D9] p-6 text-[#101010]">

            <div className="max-w-[1440px] mx-auto">

                {/* HEADER */}

                <div className="mb-12 flex items-center gap-6 flex-wrap">

                    {/* LOGO */}

                    <div className="w-24 h-24 bg-[#FAFAFA] rounded-3xl border border-[#C2C4FF] flex items-center justify-center shadow-xl overflow-hidden">

                        <Image
                            src="/ialog.png"
                            alt="Kuali Logo"
                            width={80}
                            height={80}
                            style={{
                                width: "auto",
                                height: "auto"
                            }}
                            className="object-contain"
                        />

                    </div>

                    <div>

                        <div className="inline-block px-5 py-2 rounded-full bg-[#C2C4FF] text-[#010221] font-semibold">
                            Kuali AI Finance
                        </div>

                        <h1 className="text-5xl font-black mt-4 text-[#010221]">
                            Financial Intelligence
                        </h1>

                        <p className="text-lg mt-3 text-[#101010] max-w-3xl">
                            Manage purchases, sales, and generate professional
                            financial reports with artificial intelligence.
                        </p>

                    </div>

                </div>

                {/* GRID */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT PANEL */}

                    <div className="lg:col-span-2 bg-[#FAFAFA] rounded-[30px] p-8 shadow-xl border border-[#C2C4FF]">

                        <h2 className="text-3xl font-bold text-[#010221] mb-6">
                            Financial Assistant
                        </h2>

                        {/* TEXTAREA + SEND BUTTON */}

                        <div className="relative">

                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Example: Sold 3 laptops for $2400 on 2026-05-12"
                                className="w-full h-52 rounded-[24px] border border-[#C2C4FF] bg-[#FAFAFA] p-6 pr-24 text-lg outline-none resize-none"
                            />

                            {/* SEND IMAGE BUTTON */}

                            <button
                                onClick={handleSend}
                                className="absolute bottom-5 right-5 w-14 h-14 bg-[#010221] rounded-2xl flex items-center justify-center hover:scale-105 transition"
                            >

                                <Image
                                    src="/send.png"
                                    alt="Send"
                                    width={28}
                                    height={28}
                                    style={{
                                        width: "auto",
                                        height: "auto"
                                    }}
                                />

                            </button>

                        </div>

                        {/* RESULTS */}

                        {result?.transactions && (

                            <div className="mt-12">

                                <h2 className="text-3xl font-bold text-[#010221] mb-8">
                                    Transactions
                                </h2>

                                <div className="grid gap-6">

                                    {result.transactions.map((item: any, index: number) => (

                                        <div
                                            key={index}
                                            className="bg-[#FAFAFA] border border-[#C2C4FF] rounded-[24px] p-6"
                                        >

                                            <div className="grid grid-cols-2 gap-5">

                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Type
                                                    </p>

                                                    <h3 className="text-xl font-bold capitalize">
                                                        {item.type}
                                                    </h3>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Product
                                                    </p>

                                                    <h3 className="text-xl font-bold">
                                                        {item.product}
                                                    </h3>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Quantity
                                                    </p>

                                                    <h3 className="text-xl font-bold">
                                                        {item.quantity}
                                                    </h3>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Unit Price
                                                    </p>

                                                    <h3 className="text-xl font-bold">
                                                        $
                                                        {Number(
                                                            item.unit_price
                                                        ).toLocaleString(
                                                            undefined,
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            }
                                                        )}
                                                    </h3>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Amount
                                                    </p>

                                                    <h3 className="text-2xl font-black text-[#010221]">
                                                        $
                                                        {Number(
                                                            item.amount
                                                        ).toLocaleString(
                                                            undefined,
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            }
                                                        )}
                                                    </h3>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Date
                                                    </p>

                                                    <h3 className="text-xl font-bold">
                                                        {item.date}
                                                    </h3>
                                                </div>

                                            </div>

                                            {/* ACTION BUTTONS */}

                                            <div className="grid grid-cols-2 gap-4 mt-6">

                                                <button
                                                    onClick={() =>
                                                        editTransaction(item)
                                                    }
                                                    className="h-14 bg-[#010221] text-white rounded-xl font-semibold"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteTransaction(item.id)
                                                    }
                                                    className="h-14 bg-[#C2C4FF] text-[#010221] rounded-xl font-semibold"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                                {/* DOWNLOAD BUTTONS */}

                                {(excelUrl || pdfUrl) && (

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

                                        {excelUrl && (

                                            <button
                                                onClick={() =>
                                                    downloadFile(
                                                        excelUrl,
                                                        "report.xlsx"
                                                    )
                                                }
                                                className="h-16 bg-[#010221] text-white rounded-2xl font-bold text-lg"
                                            >
                                                Download Excel
                                            </button>

                                        )}

                                        {pdfUrl && (

                                            <button
                                                onClick={() =>
                                                    downloadFile(
                                                        pdfUrl,
                                                        "report.pdf"
                                                    )
                                                }
                                                className="h-16 bg-[#C2C4FF] text-[#010221] rounded-2xl font-bold text-lg"
                                            >
                                                Download PDF
                                            </button>

                                        )}

                                    </div>

                                )}

                            </div>
                        )}

                    </div>

                    {/* RIGHT PANEL */}

                    <div className="bg-[#FAFAFA] rounded-[30px] p-8 shadow-xl border border-[#C2C4FF] sticky top-8">

                        <h2 className="text-3xl font-bold text-[#010221] mb-8">
                            Quick Actions
                        </h2>

                        <div className="flex flex-col gap-5">

                            <button
                                onClick={() =>
                                    setMessage(
                                        "Sold 3 laptops for $2400 on 2026-05-12"
                                    )
                                }
                                className="h-16 bg-[#010221] text-white rounded-2xl font-semibold"
                            >
                                Sale
                            </button>

                            <button
                                onClick={() =>
                                    setMessage(
                                        "Bought 5 RAM memories for $300 on 2026-05-12"
                                    )
                                }
                                className="h-16 bg-[#C2C4FF] text-[#010221] rounded-2xl font-semibold"
                            >
                                Purchase
                            </button>

                            <button
                                onClick={() =>
                                    setMessage(
                                        "Sales report"
                                    )
                                }
                                className="h-16 bg-[#101010] text-white rounded-2xl font-semibold"
                            >
                                Report
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}