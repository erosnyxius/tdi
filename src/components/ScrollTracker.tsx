"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export function ScrollTracker() {
  const trackedDepths = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (height <= 0) return;
      const scrolled = (winScroll / height) * 100;

      const depths = [25, 50, 75, 90]; // Using 90 instead of 100 as pure 100% is rarely precisely hit due to scroll bounds.

      depths.forEach((depth) => {
        if (scrolled >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          trackEvent("scroll_depth", { depth: `${depth === 90 ? 100 : depth}%` });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
