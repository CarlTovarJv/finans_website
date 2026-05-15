import Navbar from "@/components/navbar/navbar";
import Pricing from "@/components/pricing/pricing-table";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tight text-zinc-900">
            Finans Pricing
          </h1>

          <p className="text-zinc-600 text-lg mt-4">
            Simple and scalable pricing for your business.
          </p>
        </div>

        <div className="w-full">
          <Pricing />
        </div>
      </section>
    </main>
  );
}