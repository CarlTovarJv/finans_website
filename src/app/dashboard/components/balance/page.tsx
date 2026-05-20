import {prisma} from "@/lib/prisma";

export default async function balance() {
  const [assets, liabilities] = await Promise.all([
    prisma.incomes.aggregate({ _sum: { amount: true },}),
    prisma.outflows.aggregate({ _sum: { amount: true } }),
  ]);

  const equity = (assets._sum.amount ?? 0) - (liabilities._sum.amount ?? 0);

  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US");

  return (
        <div className="bg-white rounded-2xl shadow-md p-6 w-full h-full font-sans">

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-10">Balance Sheet</h2>

            {/* Table */}
            <div className="grid grid-cols-3 gap-4">
                {/* Headers */}
                <span className="text-base text-gray-500">Assets</span>
                <span className="text-base text-gray-500 text-center">Liabilities</span>
                <span className="text-base text-gray-500 text-right">Equity</span>

                {/* Divider */}
                <div className="col-span-3 border-t border-gray-300 my-2"></div> 

                {/* Values */}
                <span className="text-xl font-bold text-taupe-900 underline underline-offset-4 decoration-green-500">{fmt(assets._sum.amount ?? 0)}</span>
                <span className="text-xl font-bold text-taupe-900 text-center underline underline-offset-4 decoration-amber-500">{fmt(liabilities._sum.amount ?? 0)}</span>
                <span className="text-xl font-bold text-taupe-900 text-right underline underline-offset-4 decoration-sky-500">{fmt(equity)}</span>
            </div>

            {/* Formula label */}
            <p className="text-base font-bold text-gray-900 mt-10">
                Assets - Liabilities = Equity
            </p>

            

        </div>
  );
}
