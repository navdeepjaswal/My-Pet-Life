"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PawDecoration from "./paw-decoration";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-50">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="absolute -inset-8 animate-ping rounded-full bg-rose-300/20" />
          <div className="absolute -inset-6 animate-pulse rounded-full bg-rose-200/30" />
          <div className="absolute -inset-4 animate-pulse rounded-full bg-rose-200/40 delay-75" />
          <div className="absolute -inset-2 animate-ping rounded-full bg-rose-300/50 delay-150" />
          <div className="absolute inset-0 rounded-full bg-white/80 blur-md" />
          <div className="relative rounded-full bg-white p-4 shadow-lg">
            <Image 
              src="/loading-puppy.png"
              alt="Loading..."
              width={80}
              height={80}
              priority
            />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <p className="text-rose-600 font-medium text-lg tracking-wide">Welcome to MyPetLife</p>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '75ms' }} />
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '100ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}