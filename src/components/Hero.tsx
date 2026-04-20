"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import DotFieldShader from "@/components/DotFieldShader";
import { trackEvent } from "@/lib/analytics";

const Hero: React.FC = () => {
  return (
    <section
      aria-label="Hero — The Future of Work is Automated"
      className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col bg-backgroundDark"
    >
      {/* Hidden H1 for screen readers — keeps heading hierarchy intact */}
      <h1 className="sr-only">TDI — Intelligent Automation for Modern Enterprise</h1>
      {/* TOP HERO STAGE */}
      <div className="relative flex flex-col items-start lg:items-end justify-end pb-8 lg:pb-12 shrink-0 flex-1 min-h-[55vh] lg:h-[65%]">
        
        {/* WebGL Powered Dot Background */}
        <div aria-hidden="true" className="absolute inset-0 hero-gradient z-0" />
        <DotFieldShader />
        <div aria-hidden="true" className="hero-vignette z-40" />

        {/* Content aligned with navbar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative z-50 mx-auto w-full max-w-ultra px-6 lg:px-8 flex flex-col lg:flex-row justify-end lg:justify-between items-start lg:items-end gap-10 lg:gap-0 pt-32 lg:pt-0"
        >
          
          <div className="max-w-md sm:max-w-lg mt-auto lg:mt-0">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white/90 font-light leading-tight">
              The Future of <br className="hidden sm:block" />
              Work is Automated
            </p>
          </div>

          <div className="text-left lg:text-right mt-4 lg:mt-0">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50 mb-3 sm:mb-4 font-medium">
              Quick Contact With Us!
            </p>
            {/* Social Links */}
            <div className="flex gap-2 justify-start lg:justify-end mt-4 sm:mt-0" role="list" aria-label="Social media links">
              {[
                { label: "X", href: "https://x.com/thedataisland" },
                { label: "In", href: "https://linkedin.com/company/thedataisland" },
                { label: "Ig", href: "https://instagram.com/thedataisland" }
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  onClick={() => trackEvent("outbound_click", { link_url: s.href, link_text: s.label })}
                  aria-label={`Follow TDI on ${s.label}`}
                  className="w-10 h-10 sm:w-9 sm:h-9 rounded-md bg-white flex items-center justify-center hover:bg-white/90 transition-all shadow-sm"
                >
                  <span aria-hidden="true" className="text-black font-bold text-xs">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM PANEL - 35% height layout with adaptive wrapping for tiny screens */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="relative shrink-0 bg-white border-t border-gray-100 py-10 lg:py-0 lg:h-[35%] w-full"
      >
        <div className="h-full mx-auto max-w-ultra px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-start lg:items-end lg:pb-12 lg:pt-8 gap-8 font-sans">
          
          <div className="max-w-[840px] h-full flex flex-col justify-end">
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-textDark mb-4 lg:mb-6 leading-[1.15] font-normal tracking-tight">
              Intelligent Automation for <br className="hidden md:block" />
              Modern Enterprise
            </h2>
            <p className="text-base sm:text-lg text-textMuted font-light leading-relaxed max-w-2xl">
              TDI designs and deploys AI systems that automate operational 
              workflows across enterprises.
            </p>
          </div>

          <div className="lg:pb-1 shrink-0 mt-2 lg:mt-0 w-full sm:w-auto">
            <Link
              href="/solutions"
              onClick={() => trackEvent("cta_click", { cta_name: "Explore Solutions (Hero)" })}
              className="w-full sm:w-auto justify-center bg-black text-white px-9 py-4 sm:py-3.5 rounded-full font-medium flex items-center gap-2.5 hover:bg-gray-900 transition-all shadow-lg group text-sm md:text-base"
            >
              Explore Solutions
              <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;