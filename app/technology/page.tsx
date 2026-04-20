"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CTASection } from "@/components/CTASection";
import { LayeredSlide } from "@/components/LayeredSlide";
import Footer from "@/components/Footer";

const techCapabilities = [
  {
    title: "AI Agents",
    desc: "Autonomous reasoning systems that reason through problems, interact with external platforms, and make contextually appropriate decisions.",
    features: ["Single-agent purpose systems", "Sophisticated multi-agent architectures", "Continuous behavioral learning"]
  },
  {
    title: "Workflow Orchestration",
    desc: "Intelligent pipelines that replace manual coordination, repetitive decision-making, and fragmented data movement.",
    features: ["Automated decision logic", "Temporal sequence management", "Conditional branch handling"]
  },
  {
    title: "Computer Vision Systems",
    desc: "Visual automation for quality control, real-time operational monitoring, and document digitization across industrial and commercial environments.",
    features: ["Machine speed defect detection", "Continuous visual surveillance", "Structured OCR extraction"]
  },
  {
    title: "Natural Language Processing",
    desc: "Language understanding systems adapted for Bengali, English, and other relevant languages for document and communication intelligence.",
    features: ["Information extraction from contracts", "Multi-lingual processing", "Intelligent search over data lakes"]
  },
  {
    title: "Automation Infrastructure",
    desc: "Production-ready deployment on modern cloud architecture, engineered to support sustained AI workloads reliably.",
    features: ["Scalable backend API layers", "Production-grade deployment", "Real-time monitoring & optimization"]
  }
];

const integrations = [
  "Slack", "Notion", "Stripe", "Supabase", "HubSpot", "Salesforce", "AWS", "Vercel", "Docker", "GitHub Actions", "Pipedrive", "Gmail"
];

import { PageHeroAnimation } from "@/components/PageHeroAnimation";

export default function TechnologyPage() {
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
                    Engineering <br/><span className="text-accentTeal">Infrastructure</span>
                  </h1>
                  <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed">
                    TDI brings together the technical depth of an AI engineering firm with the operational discipline of an enterprise systems integrator.
                  </p>
                </motion.div>
                <div className="hidden lg:block">
                  <PageHeroAnimation type="technology" />
                </div>
              </div>
            </div>
          </section>
        </LayeredSlide>

        {/* Main Capabilities */}
        <LayeredSlide index={1} containerRef={scrollContainerRef}>
          <section className="bg-black h-[100svh] flex items-center overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 overflow-hidden">
                {techCapabilities.map((tech, idx) => (
                  <div key={idx} className="bg-[#0c1414] border border-white/5 p-6 lg:p-10 rounded-3xl group">
                    <span className="text-xs font-bold tracking-[0.3em] text-accentTeal uppercase mb-4 lg:mb-8 block">/ Capability 0{idx + 1}</span>
                    <h2 className="text-xl lg:text-2xl font-normal text-white mb-4 lg:mb-6 group-hover:text-accentTeal transition-colors">{tech.title}</h2>
                    <p className="text-white/40 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-8 font-light line-clamp-3">
                      {tech.desc}
                    </p>
                    <div className="space-y-2 lg:space-y-3">
                      {tech.features.map((f, fidx) => (
                        <div key={fidx} className="flex items-center gap-3 text-white/70">
                          <div className="w-1 h-1 rounded-full bg-accentTeal opacity-40 shrink-0" />
                          <span className="text-[11px] lg:text-[13px] font-light leading-snug">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </LayeredSlide>

        {/* Integrations */}
        <LayeredSlide index={2} containerRef={scrollContainerRef}>
          <section className="bg-[#050a0a] h-[100svh] flex items-center overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-8 w-full">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 h-full items-center">
                <div className="lg:w-1/3">
                  <h2 className="text-3xl md:text-5xl font-normal leading-tight text-white mb-8">Native Integration Ecosystem</h2>
                  <p className="text-white/40 text-lg font-light leading-relaxed">
                    TDI agents and pipelines are built to integrate natively with the platforms your organization already operates on. We don't bolt on—we wire in.
                  </p>
                </div>
                
                <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
                  {integrations.map((int, iidx) => (
                    <div key={iidx} className="bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6 flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                      <span className="text-white font-medium tracking-wide text-xs lg:text-sm">{int}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </LayeredSlide>

        <LayeredSlide index={3} containerRef={scrollContainerRef}>
          <CTASection />
        </LayeredSlide>

        <Footer />
      </main>
    </div>
  );
}



