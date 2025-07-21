import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MiddleSections from "@/components/MiddleSection";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";


export default function Home() {
  return (
    <div>
    <HeroSection />
    <MiddleSections />
    <Footer />
    </div>
  );
}