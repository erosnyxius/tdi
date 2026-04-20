"use client";

import React from "react";
import Image from "next/image";
import { MetricsWall } from "./MetricsBrickWall/MetricsWall";

const logos = [
  { src: "/logos/Syncoria Greyscale.svg", alt: "Syncoria", imgClass: "h-10 md:h-12" },
  { src: "/logos/Tech Matters Greyscale.svg", alt: "Tech Matters", imgClass: "h-12 md:h-14 scale-110" },
  { src: "/logos/bangladesh-army-seeklogo greyscale.svg", alt: "Bangladesh Army", imgClass: "h-14 md:h-16 scale-[0.85]" },
  { src: "/logos/grameenphone-original-seeklogo greyscale.svg", alt: "Grameenphone", imgClass: "h-14 md:h-16 scale-[2.0] md:scale-[2.5]" },
  { src: "/logos/unilever-seeklogo greyscale.svg", alt: "Unilever", imgClass: "h-12 md:h-14" },
  { src: "/logos/university-of-toronto-seeklogo greyscale.svg", alt: "University of Toronto", imgClass: "h-10 md:h-12" },
];

export const ClientSegments: React.FC = () => {
  return (
    <section aria-label="Trusted Clients" className="bg-[#010404] border-t border-white/5 w-full overflow-hidden">
      
      {/* ── Trusted By + Marquee ────────────────────────────── */}
      <div className="max-w-ultra mx-auto px-6 lg:px-8 py-12 md:py-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          <div className="w-full lg:w-auto text-center lg:text-left">
            <h2
              className="font-bold tracking-tight text-white/90 leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              Trusted by Market Leaders
            </h2>
            <div className="h-[2px] w-12 mt-4 lg:mt-6 mx-auto lg:mx-0 rounded-full bg-[#6CF2B0]" />
          </div>

          <div className="w-full lg:flex-1 overflow-hidden relative mt-8 lg:mt-0">
            {/* Edge fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#010404] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#010404] to-transparent z-10 pointer-events-none" />

            <div className="logo-grid flex whitespace-nowrap animate-marquee items-center py-4" role="marquee" aria-label="Client logos">
              {[...logos, ...logos].map((logo, idx) => (
                <div
                  key={idx}
                  aria-hidden={idx >= logos.length}
                  className="flex items-center justify-center shrink-0 w-[150px] md:w-[200px] h-20 mx-4 transition-opacity duration-300"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="(max-width: 768px) 150px, 200px"
                      className={`max-w-full w-auto object-contain grayscale brightness-[2.2] contrast-125 ${logo.imgClass || ""}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Metrics Brick Wall ──────────────────────────────── */}
      <MetricsWall />

    </section>
  );
};
