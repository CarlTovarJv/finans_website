import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function IncomeForm() {
  return (
    <section className="rounded-xl border border-[#ebebeb] bg-[#f5f5f5] p-5">

      <div className="rounded-xl border border-[#ebebeb] bg-white px-8 py-7">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.15fr_1fr_1fr_1.2fr]">

          <div>

            <label className="mb-2 block text-[12px] font-semibold text-[#444444]">
              Product type
            </label>

            <select
              className="
                h-[36px]
                w-full
                rounded-[5px]
                border
                border-[#dcdcdc]
                bg-white
                px-3
                text-[12px]
                text-[#444444]
                shadow-sm
                outline-none
                transition-all
                focus:border-[#cfcfcf]
                focus:ring-2
                focus:ring-[#e7e7e7]
              "
            >
              <option>Sale</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-[12px] font-semibold text-[#444444]">
              Amount received
            </label>

            <div
              className="
                flex
                h-[36px]
                items-center
                overflow-hidden
                rounded-[5px]
                border
                border-[#dcdcdc]
                bg-white
                shadow-sm
                transition-all
                focus-within:border-[#cfcfcf]
                focus-within:ring-2
                focus-within:ring-[#e7e7e7]
              "
            >

              <div className="flex h-full w-9 items-center justify-center border-r border-[#dcdcdc] text-[12px] text-black">
                $
              </div>

              <Input
                placeholder="0.00"
                className="
                  h-full
                  border-0
                  bg-transparent
                  px-3
                  text-[12px]
                  shadow-none
                  outline-none
                  focus-visible:ring-0
                  placeholder:text-[#bdbdbd]
                "
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-[12px] font-semibold text-[#444444]">
              Date received
            </label>

            <Input
              type="date"
              className="
                h-[36px]
                border-[#dcdcdc]
                bg-white
                px-3
                text-[12px]
                shadow-sm
                outline-none
                transition-all
                focus-visible:border-[#cfcfcf]
                focus-visible:ring-2
                focus-visible:ring-[#e7e7e7]
              "
            />

          </div>

          <div>

            <label className="mb-2 block text-[12px] font-semibold text-[#444444]">
              Description
            </label>

            <Input
              className="
                h-[36px]
                border-[#dcdcdc]
                bg-white
                px-3
                text-[12px]
                shadow-sm
                outline-none
                transition-all
                focus-visible:border-[#cfcfcf]
                focus-visible:ring-2
                focus-visible:ring-[#e7e7e7]
              "
            />

          </div>

        </div>

        <div className="mt-6 flex justify-end">

          <Button
            className="
              h-[30px]
              rounded-[7px]
              bg-[#010221]
              px-5
              text-[10px]
              font-semibold
              text-white
              shadow-none
              transition-none
              hover:bg-[#010221]
            "
          >
            Add income +
          </Button>

        </div>

      </div>

    </section>
  )
}