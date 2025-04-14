import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/Hero";

export default function Home() {
  return (
   <div>
    <Header/>
    <HeroSection/>
    <Footer/>
   </div>
  );
}
