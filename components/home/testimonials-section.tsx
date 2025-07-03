import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Happy <span className="text-rose-500">Pet Parents</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="bg-white/70 backdrop-blur-sm border-rose-100">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div>
                <h4 className="font-semibold text-gray-800">Sarah M.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              &quot;Finally, all of Bella&apos;s photos are organized and safe. This
              app helped me create the most beautiful memorial for my sweet
              girl.&quot;
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-rose-100">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div>
                <h4 className="font-semibold text-gray-800">Mike R.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              &quot;I used to lose Max&apos;s photos in my camera roll. Now I have a
              beautiful timeline of his entire life. Absolutely love this
              platform.&quot;
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-rose-100">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div>
                <h4 className="font-semibold text-gray-800">Emma L.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              &quot;The most thoughtful app for pet parents. It&apos;s not just
              storage - it&apos;s a celebration of the love we share with our
              pets.&quot;
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 