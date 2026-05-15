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
        <div className="bg-white rounded-2xl shadow-md p-8 w-full  font-sans">

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">Balance Sheet</h2>

            {/* Table */}
            <div className="grid grid-cols-3 gap-2">
                {/* Headers */}
                <span className="text-base text-gray-500">Assets</span>
                <span className="text-base text-gray-500 text-center">Liabilities</span>
                <span className="text-base text-gray-500 text-right">Equity</span>

                {/* Divider */}
                <div className="col-span-3 border-t border-gray-300 my-2"></div> 

                {/* Values */}
                <span className="text-xl font-bold text-gray-900">{fmt(assets._sum.amount ?? 0)}</span>
                <span className="text-xl font-bold text-gray-900 text-center">{fmt(liabilities._sum.amount ?? 0)}</span>
                <span className="text-xl font-bold text-gray-900 text-right">{fmt(equity)}</span>
            </div>

            {/* Formula label */}
            <p className="text-base font-bold text-gray-900 mt-10">
                Equity = Assets - Liabilities
            </p>

            {/* Formula values */}
            <p className="text-base text-blue-300 mt-2 tracking-wide">
                {fmt(equity)} = {fmt(assets._sum.amount ?? 0)} - {fmt(liabilities._sum.amount ?? 0)}
            </p>

        </div>
  );
}
