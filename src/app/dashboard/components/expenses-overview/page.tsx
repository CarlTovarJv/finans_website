import { prisma } from "@/lib/prisma";
import { ExpensesChart } from "./ExpensesChart"; 

export default async function ExpensesOverview() {
  const [ingredients, fee, rent] = await Promise.all([
    prisma.outflows.aggregate({ _sum: { amount: true }, where: { outflow_type: "Ingredients" } }),
    prisma.outflows.aggregate({ _sum: { amount: true }, where: { outflow_type: "Fee" } }),
    prisma.outflows.aggregate({ _sum: { amount: true }, where: { outflow_type: "Rent" } }),
  ]);

  const data = [
    { category: "Ingredients", amount: ingredients._sum.amount ?? 0 },
    { category: "Fee",         amount: fee._sum.amount ?? 0 },
    { category: "Rent",        amount: rent._sum.amount ?? 0 },
  ];

  return <ExpensesChart data={data} />; 
}