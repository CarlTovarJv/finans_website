import { prisma } from "@/lib/prisma";

export default async function data() {
    const [assets, liabilities] = await Promise.all([
    prisma.incomes.aggregate({ _sum: { amount: true },}),
    prisma.outflows.aggregate({ _sum: { amount: true } }),
  ]);

  const equity = (assets._sum.amount ?? 0) - (liabilities._sum.amount ?? 0);
    
    const fmt = (n: number)=>
         "$" + n.toLocaleString("en-US");

    const income = await prisma.incomes.aggregate({
        _sum:{ amount: true },
        where: { date : new Date() }

    })

    const expense = await prisma.outflows.aggregate({
        _sum: { amount: true },
        where: {date: new Date() }
    })

    const profit = (income._sum.amount ?? 0) - (expense._sum.amount ?? 0);

  return (
    <div className="text-black font-sans">
      <div className="">
            {/* Dashboard text */}
            <div className="mt-4">
                <h1 className="text-4xl font-semibold">Dashboard</h1>
            </div>

            {/* description text */}
            <div className="mt-4 text-lg">
                <h2>Here's your financial summary</h2>
            </div>

            {/* Summary blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15 mt-10">

                {/* Balance Sheet */}
                <div className="bg-slate-950 shadow-lg rounded-lg p-5">
                    <h2 className="text-white font-bold text-xs">Balance</h2>
                    <h2 className="text-white font-bold text-2xl">{fmt(equity)}</h2>
                </div>

                {/* Incomes */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="font-semibold">Incomes (today)</h2>
                    <h2 className="font-bold text-2xl">{fmt(income._sum.amount ?? 0)}</h2>
                </div>

                {/* Expenses */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="font-semibold">Expenses (today)</h2>
                    <h2 className="font-bold text-2xl">{fmt(expense._sum.amount ?? 0)}</h2>
                </div>

                {/* Profit */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="font-semibold">Profit (today)</h2>
                    <h2 className="font-bold text-2xl">{fmt(profit)}</h2>
                </div>
            
            </div>
      </div>
    </div>
  );
}