import { CostSection } from "./(components)/sections/CostSection";
import { Header } from "./components/Header";
import { VideoCarousel } from "./components/VideoCarousel";
import { ProductsSection } from "@/components/products/ProductsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { ReframeSection } from "@/components/sections/ReframeSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main id="topo" className="page-shell">
        <Header />

        <section className="hero-section" aria-label="Studio Office">
          <VideoCarousel />
        </section>

        <CostSection />
        <ReframeSection />
        <ProductsSection />
        <ComparisonSection />
        <AboutSection />
        <ProofSection />
        <LocationSection />
        <ReviewsSection />
        <LeadFormSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
