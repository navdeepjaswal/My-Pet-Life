import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
          Start Preserving Your Pet&apos;s Memories Today
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Join thousands of pet parents who trust MyPetLife to keep their most
          precious memories safe, organized, and beautifully displayed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            >
              <span className="block sm:hidden">Get Started Free</span>
              <span className="hidden sm:block">Get Started Free</span>
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 