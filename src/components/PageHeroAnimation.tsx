"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeroAnimationProps {
  type: "about" | "solutions" | "technology" | "insights";
}

export const PageHeroAnimation: React.FC<PageHeroAnimationProps> = ({ type }) => {
  return (
    <div className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center overflow-hidden">
      {type === "about" && (
        <AboutAnimation />
      )}
      {type === "solutions" && (
        <SolutionsAnimation />
      )}
      {type === "technology" && (
        <TechnologyAnimation />
      )}
      {type === "insights" && (
        <InsightsAnimation />
      )}
      
      {/* Universal Ambient Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-accentTeal/5 to-transparent pointer-events-none" />
    </div>
  );
};

const AboutAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-64 h-64 md:w-96 md:h-96"
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
            borderRadius: ["20%", "40%", "20%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
          className="absolute inset-0 border border-accentTeal/20"
          style={{ padding: i * 40 }}
        />
      ))}
      <motion.div 
        animate={{ 
          y: [-10, 10, -10],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accentTeal/10 blur-3xl rounded-full"
      />
    </motion.div>
  </div>
);

const SolutionsAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="grid grid-cols-8 gap-4 opacity-20">
      {[...Array(64)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="w-2 h-2 bg-accentTeal rounded-full"
        />
      ))}
    </div>
    <motion.div 
      animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute h-[1px] bg-gradient-to-r from-transparent via-accentTeal/40 to-transparent top-1/4"
    />
    <motion.div 
      animate={{ width: ["0%", "100%", "0%"], right: ["0%", "0%", "100%"] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute h-[1px] bg-gradient-to-r from-transparent via-accentTeal/40 to-transparent bottom-1/4"
    />
  </div>
);

const TechnologyAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg width="400" height="400" viewBox="0 0 400 400" className="opacity-30">
      <motion.path
        d="M 100 100 L 300 100 L 300 300 L 100 300 Z"
        fill="none"
        stroke="#6CF2B0"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.path
        d="M 50 200 L 350 200"
        stroke="#6CF2B0"
        strokeWidth="0.5"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="200"
        cy="200"
        r="150"
        fill="none"
        stroke="#6CF2B0"
        strokeWidth="0.5"
        strokeDasharray="10 20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);

const InsightsAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-[2px] bg-accentTeal/20 w-48"
        initial={{ x: -300, y: i * 60 - 120, opacity: 0 }}
        animate={{ 
          x: 400, 
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          duration: 3 + i, 
          repeat: Infinity, 
          delay: i * 0.5,
          ease: "linear"
        }}
      />
    ))}
  </div>
);
