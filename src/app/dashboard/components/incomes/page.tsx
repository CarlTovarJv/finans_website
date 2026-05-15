// sin "use client"
import { prisma } from "@/lib/prisma";
import { IncomesChart } from "./IncomesChart";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default async function Incomes() {
  const year = new Date().getFullYear();

  // Trae todos los inflows de este año
  const inflows = await prisma.incomes.findMany({
    where: {
      date: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
    },
    select: { amount: true, date: true },
  });

  // Agrupa por mes
  const data = MONTHS.map((month, i) => ({
    month,
    income: inflows
      .filter((r) => new Date(r.date).getMonth() === i)
      .reduce((sum, r) => sum + (r.amount ?? 0), 0),
  }));

  return <IncomesChart data={data} />;
}