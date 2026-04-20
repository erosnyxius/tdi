"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useInView } from "framer-motion";

const solutions = [
  {
    id: "01", title: "AI Agent Development", description: "Build the agents that run your operations—not just assist them.",
    cx: 240, cy: 220, path: "M 412 380 L 400 380 L 240 220", delay: 0.2, textWidth: "w-48 text-right pr-6", textPos: "right-full top-1/2 -translate-y-1/2" 
  },
  {
    id: "02", title: "Workflow Automation", description: "Replace manual coordination with intelligent, automated pipelines and seamless integration.",
    cx: 240, cy: 400, path: "M 412 400 L 240 400", delay: 1.2, textWidth: "w-48 text-right pr-6", textPos: "right-full top-1/2 -translate-y-1/2"
  },
  {
    id: "03", title: "Custom AI Integration", description: "Purpose-built AI systems for processes standard tools cannot handle, like visual inspection.",
    cx: 240, cy: 580, path: "M 412 420 L 400 420 L 240 580", delay: 0.7, textWidth: "w-48 text-right pr-6", textPos: "right-full top-1/2 -translate-y-1/2"
  },
  {
    id: "04", title: "MVP Development", description: "AI-native products built to ship—not just to demonstrate. Full-stack agentic infrastructure.",
    cx: 760, cy: 220, path: "M 588 380 L 600 380 L 760 220", delay: 0.4, textWidth: "w-48 text-left pl-6", textPos: "left-full top-1/2 -translate-y-1/2"
  },
  {
    id: "05", title: "AI Strategy & Advisory", description: "Implementation-grounded strategy and advisory engagements to map your operational landscape.",
    cx: 760, cy: 400, path: "M 588 400 L 760 400", delay: 0.9, textWidth: "w-48 text-left pl-6", textPos: "left-full top-1/2 -translate-y-1/2"
  },
  {
    id: "06", title: "Talent Augmentation", description: "Specialized AI practitioners who deliver from day one. Access experienced AI engineers.",
    cx: 760, cy: 580, path: "M 588 420 L 600 420 L 760 580", delay: 1.5, textWidth: "w-48 text-left pl-6", textPos: "left-full top-1/2 -translate-y-1/2"
  },
];

const bottomTraces = [
  "M 470 488 L 470 800",
  "M 500 488 L 500 800",
  "M 530 488 L 530 800"
];

const SolutionsGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. The TDI box shape appears (smoothly from darkness)
      tl.fromTo(
        ".core-node",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" }
      );

      // 2. The other blocks appear first
      tl.fromTo(
        ".service-node",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" },
        "-=0.5"
      );

      // 3. The lines (traces) outwardly draw to connect them
      tl.fromTo(
        ".connection-line",
        { strokeDasharray: 600, strokeDashoffset: 600 },
        { strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: "power2.inOut" },
        "-=0.5"
      );

      // 4. Data pulses (Tailed Lights) continuously firing along traces
      solutions.forEach((sol, i) => {
        const pulse = `.pulse-${i}`;
        gsap.fromTo(pulse, 
          { strokeDashoffset: 100 }, 
          { 
            strokeDashoffset: -600, 
            duration: 2.5, 
            ease: "none", 
            repeat: -1,
            repeatDelay: 1.5 + Math.random() * 2.5, 
            delay: 2.5 + sol.delay, 
          }
        );
      });

      // 4b. Bottom Pulses
      bottomTraces.forEach((_, i) => {
        const pulse = `.bot-pulse-${i}`;
        gsap.fromTo(pulse, 
          { strokeDashoffset: 100 },
          { 
            strokeDashoffset: -400, 
            duration: 2.0, 
            ease: "none",
            repeat: -1,
            repeatDelay: 2 + Math.random() * 2,
            delay: 3.5 + i * 0.5,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section className="bg-[#050a0a] text-white w-full min-h-screen py-16 md:py-24 border-t border-white/5 relative overflow-visible">
      
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,230,230,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-ultra mx-auto px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Headlines */}
        <div className="w-full text-center max-w-3xl mx-auto mb-16 lg:mb-0 lg:absolute lg:top-[-60px] lg:left-1/2 lg:-translate-x-1/2 shrink-0 z-40 lg:pointer-events-none">
          <div className="inline-block border border-accentTeal/30 text-accentTeal text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-6">
            Enterprise Solutions
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white mb-4 md:mb-6 px-4">
            Six Core Workflow<br className="hidden sm:block"/> Automation Services
          </h2>
          <p className="text-white/40 text-sm md:text-base leading-relaxed font-light mb-8 md:mb-10 mx-auto max-w-xl px-4">
            Harness the power of autonomous AI agents and intelligent pipelines to elevate enterprise efficiency.
          </p>
          <Link href="/solutions" className="inline-flex items-center gap-3 bg-white text-black rounded-full px-8 py-3 text-sm font-semibold hover:bg-accentTeal hover:text-white transition-all shadow-xl pointer-events-auto">
            Explore All Services <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        {/* Mobile Card Grid — hidden on lg+ */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-12 sm:mt-16">
          {solutions.map((sol, i) => (
            <Link
              key={i}
              href="/solutions"
              className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accentTeal/40 hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/30">{sol.id}</span>
                <h4 className="text-white font-medium text-base">{sol.title}</h4>
              </div>
              <p className="text-white/40 text-xs leading-relaxed font-light">{sol.description}</p>
              <span className="text-accentTeal text-[10px] font-bold uppercase tracking-widest mt-2 px-1">Explore →</span>
            </Link>
          ))}
        </div>

        {/* AI Network Visualization — desktop only */}
        <div className="hidden lg:flex w-full max-w-[1200px] mx-auto relative justify-center mt-12 lg:mt-32">
          <div ref={containerRef} className="relative w-full aspect-square md:aspect-[1.5/1]">
            
            {/* SVG Connections & Pulses */}
            <svg viewBox="0 0 1000 800" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
              
              <defs>
                <linearGradient id="laser" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="80%" stopColor="#ff7b00" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>

              {/* Traces */}
              {solutions.map((sol, i) => (
                <path 
                  key={`line-${i}`}
                  className="connection-line"
                  d={sol.path}
                  stroke="rgba(255, 255, 255, 0.08)" 
                  strokeWidth="1.5"
                  fill="none" 
                  strokeLinejoin="round"
                />
              ))}

              {/* Tailed Pulses */}
              {solutions.map((sol, i) => (
                <path 
                  key={`pulse-${i}`}
                  className={`pulse-beam pulse-${i}`}
                  d={sol.path}
                  stroke="url(#laser)"
                  strokeWidth="2" 
                  fill="none"
                  strokeLinejoin="round"
                  strokeDasharray="80 1000"
                  strokeDashoffset="100"
                  style={{ filter: "drop-shadow(0px 0px 8px #f97316)" }}
                />
              ))}

              {/* Bottom Traces */}
              {bottomTraces.map((path, i) => (
                <path 
                  key={`bot-line-${i}`}
                  className="connection-line"
                  d={path}
                  stroke="rgba(255, 255, 255, 0.08)" 
                  strokeWidth="1.5"
                  fill="none" 
                  strokeLinejoin="round"
                />
              ))}

              {/* Bottom Pulses */}
              {bottomTraces.map((path, i) => (
                <path 
                  key={`bot-pulse-${i}`}
                  className={`pulse-beam bot-pulse-${i}`}
                  d={path}
                  stroke="url(#laser)"
                  strokeWidth="2" 
                  fill="none"
                  strokeLinejoin="round"
                  strokeDasharray="80 1000"
                  strokeDashoffset="100"
                  style={{ filter: "drop-shadow(0px 0px 8px #f97316)" }}
                />
              ))}
            </svg>

            {/* Central Core Node (AI Chip) */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="core-node relative w-32 h-32 md:w-44 md:h-44 bg-[#0a0a0a] border border-white/5 rounded-[24px] md:rounded-[32px] flex flex-col items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.03)] overflow-hidden" style={{ opacity: 0 }}>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent z-0" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-white/90 font-semibold tracking-tight text-2xl md:text-4xl mb-1 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">TDI</span>
                </div>
                
                <div className="absolute inset-0 border border-white/5 bg-transparent rounded-[24px] md:rounded-[32px] animate-ping opacity-20 blur-sm z-10" style={{ animationDuration: '4s' }} />
              </div>
            </div>

            {/* Service Nodes */}
            {solutions.map((sol, i) => (
              <div 
                key={`wrapper-${i}`}
                className="absolute z-30 flex items-center justify-center"
                style={{
                  top: `${(sol.cy / 800) * 100}%`,
                  left: `${(sol.cx / 1000) * 100}%`,
                  transform: 'translate(-50%, -50%)' 
                }}
                onMouseEnter={() => setActiveNode(i)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="service-node relative" style={{ opacity: 0 }}>
                  <div className={`relative group cursor-pointer w-12 h-12 md:w-16 md:h-16 flex flex-col items-center justify-center bg-[#0a0a0a] border ${activeNode === i ? 'border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'border-white/10 shadow-xl'} rounded-2xl hover:border-white/20 transition-all duration-500 overflow-hidden z-20`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className={`text-[10px] md:text-sm font-medium tracking-widest transition-colors duration-300 ${activeNode === i ? 'text-white' : 'text-white/50'}`}>
                      {sol.id}
                    </span>
                  </div>

                  <div className={`hidden lg:block absolute pointer-events-auto z-10 ${sol.textPos} ${sol.textWidth}`}>
                    <h4 className="text-white font-medium text-base mb-1 tracking-tight">{sol.title}</h4>
                    <p className="text-white/40 text-[11px] leading-relaxed font-light">{sol.description}</p>
                    <Link href="/solutions" className={`text-accentTeal text-[9px] font-bold uppercase tracking-widest inline-flex items-center gap-1 mt-2 opacity-0 -translate-y-1 transition-all duration-300 ${activeNode === i ? 'opacity-100 translate-y-0' : ''}`}>
                      Explore <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:hidden w-full max-w-sm mx-auto px-4 z-40 relative mt-[-20%]">
            <div className={`w-full bg-[#0a1212] border transition-all duration-500 rounded-2xl p-6 shadow-2xl ${activeNode !== null ? 'border-accentTeal opacity-100 translate-y-0' : 'border-white/5 opacity-80 translate-y-2'}`}>
              {activeNode !== null ? (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-accentTeal text-xs font-mono font-bold tracking-widest">N-{(activeNode + 1).toString().padStart(2, '0')}</span>
                    <div className="h-px bg-accentTeal/20 flex-1" />
                  </div>
                  <h4 className="text-white font-medium text-base mb-2">{solutions[activeNode].title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed mb-4 font-light">{solutions[activeNode].description}</p>
                  <Link href="/solutions" className="text-accentTeal text-[10px] font-bold uppercase tracking-widest">Explore →</Link>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </span>
                  <p className="text-white/40 text-xs italic font-light">Tap a network node to inspect service metrics.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SolutionsGrid;
