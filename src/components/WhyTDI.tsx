"use client";

import React from "react";
import { motion } from "framer-motion";

const comparisons = [
  {
    colSpan: 2, rowSpan: 2,
    challengeSize: "text-xl sm:text-2xl lg:text-4xl",
    responseSize: "text-xs sm:text-sm lg:text-xl",
    challenge: "AI initiatives stuck in pilot — cannot reach production",
    response: "TDI builds exclusively for production deployment. Every system is engineered to operate reliably in the client's real environment from go-live.",
  },
  {
    colSpan: 1, rowSpan: 1,
    challengeSize: "text-[10px] sm:text-xs lg:text-sm",
    responseSize: "text-[9px] sm:text-[10px] lg:text-[11px]",
    challenge: "Fragmented SaaS stack with no automation between platforms",
    response: "Native integrations and custom tooling that wires together the platforms the client already uses.",
  },
  {
    colSpan: 1, rowSpan: 2,
    challengeSize: "text-xs sm:text-sm lg:text-lg",
    responseSize: "text-[10px] sm:text-xs lg:text-sm",
    challenge: "Sales and ops spending time on manual pipeline management",
    response: "Automated lead gen, CRM updates, and follow-up workflows so revenue pipelines move without manual babysitting.",
  },
  {
    colSpan: 1, rowSpan: 1,
    challengeSize: "text-[10px] sm:text-xs lg:text-sm",
    responseSize: "text-[9px] sm:text-[10px] lg:text-[11px] leading-tight",
    challenge: "Internal knowledge trapped in isolated documents",
    response: "SOP-aware knowledge assistants that give teams instant access, without IT escalation.",
  },
  {
    colSpan: 2, rowSpan: 1,
    challengeSize: "text-xs sm:text-base lg:text-xl",
    responseSize: "text-[10px] sm:text-sm lg:text-base",
    challenge: "Uncertain which AI tools or architectures to invest in",
    response: "Independent, implementation-grounded guidance so clients invest in the right tools avoiding mistakes.",
  },
  {
    colSpan: 1, rowSpan: 1,
    challengeSize: "text-[10px] sm:text-xs lg:text-sm",
    responseSize: "text-[9px] sm:text-[10px] lg:text-[11px]",
    challenge: "Shortage of specialized AI engineering talent",
    response: "Immediate access to practitioners who contribute at pace without expensive recruitment delays.",
  },
  {
    colSpan: 1, rowSpan: 1,
    challengeSize: "text-[10px] sm:text-xs lg:text-sm",
    responseSize: "text-[9px] sm:text-[10px] lg:text-[11px]",
    challenge: "Scalability concerns as automation requirements grow",
    response: "Modular, reusable frameworks allow automation to scale without architectural overhaul.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  visible: { 
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

export const WhyTDI: React.FC = () => {
  return (
    <section className="bg-[#050a0a] py-16 md:py-24 border-t border-white/5 min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-ultra mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-10 md:mb-16 text-center flex flex-col items-center">
          <h2 className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-[#6CF2B0] font-bold mb-4 md:mb-6 bg-[#6CF2B0]/10 px-4 py-1.5 rounded-full border border-[#6CF2B0]/20 inline-flex">
            Why The Data Island
          </h2>
          <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white/90 max-w-4xl px-4">
            Built for the Real World. <br className="sm:hidden" /> Managed End-to-End.
          </h3>
        </div>

        {/* Mobile / tablet: simple stacked 1–2 col grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
          {comparisons.map((item, idx) => (
            <motion.div
              key={idx}
              tabIndex={0}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#010404] transition-all duration-700 hover:border-[#6CF2B0]/50 hover:shadow-[0_0_30px_rgba(108,242,176,0.1)] focus:border-[#6CF2B0]/50 cursor-pointer min-h-[130px] sm:min-h-[140px] focus:outline-none"
            >
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col gap-3 justify-start transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus:-translate-y-full">
                <div className="inline-flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-red-400 font-bold">The Problem</span>
                </div>
                <h4 className={`font-light text-white/90 leading-snug tracking-tight ${item.challengeSize}`}>
                  &ldquo;{item.challenge}&rdquo;
                </h4>
              </div>
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col gap-3 justify-start bg-[radial-gradient(circle_at_top_right,_rgba(108,242,176,0.15)_0%,_#010404_80%)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                <div className="inline-flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6CF2B0]" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#6CF2B0] font-bold">TDI Solution</span>
                </div>
                <p className={`font-normal text-white leading-relaxed ${item.responseSize}`}>{item.response}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: full asymmetric bento grid with CSS grid placement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="hidden lg:grid lg:grid-cols-4 gap-5 w-full"
          style={{ gridAutoRows: 'minmax(80px, 14vh)' }}
        >
          {comparisons.map((item, idx) => (
            <motion.div
              key={idx}
              tabIndex={0}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#010404] transition-all duration-700 hover:border-[#6CF2B0]/50 focus:border-[#6CF2B0]/50 hover:shadow-[0_0_50px_rgba(108,242,176,0.15)] focus:shadow-[0_0_50px_rgba(108,242,176,0.15)] cursor-pointer focus:outline-none"
              style={{
                gridColumn: `span ${item.colSpan}`,
                gridRow: `span ${item.rowSpan}`,
              }}
            >
              {/* === Base State === */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus:-translate-y-full">
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/80 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                  <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold opacity-80">The Problem</span>
                </div>
                <h4 className={`font-light text-white/90 leading-snug tracking-tight ${item.challengeSize}`}>
                  &ldquo;{item.challenge}&rdquo;
                </h4>
              </div>

              {/* === Reveal State === */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between bg-[radial-gradient(circle_at_top_right,_rgba(108,242,176,0.15)_0%,_#010404_80%)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6CF2B0] shadow-[0_0_10px_rgba(108,242,176,0.8)]" />
                  <span className="text-[10px] uppercase tracking-widest text-[#6CF2B0] font-bold">TDI Solution</span>
                </div>
                <p className={`font-normal text-white leading-relaxed ${item.responseSize}`}>{item.response}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};
