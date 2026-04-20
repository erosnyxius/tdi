"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { BrickSurface } from "./BrickSurface";
import { ParticleField } from "./ParticleField";

export const MetricsWall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView]               = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);
  const [mousePos, setMousePos]           = useState({ x: -999, y: -999 });
  const [isTouch, setIsTouch]             = useState(false);
  const particleDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect touch-first / non-hover devices
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(hover: none)").matches);
    };
    checkTouch();
    // Optional: listen for changes if user connects mouse/unplugs
    const mql = window.matchMedia("(hover: none)");
    mql.addEventListener("change", checkTouch);
    return () => mql.removeEventListener("change", checkTouch);
  }, []);

  // IntersectionObserver — fires metric counters when section enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  }, [isTouch]);

  const handleMouseEnter = useCallback(() => {
    if (isTouch) return;
    particleDelayRef.current = setTimeout(() => setParticlesActive(true), 120);
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return;
    if (particleDelayRef.current) clearTimeout(particleDelayRef.current);
    setParticlesActive(false);
    setMousePos({ x: -999, y: -999 });
  }, [isTouch]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #0f2f2c 0%, #061414 50%, #010404 100%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Brick wall — height driven by BrickSurface paddingBottom aspect ratio */}
      <div className="relative z-10 w-full max-w-[1260px] mx-auto px-4 py-2">
        <BrickSurface
          inView={inView}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          isTouch={isTouch}
        />
      </div>

      {/* Firefly particles — only on non-touch */}
      {!isTouch && (
        <ParticleField
          active={particlesActive}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />
      )}

      {/* 4-sided vignette — "wall extends beyond frame" look */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 20,
          background: [
            "linear-gradient(to right,  #010404 0%, transparent 10%, transparent 90%, #010404 100%)",
            "linear-gradient(to bottom, #010404 0%, transparent 10%, transparent 95%, #010404 100%)",
          ].join(", "),
        }}
      />
    </section>
  );
};
