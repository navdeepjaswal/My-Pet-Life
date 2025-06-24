"use client"

import { useState } from "react"
import Loader from "@/components/loader"
import PawDecoration from "@/components/paw-decoration"
import HeroSection from "@/components/contact/hero-section"
import ContactMethods from "@/components/contact/contact-methods"
import ContactForm from "@/components/contact/contact-form"
import FAQSection from "@/components/contact/faq-section"
import SupportHours from "@/components/contact/support-hours"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div
        className={`min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 ${isLoading ? "hidden" : "block"}`}
      >
        {/* Decorative paws */}
        <PawDecoration className="absolute top-20 left-10 rotate-12" />
        <PawDecoration className="absolute top-40 right-20 -rotate-12" size="w-12 h-12" />
        <PawDecoration className="absolute bottom-40 left-20 rotate-45" size="w-12 h-12" />

        {/* Hero Section */}
        <HeroSection />

        {/* Contact Methods */}
        <ContactMethods />

        {/* Contact Form */}
        <ContactForm />

        {/* FAQ Section */}
        <FAQSection />

        {/* Support Hours & Additional Info */}
        <SupportHours />
      </div>
    </>
  )
}
