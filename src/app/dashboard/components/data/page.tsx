import { prisma } from "@/lib/prisma";

export default async function Data() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const [allIncomes, allOutflows, incomeGoal, expenseGoal] = await Promise.all([

    prisma.incomes.aggregate({
      _sum: { amount: true },
      where: { date: { gte: start, lte: end } },
    }),
    prisma.outflows.aggregate({
      _sum: { amount: true },
      where: { date: { gte: start, lte: end } },
    }),
    
    prisma.financial_goals.findFirst({
      where: {
        goal_type: "income",
        date: { gte: start, lte: end },
      },
    }),
    prisma.financial_goals.findFirst({
      where: {
        goal_type: "expenses",
        date: { gte: start, lte: end },
      },
    }),
  ]);

  const totalIncome  = allIncomes._sum.amount  ?? 0;
  const totalExpense = allOutflows._sum.amount ?? 0;
  const equity       = totalIncome - totalExpense;
  const profit       = totalIncome - totalExpense;

  
  const incomeTarget  = incomeGoal?.target_amount  ?? null;
  const expenseTarget = expenseGoal?.target_amount ?? null;
  const profitTarget  = incomeTarget && expenseTarget ? incomeTarget - expenseTarget : null;

  const incomePct  = incomeTarget  ? Math.min(Math.round((totalIncome  / incomeTarget)  * 100), 100) : null;
  const expensePct = expenseTarget ? Math.min(Math.round((totalExpense / expenseTarget) * 100), 100) : null;
  const profitPct  = profitTarget  ? Math.min(Math.round((profit       / profitTarget)  * 100), 100) : null;

  const fmt = (n: number) => "$" + n.toLocaleString("en-US");

  return (
    <div className="text-black font-sans">
      <div className="mt-4">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
      </div>
      <div className="mt-4 text-lg">
        <h2>Here's your financial summary</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-15 mt-10">

        {/* Equity */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="font-semibold text-xs text-gray-500">Equity</h2>
          <h2 className="font-bold text-2xl">{fmt(equity)}</h2>
        </div>

        {/* Income */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold text-xs text-gray-500">Income</h2>
          <h2 className="font-bold text-2xl">{fmt(totalIncome)}</h2>
          {incomeTarget && (
            <div className="mt-2">
              <p className={`text-xs font-medium ${totalIncome >= incomeTarget ? "text-green-500" : "text-yellow-500"}`}>
                {totalIncome >= incomeTarget
                  ? `+${fmt(totalIncome - incomeTarget)} vs goal ✓`
                  : `${fmt(incomeTarget - totalIncome)} to reach goal`}
              </p>
              <div className="mt-1 h-1 bg-gray-100 rounded-full">
                <div
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: `${incomePct}%`,
                    backgroundColor: totalIncome >= incomeTarget ? "#22c55e" : "#f59e0b",
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Goal in progress ({incomePct}%)</p>
            </div>
          )}
        </div>

        {/* Expenses */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold text-xs text-gray-500">Expenses</h2>
          <h2 className="font-bold text-2xl">{fmt(totalExpense)}</h2>
          {expenseTarget && (
            <div className="mt-2">
              <p className={`text-xs font-medium ${totalExpense > expenseTarget ? "text-red-500" : "text-green-500"}`}>
                {totalExpense > expenseTarget
                  ? `+${fmt(totalExpense - expenseTarget)} over budget`
                  : `${fmt(expenseTarget - totalExpense)} under budget`}
              </p>
              <div className="mt-1 h-1 bg-gray-100 rounded-full">
                <div
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: `${expensePct}%`,
                    backgroundColor: totalExpense > expenseTarget ? "#ef4444" : "#22c55e",
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Budget used ({expensePct}%)</p>
            </div>
          )}
        </div>

        {/* Profit */}
        <div className="bg-slate-950 shadow-lg rounded-lg p-4">
          <h2 className="font-bold text-xs text-slate-400">Profit</h2>
          <h2 className="font-bold text-2xl text-white">{fmt(profit)}</h2>
          {profitTarget && (
            <div className="mt-2">
              <div className="h-1 bg-slate-700 rounded-full">
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${profitPct}%`, backgroundColor: "#22c55e" }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Goal in progress ({profitPct}%)</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}