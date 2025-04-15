import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FAQSection from "../components/FAQSection";

export default function Home() {
  return (
   <div>
    <Header/>
    <HeroSection/>
    <HowItWorks/>
    <FAQSection/>
    <Footer/>
   </div>
  );
}
