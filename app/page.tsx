import Footer from "@/components/footer";
import Header from "@/components/header";
import Content from "@/components/content";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default function Home() {
  return (
    <main className="flex flex-col justify-between px-4 lg:px-0 lg:h-screen mx-auto lg:w-2/3">
      <Header />
      <Suspense fallback={<Loading />}>
        <Content />
      </Suspense>
      <Footer />
    </main>
  );
}
