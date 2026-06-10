import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const sales = [
  {
    id: 1,
    product: "Tamales",
    quantity: 50,
    price: "$12.50",
    date: "5/21/2026",
  },
  {
    id: 2,
    product: "Atoles",
    quantity: 25,
    price: "$12.00",
    date: "4/20/2026",
  },
  {
    id: 3,
    product: "Enchiladas",
    quantity: 21,
    price: "$7.35",
    date: "7/4/2026",
  },
]

export default function SalesTable() {
  return (
    <Card className="rounded-xl border border-[#ebebeb] bg-white shadow-none outline-none ring-0">

      <CardContent className="p-8">

        <div>

          <h2 className="text-[22px] font-semibold text-black">
            Sales History
          </h2>

          <p className="mt-2 text-sm text-[#5f5f5f]">
            All your recorded sales.
          </p>

        </div>

        <div className="mt-8 overflow-x-auto">

          <Table>

            <TableHeader>

              <TableRow className="border-b border-[#ededed] hover:bg-transparent">

                <TableHead className="h-14 text-sm font-semibold text-black">
                  Product
                </TableHead>

                <TableHead className="text-sm font-semibold text-black">
                  Quantity
                </TableHead>

                <TableHead className="text-sm font-semibold text-black">
                  Unit Price
                </TableHead>

                <TableHead className="text-sm font-semibold text-black">
                  Date
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {sales.map((sale) => (
                <TableRow
                  key={sale.id}
                  className="h-16 border-b border-[#ededed] hover:bg-transparent"
                >

                  <TableCell className="text-sm font-medium text-black">
                    {sale.product}
                  </TableCell>

                  <TableCell className="text-sm text-black">
                    {sale.quantity}
                  </TableCell>

                  <TableCell className="text-sm font-semibold text-[#4b4dbb]">
                    {sale.price}
                  </TableCell>

                  <TableCell className="text-sm text-black">
                    {sale.date}
                  </TableCell>

                  <TableCell className="text-center text-lg text-[#8c8c8c]">
                    ⋮
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        </div>

      </CardContent>

    </Card>
  )
}