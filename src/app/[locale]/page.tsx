"use client"

import CallToAction from "@/components/CallToAction";
import Companies from "@/components/Companies";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ProsToUseSection from "@/components/ProsToUseSection";
import Stadisctics from "@/components/Stadisctics";
import Testiomonial from "@/components/Testiomonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Companies />
      <ProsToUseSection />
      <Stadisctics />
      <Testiomonial />
      <CallToAction />
      <Footer />
    </>
  );
}
