"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { caseStudies } from "@/components/CaseStudies/CaseStudySection";
import { CaseStudyPanel } from "@/components/CaseStudies/CaseStudyPanel";
import { CTASection } from "@/components/CTASection";
import { LayeredSlide } from "@/components/LayeredSlide";
import Footer from "@/components/Footer";
import { PageHeroAnimation } from "@/components/PageHeroAnimation";

export default function CaseStudiesPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={scrollContainerRef}
      id="main-scroll-container"
      className="relative h-[100svh] overflow-y-auto overflow-x-hidden bg-black scroll-smooth md:snap-y md:snap-mandatory"
    >
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Intro Header */}
        <LayeredSlide index={0} containerRef={scrollContainerRef}>
          <section className="bg-black pt-32 h-[100svh] flex items-center overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 md:mb-8">
                    Applied <br/><span className="text-accentTeal">Intelligence</span>
                  </h1>
                  <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
                    Real-world deployment of AI agents and automated pipelines across various industries and operational environments.
                  </p>
                </motion.div>
                <div className="hidden lg:block">
                  <PageHeroAnimation type="insights" />
                </div>
              </div>
            </div>
          </section>
        </LayeredSlide>

        {/* Individual Case Study Slides */}
        {caseStudies.map((study, idx) => (
          <LayeredSlide 
            key={study.id} 
            index={idx + 1} 
            containerRef={scrollContainerRef} 
            disableTransform={true}
          >
            <div className="relative w-full h-full">
              <CaseStudyPanel study={study} />
              {/* Section Indicator - repositioned for better visibility */}
              <div className="absolute top-[85svh] right-6 md:right-24 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase z-30">
                Case {idx + 1} // {caseStudies.length}
              </div>
            </div>
          </LayeredSlide>
        ))}

        <LayeredSlide index={caseStudies.length + 1} containerRef={scrollContainerRef}>
          <CTASection />
        </LayeredSlide>

        <Footer />
      </main>
    </div>
  );
}
