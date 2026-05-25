import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const income = [
  {
    id: 1,
    type: "Sale",
    description: "Online product",
    amount: "$120.00",
    date: "5/21/2026",
  },
  {
    id: 2,
    type: "Salary",
    description: "Monthly salary",
    amount: "$50.00",
    date: "4/20/2026",
  },
  {
    id: 3,
    type: "Service",
    description: "- - -",
    amount: "$20.00",
    date: "7/4/2026",
  },
]

export default function IncomeTable() {
  return (
    <section className="rounded-xl border border-[#ebebeb] bg-white px-8 py-7">

      <div>

        <h2 className="text-[24px] font-bold leading-none text-black">
          Income History
        </h2>

        <p className="mt-3 text-[14px] text-[#575757]">
          History of all you added income.
        </p>

      </div>

      <div className="mt-7 overflow-x-auto">

        <Table>

          <TableHeader>

            <TableRow className="border-b border-[#ececec] hover:bg-transparent">

              <TableHead className="text-[13px] font-semibold text-[#444]">
                Type
              </TableHead>

              <TableHead className="text-[13px] font-semibold text-[#444]">
                Description
              </TableHead>

              <TableHead className="text-[13px] font-semibold text-[#444]">
                Amount
              </TableHead>

              <TableHead className="text-[13px] font-semibold text-[#444]">
                Date
              </TableHead>

              <TableHead className="w-[40px] text-center text-[13px] font-semibold text-[#444]">
                ⋮
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {income.map((item) => (
              <TableRow
                key={item.id}
                className="h-[56px] border-b border-[#ececec] hover:bg-transparent"
              >

                <TableCell className="text-[13px] font-medium text-[#3d3d3d]">
                  {item.type}
                </TableCell>

                <TableCell className="text-[13px] text-[#4d4d4d]">
                  {item.description}
                </TableCell>

                <TableCell className="text-[13px] font-semibold text-[#7bc55c]">
                  {item.amount}
                </TableCell>

                <TableCell className="text-[13px] text-[#4d4d4d]">
                  {item.date}
                </TableCell>

                <TableCell className="text-center text-[15px] text-[#8b8b8b]">
                  ⋮
                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </div>

    </section>
  )
}