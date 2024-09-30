"use client";
import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import GlitchText from "@/components/glitch-text";
import Link from "next/link";
import Image from "next/image"; // For optimized images

const LandingPage = () => {
  const [text, setText] = useState("");
  const fullText = "The Riddler's Challenge has started.";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Glowing Bat or Question Mark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Replace the src with your desired image path */}
        <Image
          src="/images/glowing-bat.png" // Ensure you have this image in your public/images directory
          alt="Glowing Bat"
          width={300}
          height={300}
          className="opacity-20 animate-pulse hidden md:block"
        />
        {/* For mobile, you might want a smaller or different image */}
        <Image
          src="/images/glowing-bat.png" // You can use the same image or a different one
          alt="Glowing Bat"
          width={150}
          height={150}
          className="opacity-20 animate-pulse md:hidden"
        />
      </div>

      <div className="w-full max-w-4xl bg-gray-900 bg-opacity-80 p-6 md:p-8 rounded-lg shadow-lg border-2 border-green-500 relative z-10 overflow-hidden backdrop-blur-sm">
        {/* Overlay for additional glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-green-500 opacity-5 animate-pulse z-0"></div>

        <div className="flex items-center mb-4 md:mb-6 relative z-10">
          <Terminal className="mr-2 w-6 h-6 md:w-8 md:h-8" />
          <h1 className="text-2xl md:text-3xl font-bold">
            <GlitchText>La Rata Alada</GlitchText>
          </h1>
        </div>

        <div className="mb-4 md:mb-6 relative z-10">
          <p className="text-lg md:text-xl">
            {text}
            <span className="animate-blink">_</span>
          </p>
        </div>

        <div className="space-y-2 md:space-y-4 mb-6 md:mb-8 relative z-10">
          <p className="text-md md:text-lg">
            <GlitchText>
              The hunt has begun! Solve the riddles and earn points.
            </GlitchText>
          </p>
          <p className="text-md md:text-lg">
            Final results: <span className="underline animate-pulse">???</span>
          </p>
        </div>

        <div className="mt-4 md:mt-8 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 relative z-10">
          <Link
            href="/la-rata-alada/leaderboard"
            className="bg-green-500 text-black px-4 md:px-6 py-2 rounded hover:bg-green-600 transition-colors text-center"
          >
            View Leaderboard
          </Link>
          <a
            target="_blank"
            href="https://drive.google.com/drive/folders/1l2x-imU8k0kZrnvnmBXkbVXN4FfWYSNu?usp=sharing" // Ensure this route exists
            className="border border-green-500 px-4 md:px-6 py-2 rounded hover:bg-green-500 hover:text-black transition-colors text-center"
          >
            Event Gallery
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
