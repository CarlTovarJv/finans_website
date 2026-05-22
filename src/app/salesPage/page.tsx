import SalesForm from "./SalesForm"
import SalesPagination from "./SalesPagination"
import SalesTable from "./SalesTable"

export default function SalesPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f6] px-4 py-6 md:px-8">
      <section className="mx-auto max-w-6xl space-y-8">

        <div>
          <h1 className="text-[28px] font-bold text-black">
            Add Sales
          </h1>

          <p className="mt-1 text-sm font-medium text-gray-700">
            Record a new sale and keep track of your business.
          </p>
        </div>

        <SalesForm />

        <SalesTable />

        <SalesPagination />

      </section>
    </main>
  )
}