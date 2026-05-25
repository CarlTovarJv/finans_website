export default function IncomePagination() {
  return (
    <div className="mt-7 flex items-center justify-center gap-5">

      <button className="text-[22px] text-[#4b4b4b]">
        ‹
      </button>

      <div className="flex items-center gap-4">

        <button className="flex h-8 w-8 items-center justify-center rounded-md bg-[#dbe6ff] text-[13px] font-medium text-[#4163a9]">
          1
        </button>

        <button className="text-[13px] font-medium text-[#4b4b4b]">
          2
        </button>

      </div>

      <button className="text-[22px] text-[#4b4b4b]">
        ›
      </button>

      <button className="ml-14 rounded-md bg-[#dbe6ff] px-4 py-2 text-[12px] font-semibold text-[#294b8e]">
        See more
      </button>

    </div>
  )
}