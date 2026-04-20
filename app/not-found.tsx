import Link from "next/link";
import React from "react";

export const metadata = {
  title: "404 - Page Not Found | The Data Island",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-black text-white relative flex-1">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6CF2B0]/5 blur-[120px] rounded-full pointer-events-none" />
      <h1 className="text-6xl md:text-8xl font-light text-[#6CF2B0] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-medium mb-6">Page Not Found</h2>
      <p className="text-white/60 mb-10 max-w-md font-light text-sm md:text-base">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/"
        className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-[#6CF2B0] transition-colors shadow-lg"
      >
        Return to Homepage
      </Link>
    </main>
  );
}
