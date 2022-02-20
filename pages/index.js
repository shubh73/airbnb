import Banner from "@/components/Banner";
import Cards from "@/components/LargeCards";
import Explore from "@/components/Explore";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Hosting from "@/components/Hosting";
import MediumCards from "@/components/MediumCards";
import LargeCards from "@/components/LargeCards";
import { live, discover } from "../data";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Explore />
        <Banner />
        <MediumCards {...live} />
        <LargeCards {...discover} />
        <Hosting />
      </main>
      <Footer />
    </>
  );
}
