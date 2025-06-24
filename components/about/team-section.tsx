import Image from "next/image";

export default function TeamSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Built by Pet Parents, for Pet Parents</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our small but passionate team understands the unique joy and heartbreak that comes with loving a pet.
          We're here to help you celebrate that love.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 p-2">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Team member"
              width={120}
              height={120}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Alex Chen</h3>
          <p className="text-rose-500 mb-2">Founder & CEO</p>
          <p className="text-gray-600 text-sm">Luna's dad, Golden Retriever enthusiast</p>
        </div>

        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 p-2">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Team member"
              width={120}
              height={120}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarah Kim</h3>
          <p className="text-rose-500 mb-2">Head of Design</p>
          <p className="text-gray-600 text-sm">Mochi's mom, Cat whisperer</p>
        </div>

        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 p-2">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Team member"
              width={120}
              height={120}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Mike Rodriguez</h3>
          <p className="text-rose-500 mb-2">Lead Developer</p>
          <p className="text-gray-600 text-sm">Buddy's dad, Rescue dog advocate</p>
        </div>
      </div>
    </section>
  );
} 