"use client"

import { useState } from "react"
import Loader from "@/components/loader"
import PawDecoration from "@/components/paw-decoration"
import HeroSection from "@/components/about/hero-section"
import StorySection from "@/components/about/story-section"
import MissionSection from "@/components/about/mission-section"
import TeamSection from "@/components/about/team-section"

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div
        className={`min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 ${isLoading ? "hidden" : "block"}`}
      >
        {/* Decorative paws */}
        <PawDecoration className="absolute top-20 left-10 rotate-12" />
        <PawDecoration className="absolute top-40 right-20 -rotate-12" size="w-12 h12" />
        <PawDecoration className="absolute bottom-40 left-20 rotate-45" size="w-12 h-12" />

        {/* Hero Section */}
        <HeroSection />

        {/* Story Section */}
        <StorySection />

        {/* Mission Section */}
        <MissionSection />

        {/* Team Section */}
        <TeamSection />
      </div>
    </>
  )
}
