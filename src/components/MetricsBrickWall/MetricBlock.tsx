"use client";

import React, { useRef, useEffect, useState } from "react";

interface MetricBlockProps {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  delay?: number;
}

export const MetricBlock: React.FC<MetricBlockProps> = ({
  value,
  suffix,
  label,
  inView,
  delay = 0,
}) => {
  const displayRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [inView, delay]);

  useEffect(() => {
    if (!visible || !displayRef.current) return;

    const duration = 1300;
    const startTime = performance.now();
    const node = displayRef.current;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = String(Math.floor(eased * value));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        node.textContent = String(value);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [visible, value]);

  return (
    <div
      className="flex flex-col justify-center items-center h-full text-center p-2 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex items-baseline gap-0 leading-none mb-2">
        <span
          ref={displayRef}
          className="text-white font-semibold"
          style={{ fontSize: "clamp(2.5rem, 10vw, 3.5rem)", lineHeight: 1 }}
        >
          0
        </span>
        <span
          className="font-semibold"
          style={{ fontSize: "clamp(2.5rem, 10vw, 3.5rem)", lineHeight: 1, color: "#6CF2B0" }}
        >
          {suffix}
        </span>
      </div>
      <p
        className="font-light leading-snug text-white/70"
        style={{ fontSize: "clamp(0.75rem, 3vw, 0.875rem)" }}
      >
        {label}
      </p>
    </div>
  );
};
