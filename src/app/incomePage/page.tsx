import IncomeForm from "./IncomeForm"
import IncomePagination from "./IncomePagination"
import IncomeTable from "./IncomeTable"

export default function IncomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] px-8 py-7">

      <div className="mx-auto max-w-[1120px]">

        <div className="mb-7">

          <h1 className="text-[42px] font-bold leading-none text-black">
            Add income
          </h1>

          <p className="mt-3 text-[14px] text-[#454545]">
            Track incomes to have a better understanding of your finances
          </p>

        </div>

        <div className="space-y-8">

          <IncomeForm />

          <section className="rounded-xl border border-[#ebebeb] bg-[#f5f5f5] p-5">

            <IncomeTable />

            <IncomePagination />

          </section>

        </div>

      </div>

    </main>
  )
}