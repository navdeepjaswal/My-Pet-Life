import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactMethods() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600 text-sm">support@mypetlife.com</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600 text-sm">1-800-PET-LIFE</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm">Available 24/7</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Office</h3>
            <p className="text-gray-600 text-sm">San Francisco, CA</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 