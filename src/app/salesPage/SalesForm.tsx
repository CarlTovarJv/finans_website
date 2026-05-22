import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SalesForm() {
  return (
    <section className="rounded-xl border border-[#ebebeb] bg-[#f5f5f5] p-5">

      <div className="rounded-xl border border-[#ebebeb] bg-white p-6">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

          <div>

            <label
              htmlFor="product"
              className="mb-2 block text-sm font-medium text-black"
            >
              Product
            </label>

            <Input
              id="product"
              placeholder="Enter product"
              className="h-10 border-[#dcdcdc] text-sm shadow-sm outline-none transition focus-visible:border-[#c9d2e3] focus-visible:ring-2 focus-visible:ring-[#d9e3f5] placeholder:text-[#bdbdbd]"
            />

          </div>

          <div>

            <label
              htmlFor="quantity"
              className="mb-2 block text-sm font-medium text-black"
            >
              Quantity
            </label>

            <Input
              id="quantity"
              placeholder="Enter quantity"
              className="h-10 border-[#dcdcdc] text-sm shadow-sm outline-none transition focus-visible:border-[#c9d2e3] focus-visible:ring-2 focus-visible:ring-[#d9e3f5] placeholder:text-[#bdbdbd]"
            />

          </div>

          <div>

            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-black"
            >
              Unit Price
            </label>

            <div className="flex h-10 items-center overflow-hidden rounded-md border border-[#dcdcdc] shadow-sm transition focus-within:border-[#c9d2e3] focus-within:ring-2 focus-within:ring-[#d9e3f5]">

              <div className="flex h-full w-10 items-center justify-center border-r border-[#dcdcdc] text-sm text-black">
                $
              </div>

              <Input
                id="price"
                placeholder="0.00"
                className="h-full border-0 text-sm shadow-none outline-none focus-visible:ring-0 placeholder:text-[#bdbdbd]"
              />

            </div>

          </div>

          <div>

            <label
              htmlFor="date"
              className="mb-2 block text-sm font-medium text-black"
            >
              Date
            </label>

            <Input
              id="date"
              type="date"
              className="h-10 border-[#dcdcdc] text-sm shadow-sm outline-none transition focus-visible:border-[#c9d2e3] focus-visible:ring-2 focus-visible:ring-[#d9e3f5]"
            />

          </div>

        </div>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div className="w-full max-w-[240px]">

            <label
              htmlFor="notes"
              className="mb-2 block text-sm font-medium text-black"
            >
              Notes
            </label>

            <Input
              id="notes"
              placeholder="Add note about this sale"
              className="h-10 border-[#dcdcdc] text-sm shadow-sm outline-none transition focus-visible:border-[#c9d2e3] focus-visible:ring-2 focus-visible:ring-[#d9e3f5] placeholder:text-[#bdbdbd]"
            />

          </div>

          <Button className="h-[42px] min-w-[145px] rounded-[10px] bg-[#010221] px-4 text-sm font-medium text-white shadow-none hover:bg-[#03042e]">
            Add Sale +
          </Button>

        </div>

      </div>

    </section>
  )
}