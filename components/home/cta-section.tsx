import Link from "next/link";
import { Button } from "@/components/ui/button";
import PawDecoration from "@/components/paw-decoration";

export default function CTASection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto relative overflow-hidden">
        <PawDecoration
          className="absolute top-4 left-4 text-white/20"
          size="w-16 h-16"
        />
        <PawDecoration
          className="absolute bottom-4 right-4 text-white/20"
          size="w-12 h-12"
        />

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Preserving Memories Today
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of pet parents who trust MyPetLife with their most
          precious memories.
        </p>
        <Link href="/signup">
          <Button
            size="lg"
            className="bg-white text-rose-500 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold"
          >
            Create Your Pet&apos;s Story
          </Button>
        </Link>
      </div>
    </section>
  );
} 