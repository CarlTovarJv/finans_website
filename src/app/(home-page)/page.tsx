import Footer from "@/components/footer";
import FirstBlock from "../home-page/components/FirstBlock/page";
import SecondBlock from "../home-page/components/SecondBlock/page";
import ThirdBlock from "../home-page/components/ThirdBlock/page";
import FourthBlock from "../home-page/components/FourthBlock/page";
import FifthBlock from "../home-page/components/FifthBlock/page";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }
  return (
    <main className="w-full h-full">
      {/* Bloque 1 */}
      <FirstBlock />

      {/* Bloque 2 */}
      <SecondBlock />

      {/*Bloque 3*/}

      <ThirdBlock />

      {/*Bloque 4*/}
      <FourthBlock />

      {/*Bloque 5*/}
      <FifthBlock />

      <Footer />

    </main>
  );
}