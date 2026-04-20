"use client"

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { LayeredSlide } from "@/components/LayeredSlide";
import { WebGLTransitionProvider } from "@/components/WebGLTransitionProvider";
import { ClientSegments } from "@/components/ClientSegments";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { WhyTDI } from "@/components/WhyTDI";
import { CTASection } from "@/components/CTASection";
import Footer from "@/components/Footer";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Technology = dynamic(() => import("@/components/Technology"), { ssr: false });
const SolutionsGrid = dynamic(() => import("@/components/SolutionsGrid"), { ssr: false });
const Products = dynamic(() => import("@/components/Products"), { ssr: false });
const TestimonialSlider = dynamic(() => import("@/components/TestimonialSlider"), { ssr: false });
const Leadership = dynamic(() => import("@/components/Leadership"), { ssr: false });
const CaseStudySection = dynamic(() => import("@/components/CaseStudies/CaseStudySection").then(mod => mod.CaseStudySection), { ssr: false });

export default function HomeClient() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sections = [
    ClientSegments,
    SolutionsGrid,
    ProcessTimeline,
    WhyTDI,
    Technology,
    Products,
    TestimonialSlider,
    Leadership,
    CTASection,
  ];

  return (
    <div 
      ref={scrollContainerRef}
      id="main-scroll-container"
      className="relative h-[100svh] overflow-y-auto overflow-x-hidden bg-black scroll-smooth md:snap-y md:snap-mandatory"
    >
      {/* Hero is the page header landmark */}
      <header>
        <LayeredSlide index={0} className="w-full min-h-[100svh]" containerRef={scrollContainerRef}>
          <Hero />
        </LayeredSlide>
      </header>

      <WebGLTransitionProvider>
        <main id="main-content" tabIndex={-1} className="flex-1 w-full flex flex-col items-center outline-none">
          {sections.map((Section, idx) => {
            const isCaseStudy = Section === CaseStudySection;

            return (
              <LayeredSlide 
                key={idx} 
                index={idx + 1} 
                className="w-full"
                containerRef={scrollContainerRef}
                disableTransform={isCaseStudy}
              >
                <Section />
              </LayeredSlide>
            );
          })}
          
          <Footer />
        </main>
      </WebGLTransitionProvider>
    </div>
  );
}
