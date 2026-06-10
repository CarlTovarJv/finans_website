import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

export default function SalesPagination() {
  return (
    <section className="flex items-center justify-center gap-6 pb-4">

      <button className="text-3xl font-light text-black">
        ‹
      </button>

      <Pagination className="mx-0 w-auto">

        <PaginationContent className="gap-4">

          <PaginationItem>

            <PaginationLink
              href="#"
              isActive
              className="h-10 w-10 rounded-md border border-[#cfd7ff] bg-[#dfe6ff] text-base font-semibold text-black shadow-none"
            >
              1
            </PaginationLink>

          </PaginationItem>

          <PaginationItem>

            <PaginationLink
              href="#"
              className="border-none bg-transparent text-base font-semibold text-black shadow-none hover:bg-transparent"
            >
              2
            </PaginationLink>

          </PaginationItem>

        </PaginationContent>

      </Pagination>

      <button className="text-3xl font-light text-black">
        ›
      </button>

    </section>
  )
}