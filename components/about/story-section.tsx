import Image from "next/image";
import PawDecoration from "@/components/paw-decoration";

export default function StorySection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
        <div className="relative">
          <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-rose-200 to-pink-200 p-6 shadow-lg">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-inner">
              <Image
                src="/luna.png"
                alt="Founder with their beloved pet"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <PawDecoration className="absolute -top-4 -right-4 rotate-12" size="w-12 h-12" />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">It Started With Luna</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            When our founder lost Luna, their beloved golden retriever of 12 years, they realized something
            devastating: thousands of Luna&apos;s photos were scattered across old phones, forgotten in cloud storage,
            and buried in camera rolls alongside random screenshots and memes.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The most precious memories of Luna&apos;s puppyhood, her favorite spots in the park, her silly sleeping
            positions, and her gentle eyes in her final days were lost in digital chaos. That&apos;s when the idea for
            MyPetLife was born.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe every pet deserves a dedicated space where their story can be told, their memories preserved,
            and their love celebrated - organized, beautiful, and eternal.
          </p>
        </div>
      </div>
    </section>
  );
} 