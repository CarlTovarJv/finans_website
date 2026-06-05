"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Receipt,
} from "lucide-react";

export default function ReportsPage() {

  const [selectedReport, setSelectedReport] = useState("");

  const [step, setStep] =
    useState<"idle" | "calendar" | "loading" | "done">("idle");

  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const API = "http://localhost:5000";

  const [files, setFiles] = useState({
    pdf: "",
    excel: "",
  });

  function formatDate(d?: Date) {
    if (!d) return "";
    return format(d, "yyyy-MM-dd");
  }

  // =========================
  // GENERATE REPORT
  // =========================
  async function generateReport() {

    if (!date.from || !date.to || !selectedReport) return;

    setStep("loading");

    try {

      const res = await fetch(`${API}/generate_report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          report_type: selectedReport,
          start_date: formatDate(date.from),
          end_date: formatDate(date.to),
        }),
      });

      if (!res.ok) throw new Error("Error generating report");

      const data = await res.json();

      // 👇 backend debe devolver links o base64
      setFiles({
        pdf: data.pdf,
        excel: data.excel,
      });

      setStep("done");

    } catch (err) {
      console.log(err);
      setStep("idle");
    }
  }

  const reports = [
    {
      name: "Incomes",
      value: "incomes",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      name: "Sales",
      value: "sales",
      icon: ShoppingCart,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      name: "Profit",
      value: "profit",
      icon: TrendingUp,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      name: "Expenses",
      value: "expenses",
      icon: Receipt,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F4F5F7] flex flex-col items-center p-6 md:p-10">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-[#010221]">
          Report Center
        </h1>
      </div>

      {/* ================= IDLE ================= */}
      {step === "idle" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">

          {reports.map((r) => {
            const Icon = r.icon;

            return (
              <button
                key={r.value}
                onClick={() => {
                  setSelectedReport(r.value);
                  setStep("calendar");
                }}
                className="bg-white rounded-3xl p-6 md:p-8 border hover:shadow-xl transition text-left"
              >
                <div className="flex items-center gap-4">

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${r.bg}`}>
                    <Icon className={r.color} />
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#010221]">
                      {r.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Select report
                    </p>
                  </div>

                </div>
              </button>
            );
          })}

        </div>
      )}

      {/* ================= CALENDAR FIX ================= */}
      {step === "calendar" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2">

          <div className="bg-white rounded-3xl p-6 w-full max-w-3xl shadow-2xl">

            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Select date range
            </h2>

            {/* 🔥 FIX IMPORTANTE: scroll horizontal */}
            <div className="overflow-x-auto flex justify-center">

              <div className="border rounded-2xl p-4 overflow-auto">

                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className="mx-auto"
                />

              </div>

            </div>

            {date.from && date.to && (
              <p className="text-sm text-gray-600 mt-3">
                From <b>{format(date.from, "PPP")}</b> to{" "}
                <b>{format(date.to, "PPP")}</b>
              </p>
            )}

            <div className="flex gap-3 mt-5">

              <Button
                className="flex-1 bg-gray-200 text-black"
                onClick={() => setStep("idle")}
              >
                Cancel
              </Button>

              <Button
                className="flex-1 bg-[#010221] text-white"
                onClick={generateReport}
                disabled={!date.from || !date.to}
              >
                Create
              </Button>

            </div>

          </div>

        </div>
      )}

      {/* ================= LOADING ================= */}
      {step === "loading" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-3xl">
            <div className="w-12 h-12 border-4 border-[#010221] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-center">Generating...</p>
          </div>
        </div>
      )}

      {/* ================= DONE (PDF + EXCEL FIX) ================= */}
      {step === "done" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">

          <div className="bg-white p-6 rounded-3xl w-full max-w-sm text-center">

            <h2 className="text-xl font-bold mb-4">
              Report ready
            </h2>

            {/* PDF */}
            <a
              href={files.pdf}
              download
              className="block bg-[#010221] text-white py-3 rounded-xl mb-3"
            >
              Download PDF
            </a>

            {/* EXCEL */}
            <a
              href={files.excel}
              download
              className="block bg-gray-200 py-3 rounded-xl"
            >
              Download Excel
            </a>

            <Button
              className="w-full mt-4"
              onClick={() => setStep("idle")}
            >
              Close
            </Button>

          </div>

        </div>
      )}

    </main>
  );
}