"use client";

import React from "react";
import { motion } from "framer-motion";

const NODES = [
  { id: 1, angle: 0, title: "DISCOVERY & AUDIT", desc: "Mapping workflow constraints." },
  { id: 2, angle: 60, title: "SYSTEM ARCHITECTURE", desc: "Topological AI design." },
  { id: 3, angle: 120, title: "AGENTS & WORKFLOWS", desc: "Autonomous cognitive logic." },
  { id: 4, angle: 180, title: "QUALITY ASSURANCE", desc: "Edge-case stress testing." },
  { id: 5, angle: 240, title: "SEAMLESS DEPLOYMENT", desc: "Zero-downtime integration." },
  { id: 6, angle: 300, title: "MONITORING & PROFILING", desc: "Continuous metric tracking." },
];

const RADIUS_CLASS = "w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[min(500px,50vh)] md:h-[min(500px,50vh)] lg:w-[min(600px,60vh)] lg:h-[min(600px,60vh)]";

const NodeBlock = ({ title, desc, isMobile = false }: { title: string; desc: string; isMobile?: boolean }) => {
  return (
    <div className={`relative group flex flex-col items-center justify-center p-3 sm:p-4 border border-white/5 bg-[#010404]/80 rounded-2xl backdrop-blur-xl ${isMobile ? "w-full max-w-[280px] mb-4" : "w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]"} shadow-2xl transition-all duration-500 hover:bg-white/[0.04] hover:border-[#6CF2B0]/40 hover:scale-105 z-20 focus-within:ring-2 focus-within:ring-[#6CF2B0] focus-within:outline-none`} tabIndex={0}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <span className={`font-mono font-bold tracking-widest text-[#6CF2B0] text-center mb-2 uppercase ${isMobile ? "text-[13px]" : "text-[9px] sm:text-[10px] md:text-[11px]"}`}>
        {title}
      </span>
      <p className={`${isMobile ? "block text-[11px]" : "hidden md:block text-[10px]"} text-white/50 text-center font-light leading-snug`}>
        {desc}
      </p>
    </div>
  );
};

export const ProcessTimeline: React.FC = () => {
  return (
    <section aria-label="Our Process Timeline" className="bg-[#010404] py-12 md:py-20 border-t border-white/5 overflow-hidden relative min-h-screen flex flex-col items-center justify-center">
      {/* Background Deep Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(108,242,176,0.05)_0%,_transparent_50%)]" />

      {/* Header */}
      <div className="mt-4 mb-12 md:mb-16 text-center flex flex-col items-center relative z-30 px-6 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6CF2B0]/10 border border-[#6CF2B0]/20 text-[#6CF2B0] text-[9px] md:text-[10px] font-mono font-semibold tracking-widest mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-[#6CF2B0] animate-pulse shadow-[0_0_10px_rgba(108,242,176,0.8)]" />
          CONTINUOUS AUTOMATION LOOP
        </motion.div>
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white mb-4 sm:mb-6">
          The Automation Engine
        </h3>
        <p className="text-white/50 text-sm md:text-base lg:text-lg max-w-2xl font-light">
          A living, cyclical architecture. Designed to discover, deploy, and continuously optimize operations.
        </p>
      </div>

      {/* Desktop/Tablet Orbital View */}
      <div className="hidden sm:flex relative w-full flex-1 items-center justify-center min-h-[400px] md:min-h-[500px]" aria-hidden="true">
        
        {/* The Outer Orbital Track */}
        <div className={`absolute border border-white/10 rounded-full ${RADIUS_CLASS} shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]`} />
        
        {/* The Orbiting Light Pulse */}
        <motion.div 
          className={`absolute rounded-full pointer-events-none ${RADIUS_CLASS}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Glowing particle positioned exactly on the top edge of the track */}
          <div className="absolute top-[-4px] left-1/2 -ml-[4px] w-[8px] h-[8px] rounded-full bg-[#6CF2B0] shadow-[0_0_20px_6px_rgba(108,242,176,0.8)]" />
          <div className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-[60px] bg-gradient-to-b from-[#6CF2B0] to-transparent opacity-80" />
        </motion.div>

        {/* The Central Engine Core */}
        <div className="absolute flex items-center justify-center z-10 hover:scale-105 transition-transform duration-700 cursor-default">
           <div className="w-28 h-28 md:w-44 md:h-44 rounded-full border border-[#6CF2B0]/30 bg-[#6CF2B0]/5 backdrop-blur-md flex items-center justify-center shadow-[0_0_80px_rgba(108,242,176,0.15)] relative z-20 overflow-hidden">
             {/* Swirling center gradient */}
             <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent_0%,_rgba(108,242,176,0.1)_50%,_transparent_100%)] animate-spin-slow opacity-50" />
             <span className="font-mono text-xs md:text-sm lg:text-base font-bold text-white/90 text-center uppercase tracking-[0.2em] leading-relaxed relative z-10">
               TDI<br/>Core
             </span>
           </div>
           {/* Pulsing broadcast rings */}
           <div className="absolute inset-[-25%] rounded-full border border-[#6CF2B0]/20 animate-ping shadow-[0_0_40px_rgba(108,242,176,0.2)]" style={{ animationDuration: '4s' }}/>
        </div>

        {/* Network Spokes (Connecting Core to Track) */}
        {NODES.map((node) => (
           <div key={`spoke-${node.id}`} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${RADIUS_CLASS} pointer-events-none`}>
              <div className="w-full h-full absolute" style={{ transform: `rotate(${node.angle}deg)` }}>
                 <div className="absolute top-[8%] left-1/2 -ml-px w-px h-[40%] bg-gradient-to-b from-white/10 to-transparent" />
              </div>
           </div>
        ))}

        {/* Orbital Nodes Placements */}
        <ul aria-label="Process steps" className="absolute inset-0">
          {NODES.map((node, index) => (
            <li 
              key={node.id} 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${RADIUS_CLASS} pointer-events-none`}
            >
            {/* Rotate container to the specific degree */}
            <div className="w-full h-full absolute" style={{ transform: `rotate(${node.angle}deg)` }}>
              {/* Counter-rotate the child to stay perfectly upright */}
              <div 
                className="absolute top-0 left-1/2 origin-center pointer-events-auto"
                style={{ transform: `translate(-50%, -50%) rotate(-${node.angle}deg)` }}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-10%" }}
                >
                  <NodeBlock title={node.title} desc={node.desc} />
                </motion.div>
              </div>
            </div>
          </li>
        ))}
        </ul>
        
      </div>

      {/* Mobile Vertical View (Simplified for Small Screens) */}
      <div className="flex sm:hidden flex-col items-center gap-6 w-full px-6 relative z-10 pb-12">
        {/* Vertical line connecting nodes */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#6CF2B0]/20 to-transparent -translate-x-1/2" />
        
        {NODES.map((node, index) => (
          <motion.div
            key={`mobile-${node.id}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="w-full flex justify-center"
          >
            <NodeBlock title={node.title} desc={node.desc} isMobile={true} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
