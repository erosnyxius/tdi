"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const techItems = [
  {
    id: "001",
    title: "AI Agent Development",
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    description: "Purpose-built AI agents using LangChain, LangGraph, and MCP to autonomously execute complex, multi-step tasks across your existing technology stack.",
  },
  {
    id: "002",
    title: "AI Copilots & Assistants",
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    description: "SOP-aware chatbots and intelligent assistants that index and surface institutional knowledge, providing instant access to documents and manuals.",
  },
  {
    id: "003",
    title: "Workflow Orchestration",
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    description: "End-to-end automation pipelines using n8n and complex logic to replace manual coordination and repetitive decision-making across departments.",
  },
  {
    id: "004",
    title: "Staff Augmentation",
    icon: (
      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description: "Embed senior AI engineers and automation specialists directly into your teams. Flexible engagements that scale with your pipeline — no long-term overhead.",
  },
];

/* ─── Dot helpers ─── */
function Dot({ cx, cy, r = 1.8 }: { cx: number; cy: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="white" opacity={0.55} />;
}

function dotGrid(
  x0: number, y0: number,
  cols: number, rows: number,
  gap: number,
): { cx: number; cy: number }[] {
  const pts: { cx: number; cy: number }[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      pts.push({ cx: x0 + c * gap, cy: y0 + r * gap });
  return pts;
}

/* ─── Shape 1: Concentric triangles (item 001) ─── */
const TriangleShape = () => {
  const rings = [
    "M200 60 L355 295 H45 Z",
    "M200 95 L325 270 H75 Z",
    "M200 130 L295 245 H105 Z",
    "M200 165 L265 220 H135 Z",
  ];
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {rings.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="white"
          strokeWidth={0.8}
          strokeDasharray="3 6"
          opacity={0}
          animate={{ opacity: [0, 0.35, 0.35, 0], strokeDashoffset: [0, -60] }}
          transition={{ duration: 6, delay: i * 0.6, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* Corner nodes */}
      {[{ cx: 200, cy: 60 }, { cx: 355, cy: 295 }, { cx: 45, cy: 295 }].map((p, i) => (
        <motion.circle
          key={i} cx={p.cx} cy={p.cy} r={2.5} fill="white"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
    </svg>
  );
};

/* ─── Shape 2: Concentric circles (item 002) ─── */
const CircleShape = () => {
  const radii = [120, 90, 60, 35];
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {radii.map((r, i) => (
        <motion.circle
          key={i}
          cx={200} cy={180} r={r}
          stroke="white"
          strokeWidth={0.8}
          strokeDasharray="4 7"
          opacity={0}
          animate={{ opacity: [0, 0.3, 0.3, 0], strokeDashoffset: [0, 80] }}
          transition={{ duration: 7, delay: i * 0.7, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* Dot ring at 35° intervals */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 2 * Math.PI;
        return (
          <motion.circle
            key={`n-${i}`}
            cx={200 + 125 * Math.cos(angle)}
            cy={180 + 125 * Math.sin(angle)}
            r={1.8} fill="white"
            animate={{ opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 2.5, delay: i * 0.22, repeat: Infinity }}
          />
        );
      })}
    </svg>
  );
};

/* ─── Shape 3: Grid / mesh (item 003) ─── */
const GridShape = () => {
  const pts = dotGrid(60, 60, 8, 7, 40);
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Horizontal dashed lines */}
      {Array.from({ length: 7 }).map((_, r) => (
        <motion.line
          key={`h-${r}`}
          x1={60} y1={60 + r * 40} x2={340} y2={60 + r * 40}
          stroke="white" strokeWidth={0.7} strokeDasharray="3 7"
          animate={{ opacity: [0, 0.25, 0.25, 0], strokeDashoffset: [0, -50] }}
          transition={{ duration: 5, delay: r * 0.3, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* Vertical dashed lines */}
      {Array.from({ length: 8 }).map((_, c) => (
        <motion.line
          key={`v-${c}`}
          x1={60 + c * 40} y1={60} x2={60 + c * 40} y2={300}
          stroke="white" strokeWidth={0.7} strokeDasharray="3 7"
          animate={{ opacity: [0, 0.2, 0.2, 0], strokeDashoffset: [0, -50] }}
          transition={{ duration: 5, delay: c * 0.25 + 0.1, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {pts.map((p, i) => (
        <motion.circle
          key={i} cx={p.cx} cy={p.cy} r={1.5} fill="white"
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: 2 + (i % 4) * 0.3, delay: (i * 0.09) % 2, repeat: Infinity }}
        />
      ))}
    </svg>
  );
};

/* ─── Shape 4: Hexagon (item 004) ─── */
function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }).map((_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

const HexShape = () => {
  const sizes = [130, 95, 62, 32];
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {sizes.map((r, i) => (
        <motion.polygon
          key={i}
          points={hexPoints(200, 180, r)}
          stroke="white" strokeWidth={0.8} strokeDasharray="4 8"
          opacity={0}
          animate={{ opacity: [0, 0.3, 0.3, 0], strokeDashoffset: [0, -70] }}
          transition={{ duration: 6.5, delay: i * 0.65, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* Vertices of outer hex */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return (
          <motion.circle
            key={i}
            cx={200 + 130 * Math.cos(a)}
            cy={180 + 130 * Math.sin(a)}
            r={2.2} fill="white"
            animate={{ opacity: [0.2, 0.85, 0.2] }}
            transition={{ duration: 2.2, delay: i * 0.35, repeat: Infinity }}
          />
        );
      })}
    </svg>
  );
};

const shapes = [TriangleShape, CircleShape, GridShape, HexShape];

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ─── Component ─── */
const Technology: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const ActiveShape = shapes[activeIndex];

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((idx + 1) % techItems.length);
        (e.currentTarget.parentElement?.children[(idx + 1) % techItems.length] as HTMLElement)?.focus();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((idx - 1 + techItems.length) % techItems.length);
        (e.currentTarget.parentElement?.children[(idx - 1 + techItems.length) % techItems.length] as HTMLElement)?.focus();
      }
    },
    []
  );

  return (
    <section className="bg-[#0a1212] text-white py-12 md:py-16 w-full flex items-center overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariants}
        className="max-w-ultra mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24"
      >
        {/* Left Column */}
        <div className="flex flex-col h-full justify-between">
          <motion.div variants={itemVariants}>
            <div className="inline-block border border-white/20 rounded-full px-4 py-1.5 text-xs tracking-wide text-white/70 mb-8">
              Technology
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-8">
              Enterprise AI Automation <br className="hidden xl:block" />
              Capabilities
            </h2>

            <button className="flex items-center gap-3 border border-white/30 rounded-full px-6 py-3 text-sm hover:bg-white hover:text-black transition-all mb-8 lg:mb-24 w-max">
              Contact Us <span className="text-lg leading-none">→</span>
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="pb-4">
            <div className="flex justify-between items-center text-xs text-white/50 mb-6 uppercase tracking-wider font-semibold border-b border-white/10 pb-4">
              <span id="tech-tab-label">Select a capability</span>
              <span aria-live="polite" aria-atomic="true">{activeIndex + 1}/{techItems.length}</span>
            </div>

            <div
              role="tablist"
              aria-labelledby="tech-tab-label"
              aria-orientation="vertical"
              className="flex flex-col gap-2"
            >
              {techItems.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    id={`tech-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls={`tech-panel-${item.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 text-left ${
                      isActive
                        ? "bg-white/10 border border-white/20"
                        : "bg-transparent border border-transparent hover:bg-white/5"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? "bg-white/15" : "bg-white/5"} text-white/70`} aria-hidden="true">
                      {item.icon}
                    </div>
                    <span className={`text-sm md:text-base font-medium ${isActive ? "text-white" : "text-white/60"}`}>
                      {item.title}
                    </span>
                    {isActive && (
                      <span aria-hidden="true" className="ml-auto w-1.5 h-1.5 rounded-full bg-accentTeal" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Card */}
        <motion.div variants={itemVariants} className="relative w-full min-h-[420px] md:min-h-[560px] lg:h-auto lg:min-h-[700px] flex items-stretch">
          <div className="w-full h-full relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden flex flex-col p-8 md:p-12">

            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs font-mono text-white/50 z-10 w-full relative">
              <span>/ {techItems[activeIndex].id}</span>
              <span className="font-sans font-bold text-white/30 text-lg tracking-widest">
                TDI<span className="text-[10px] font-normal tracking-normal ml-2 opacity-50">Machine<br />Technologies</span>
              </span>
            </div>

            {/* Animated Shape Area — transitions with activeIndex */}
            <div className="absolute inset-0 top-12 left-12 right-12 bottom-[250px] flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`shape-${activeIndex}`}
                  className="w-full h-full opacity-60"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.06 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ActiveShape />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Content */}
            <div
              className="mt-auto relative z-10 w-full max-w-lg border-t border-white/10 pt-[clamp(2rem,5vh,4rem)]"
              role="tabpanel"
              id={`tech-panel-${techItems[activeIndex].id}`}
              aria-labelledby={`tech-tab-${techItems[activeIndex].id}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl font-light mb-4">
                    {techItems[activeIndex].title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                    {techItems[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorative background */}
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accentTeal/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50 mix-blend-overlay" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Technology;
