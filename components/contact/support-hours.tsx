import { Clock, Heart } from "lucide-react";

export default function SupportHours() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-rose-100">
            <div className="flex items-center mb-6">
              <Clock className="h-6 w-6 text-rose-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Support Hours</h3>
            </div>
            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between items-center">
                <span className="font-medium">Monday - Friday:</span>
                <span className="text-right">9:00 AM - 8:00 PM EST</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Saturday:</span>
                <span className="text-right">10:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Sunday:</span>
                <span className="text-right">12:00 PM - 5:00 PM EST</span>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100">
                <p className="text-sm leading-relaxed">
                  <strong className="text-rose-600">Emergency Support:</strong> Available 24/7 for account recovery and critical issues.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-rose-100">
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-rose-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Our Commitment</h3>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>We understand how precious your pet memories are to you.</p>
              <p>Our dedicated support team consists of fellow pet parents who genuinely care about your experience.</p>
              <div className="mt-6 pt-4 border-t border-rose-100">
                <p className="text-sm italic text-gray-500">
                  &quot;Every pet parent deserves compassionate support when preserving their most treasured memories.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 