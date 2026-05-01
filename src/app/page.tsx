import LoadingScreen from "@/components/sections/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import BlackHoleWrapper from "@/components/sections/BlackHoleWrapper";
import WelcomeSection from "@/components/sections/WelcomeSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import StatsSection from "@/components/sections/StatsSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
      {/* Entry loading screen */}
      <LoadingScreen />

      {/* Navigation */}
      <Navbar />

      {/* Hero — Three.js universe + 3D IMMERSE + floating chars */}
      <HeroSection />

      {/* Black hole scroll transition — flies user through to the other side */}
      <BlackHoleWrapper />

      {/* Welcome — appears after black hole */}
      <WelcomeSection />

      {/* How It Works */}
      <section id="how-it-works">
        <HowItWorksSection />
      </section>

      {/* Features bento grid */}
      <FeaturesSection />

      {/* Social proof stats */}
      <StatsSection />

      {/* Pricing */}
      <PricingSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
