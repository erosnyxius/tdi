"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CTASection } from "@/components/CTASection";
import { LayeredSlide } from "@/components/LayeredSlide";
import Footer from "@/components/Footer";
import { PageHeroAnimation } from "@/components/PageHeroAnimation";

const insights = [
  {
    title: "The Deployment Reality: Why AI Initiatives Stagnate in Pilot",
    category: "AI Implementation Lessons",
    summary: "Exploring the gap between AI demonstration and production value. Real-world insights from over 200 automation audits.",
    time: "Dec 2025"
  },
  {
    title: "The Architecture of Autonomous AI Agents",
    category: "Workflow Automation Strategies",
    summary: "Breaking down the transition from assisted bots to autonomous decision-makers at every level of operations.",
    time: "Nov 2025"
  },
  {
    title: "Multi-Agent Orchestration: A Technical Primer",
    category: "AI Automation Guides",
    summary: "How specialized agents collaboration can execute broader, more complex operational processes with minimal intervention.",
    time: "Oct 2025"
  },
  {
    title: "The Rise of SOP-Aware Chatbots in Enterprise",
    category: "Industry Automation Trends",
    summary: "Why intelligent internal assistants are becoming the backbone of operational knowledge management.",
    time: "Sep 2025"
  },
  {
    title: "Modular Scaling in AI Automation: A Strategy",
    category: "AI Implementation Lessons",
    summary: "Ensuring your AI systems grow incrementally alongside your operations without costly architectural overhauls.",
    time: "Aug 2025"
  },
  {
    title: "Native Stack Integration vs Bolting On: Choosing Your Path",
    category: "AI Automation Guides",
    summary: "Evaluating the long-term trade-offs between custom-built automation glue and off-the-shelf single-purpose tools.",
    time: "Jul 2025"
  }
];

export default function InsightsPage() {
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
                  className="max-w-4xl"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 md:mb-8">
                    Technical <br/><span className="text-accentTeal">Perspectives</span>
                  </h1>
                  <p className="text-white/50 text-base md:text-xl font-light leading-relaxed max-w-3xl">
                    Strategic insights and technical analysis on the implementation of AI agents, enterprise automation, and the future of work.
                  </p>
                </motion.div>
                <div className="hidden lg:block">
                  <PageHeroAnimation type="insights" />
                </div>
              </div>
            </div>
          </section>
        </LayeredSlide>

        {/* Article Grid */}
        <LayeredSlide index={1} containerRef={scrollContainerRef}>
          <section className="bg-black h-[100svh] flex items-center overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {insights.map((article, idx) => (
                  <motion.article
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-[#0c1414] border border-white/5 rounded-3xl overflow-hidden hover:border-accentTeal/30 transition-all"
                  >
                    <div className="h-48 md:h-64 relative overflow-hidden">
                      <div className="absolute inset-0 bg-accentTeal/5 group-hover:bg-accentTeal/10 transition-colors" />
                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <span className="text-[10px] uppercase tracking-widest text-accentTeal font-bold mb-2">{article.category}</span>
                        <h4 className="text-lg md:text-xl font-normal text-white leading-snug group-hover:text-accentTeal transition-colors">{article.title}</h4>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="text-white/40 text-sm font-light leading-relaxed line-clamp-2 md:line-clamp-3 mb-6">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">{article.time}</span>
                        <span className="text-accentTeal text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                          Read More <span>→</span>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </LayeredSlide>

        <LayeredSlide index={2} containerRef={scrollContainerRef}>
          <CTASection />
        </LayeredSlide>

        <Footer />
      </main>
    </div>
  );
}
