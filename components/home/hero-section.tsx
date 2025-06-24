import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PawDecoration from "@/components/paw-decoration";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <div className="relative mb-12">
          <div className="relative overflow-visible h-full w-full max-w-[500px] aspect-square mx-auto rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 p-4 shadow-lg">
            <div className="absolute -top-8 -left-8 -right-8 -bottom-8">
              <Image
                src="/pup.png"
                alt="Happy pet memories"
                fill
                className="object-contain w-full h-full drop-shadow-xl"
              />
            </div>
          </div>

          <PawDecoration
            className="absolute -top-4 -left-4 rotate-12"
            size="w-12 h-12"
          />
          <PawDecoration
            className="absolute -bottom-4 -right-4 -rotate-12"
            size="w-12 h-12"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Preserve Your Pet's{" "}
          <span className="text-rose-500">Precious Memories</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          No more lost photos scattered in your gallery. Create a beautiful,
          organized space to cherish every moment with your beloved
          companion - from playful puppyhood to golden years and beyond.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 py-3 text-lg"
            >
              Start Preserving Memories
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full px-8 py-3 text-lg"
            >
              Learn Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 