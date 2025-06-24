"use client";

import { useState } from "react";
import Loader from "@/components/loader";
import PawDecoration from "@/components/paw-decoration";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import AboutPreviewSection from "@/components/home/about-preview-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div
        className={`min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 ${
          isLoading ? "hidden" : "block"
        }`}
      >
        {/* Decorative paws */}
        <PawDecoration className="absolute top-20 left-10 rotate-12" />
        <PawDecoration
          className="absolute top-40 right-20 -rotate-12"
          size="w-12 h-12"
        />
        <PawDecoration
          className="absolute bottom-40 left-20 rotate-45"
          size="w-12 h-12"
        />
        <PawDecoration
          className="absolute bottom-20 right-10 -rotate-45"
          size="w-12 h-12"
        />

        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* About Preview Section */}
        <AboutPreviewSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </div>
    </>
  );
}
