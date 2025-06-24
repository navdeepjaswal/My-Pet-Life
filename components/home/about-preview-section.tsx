import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPreviewSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-400 rounded-3xl p-[6px] aspect-square">
            <Image
              src="/happy-dog.png"
              alt="Happy dog"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="bg-[#3db3ea] rounded-3xl p-[6px] aspect-square">
            <Image
              src="/cute-cat.png"
              alt="Cute cat"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="bg-[#ffd4b3] rounded-3xl p-[6px] aspect-square">
            <Image
              src="/adult-happy-dog.png"
              alt="Playful kitten"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="bg-[#f1cbe9] rounded-3xl p-[6px] aspect-square">
            <Image
              src="/adult-cute-cat.png"
              alt="Beloved pet"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            About MyPetLife
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Born from personal experience of losing precious pet photos in
            cluttered phone galleries, MyPetLife was created to give every
            pet parent a dedicated, beautiful space to preserve their most
            treasured memories.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We believe every pet deserves to be remembered, celebrated, and
            honored. Whether they're still by your side or living on in your
            heart, their story matters.
          </p>
          <Link href="/about">
            <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-6">
              Read Our Full Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 