import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Mission from "@/components/Mission";
import ImageCarousel from "@/components/ImageCarousel";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Mission />
      <ImageCarousel />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;