import { Card, CardContent } from "@/components/ui/card";
import { Archive, Heart, Shield } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Choose MyPetLife?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We understand the pain of losing precious pet photos in cluttered
          galleries. Our platform is designed with love, for love.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Archive className="h-8 w-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Organized Collections
            </h3>
            <p className="text-gray-600">
              Create beautiful albums and timelines. Never lose another
              precious moment in your camera roll again.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Memorial Spaces
            </h3>
            <p className="text-gray-600">
              Honor your beloved companion with a dedicated memorial space
              filled with love and cherished memories.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Safe & Secure
            </h3>
            <p className="text-gray-600">
              Your memories are precious. We keep them safe with
              enterprise-grade security and regular backups.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 