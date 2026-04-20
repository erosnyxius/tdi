"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { MetricBlock } from "./MetricBlock";

// brick wall layout constants
const BRICK_W = 320;
const BRICK_H = 160;
const TOTAL_W = BRICK_W * 3; // 960px — scales via CSS
const TOTAL_H = BRICK_H * 3; // 480px

interface BrickDef {
  id: number;
  x: number;
  y: number;
  metric?: { value: number; suffix: string; label: string; delay: number };
}

const BRICKS: BrickDef[] = [
  // Row 1 (y=0) — 3 bricks
  { id: 1, x: 0, y: 0, metric: { value: 60, suffix: "+", label: "Projects Completed", delay: 0 } },
  { id: 2, x: 320, y: 0, metric: { value: 120, suffix: "+", label: "Engineers Available", delay: 150 } },
  { id: 3, x: 640, y: 0 },
  // Row 2 (y=160) — 2 offset bricks
  { id: 4, x: 160, y: 160 },
  { id: 5, x: 480, y: 160 },
  // Row 3 (y=320) — 3 bricks
  { id: 6, x: 0, y: 320, metric: { value: 25, suffix: "+", label: "AI Systems Deployed", delay: 300 } },
  { id: 7, x: 320, y: 320 },
  { id: 8, x: 640, y: 320, metric: { value: 8, suffix: "+", label: "Industries Served", delay: 450 } },
];

interface BrickSurfaceProps {
  inView: boolean;
  mouseX: number;
  mouseY: number;
  isTouch: boolean;
}

export const BrickSurface: React.FC<BrickSurfaceProps> = ({ inView, mouseX, mouseY, isTouch }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brickRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const frameRef = useRef<number>(0);

  const updateGlow = useCallback(() => {
    if (isTouch || !containerRef.current || mouseX < -100) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const localMX = mouseX - containerRect.left;
    const localMY = mouseY - containerRect.top;
    const scale = containerRect.width / TOTAL_W;
    const GLOW_RADIUS = 260;

    brickRefs.current.forEach((el, id) => {
      const brick = BRICKS.find(b => b.id === id);
      if (!brick || !el) return;

      const brickCX = (brick.x + BRICK_W / 2) * scale;
      const brickCY = (brick.y + BRICK_H / 2) * scale;
      const dist = Math.sqrt((localMX - brickCX) ** 2 + (localMY - brickCY) ** 2);
      const proximity = Math.max(0, 1 - dist / GLOW_RADIUS);
      const edgeOpacity = Math.pow(proximity, 1.5) * 0.8;

      el.style.setProperty("--edge-glow", String(edgeOpacity));
      el.style.setProperty("--local-mx", `${localMX - brick.x * scale}px`);
      el.style.setProperty("--local-my", `${localMY - brick.y * scale}px`);
    });

    frameRef.current = requestAnimationFrame(updateGlow);
  }, [mouseX, mouseY]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(updateGlow);
    return () => cancelAnimationFrame(frameRef.current);
  }, [updateGlow]);

  return (
    <>
      {/* Mobile Fallback: 2x2 Grid */}
      <div className="w-full grid grid-cols-2 gap-3 xs:gap-4 md:hidden py-8 px-2">
        {BRICKS.filter(b => b.metric).map(brick => (
          <div key={`mob-${brick.id}`} className="relative bg-white/5 border border-white/10 rounded-lg xs:rounded-xl p-2 xs:p-4 min-h-[120px] xs:min-h-[140px] flex flex-col justify-center items-center text-center shadow-lg">
            {brick.metric && (
              <MetricBlock
                value={brick.metric.value}
                suffix={brick.metric.suffix}
                label={brick.metric.label}
                inView={inView}
                delay={brick.metric.delay}
              />
            )}
          </div>
        ))}
      </div>

      {/* Desktop Asymmetric Canvas */}
      <div
        ref={containerRef}
        className="relative w-full hidden md:block"
        style={{ paddingBottom: `${(TOTAL_H / TOTAL_W) * 100}%` }}
      >
        <div className="absolute inset-0">
          {BRICKS.map(brick => (
            <div
              key={brick.id}
              ref={el => {
                if (el) brickRefs.current.set(brick.id, el);
                else brickRefs.current.delete(brick.id);
              }}
              className="absolute"
              style={{
                left: `${(brick.x / TOTAL_W) * 100}%`,
                top: `${(brick.y / TOTAL_H) * 100}%`,
                width: `${(BRICK_W / TOTAL_W) * 100}%`,
                height: `${(BRICK_H / TOTAL_H) * 100}%`,
              }}
            >
              {/* Base brick surface */}
              <div className="absolute inset-0 rounded-lg"
                style={{ background: "rgba(255,255,255,0.01)" }} />

              {/* Faint structural border */}
              <div className="absolute inset-0 rounded-lg pointer-events-none"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }} />

              {/* Cursor-driven illumination */}
              <div className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: "radial-gradient(circle 280px at var(--local-mx,-9999px) var(--local-my,-9999px), rgba(80,255,200,0.18), transparent 60%)",
                  zIndex: 1,
                }}
              />

              {/* Edge glow */}
              <div className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(80,255,200,var(--edge-glow,0))",
                  zIndex: 2,
                }}
              />

              {/* Seam path glow */}
              <div className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  boxShadow: "0 0 10px rgba(80,255,200,calc(var(--edge-glow,0)*0.6))",
                  zIndex: 2,
                }}
              />

              {brick.metric && (
                <div className="absolute inset-0 z-10">
                  <MetricBlock
                    value={brick.metric.value}
                    suffix={brick.metric.suffix}
                    label={brick.metric.label}
                    inView={inView}
                    delay={brick.metric.delay}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
