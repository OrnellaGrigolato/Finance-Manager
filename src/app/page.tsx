import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Companies from "../components/Companies";
import ProsToUseSection from "../components/ProsToUseSection";
import Stadisctics from "../components/Stadisctics";
import Testiomonial from "../components/Testiomonial";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

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
