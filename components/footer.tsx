import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-rose-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
            <span className="text-xl font-bold text-gray-800">MyPetLife</span>
          </div>
          <p className="text-gray-600 text-center md:text-right">
            Made with ❤️ for pet parents everywhere
          </p>
        </div>
      </div>
    </footer>
  );
} 