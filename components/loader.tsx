"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PawDecoration from "./paw-decoration";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 26); // 1300ms / 50 steps = 26ms per step

    // Loading text animation
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading";
        return prev + ".";
      });
    }, 400);

    // Complete animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1300);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 overflow-hidden">
      {/* Floating paw prints background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <PawDecoration size="w-8 h-8" className="text-rose-300" />
          </div>
        ))}
      </div>

      {/* Main loader content */}
      <div className="flex flex-col items-center space-y-6 z-10">
        {/* Animated puppy image */}
        <div className="relative">
          <div className="relative w-24 h-24 rounded-full bg-white shadow-xl animate-bounce-slow">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <Image
                src="/loading-puppy.png"
                alt="Loading puppy"
                width={60}
                height={60}
                className="animate-wiggle"
              />
            </div>
          </div>
          
          {/* Rotating ring */}
          <div className="absolute -inset-2 rounded-full border-4 border-transparent border-t-rose-400 border-r-pink-400 animate-spin-slow"></div>
          
          {/* Pulsing outer ring */}
          <div className="absolute -inset-4 rounded-full border-2 border-rose-200 animate-ping"></div>
        </div>

        {/* Progress bar */}
        <div className="w-48 bg-white/50 rounded-full h-2 shadow-inner overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-100 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {/* Loading text with typing animation */}
        <div className="text-center">
          <p className="text-rose-600 font-semibold text-lg animate-pulse">
            {loadingText}
          </p>
          <p className="text-rose-400 text-sm mt-1 animate-fade-in-up">
            Preparing your pet's world...
          </p>
        </div>

        {/* Floating hearts */}
        <div className="absolute">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute text-rose-300 animate-float-up opacity-60"
              style={{
                left: `${-20 + i * 20}px`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes float-up {
          0% { 
            transform: translateY(20px); 
            opacity: 0; 
          }
          50% { 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-30px); 
            opacity: 0; 
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-float-up {
          animation: float-up 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
