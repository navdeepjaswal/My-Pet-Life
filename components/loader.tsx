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
      <div className="flex flex-col items-center space-y-4">
        <div className="relative rounded-full bg-white p-3">
          <PawDecoration className="animate-pulse" size="w-16 h-16" />
        </div>
        <p className="text-rose-600 font-medium">Loading MyPetLife...</p>
      </div>
    </div>
  );
}
