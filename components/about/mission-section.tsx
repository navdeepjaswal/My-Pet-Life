import { Heart, Camera, Users, Shield } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="container mx-auto px-4 py-16 ">
      <div className="bg-white/70 backdrop-blur-sm border border-rose-100 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-12 text-center text-white max-w-4xl mx-auto relative overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Mission
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            To create a sanctuary for pet memories where love lives on, stories
            are preserved, and the bond between pets and their families is
            celebrated forever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-rose-500" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Love</h3>
            <p className="text-white text-sm">
              Every feature is built with love, understanding the deep bond
              between pets and families.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-8 w-8 text-rose-500" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Memories</h3>
            <p className="text-white text-sm">
              Preserving precious moments in beautiful, organized collections
              that tell your pet's story.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-rose-500" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Community
            </h3>
            <p className="text-white text-sm">
              Connecting pet parents who understand the joy and heartbreak of
              loving an animal.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-rose-500" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Trust</h3>
            <p className="text-white text-sm">
              Your memories are sacred. We protect them with the highest
              security standards.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 py-4">
          Built by Pet Parents, for Pet Parents
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our small but passionate team understands the unique joy and
          heartbreak that comes with loving a pet. We're here to help you
          celebrate that love.
        </p>
      </div>
    </section>
  );
}
