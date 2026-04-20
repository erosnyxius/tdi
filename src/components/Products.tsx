"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  {
    id: "001",
    title: "Operational AI Agents",
    description: "Build the agents that run your operations. We build agents for Sales, Operations, and Support that reason and execute tasks autonomously.",
    pattern: (
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <svg viewBox="0 0 200 100" className="w-full h-full" fill="none" opacity="0.3">
          <path stroke="white" strokeWidth="2" strokeDasharray="4 8" d="M10 90 A90 90 0 0 1 190 90" />
          <path stroke="white" strokeWidth="2" strokeDasharray="4 8" d="M30 90 A70 70 0 0 1 170 90" />
          <path stroke="white" strokeWidth="2" strokeDasharray="4 8" d="M50 90 A50 50 0 0 1 150 90" />
          <path stroke="white" strokeWidth="2" strokeDasharray="4 8" d="M70 90 A30 30 0 0 1 130 90" />
        </svg>
      </div>
    ),
  },
  {
    id: "002",
    title: "Intelligent Pipelines",
    description: "Replace manual coordination with automated pipelines for document processing, reporting, and cross-platform data synchronization.",
    pattern: (
      <div className="absolute inset-0 flex items-center justify-center opacity-60 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[size:16px_16px]">
        {/* Simple diagonal slash for decoration */}
        <div className="w-[120%] h-px bg-white/20 -rotate-12 transform absolute top-1/2 left-[-10%]" />
      </div>
    ),
  },
  {
    id: "003",
    title: "Visual Automation",
    description: "AI systems for production line quality inspection, automated defect detection, and continuous real-time operational monitoring.",
    pattern: (
      <div className="absolute inset-0 flex items-center justify-center opacity-60 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:8px_8px]">
      </div>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

const Products: React.FC = () => {
  return (
    <section className="bg-[#0d1a1a] text-white w-full h-full flex items-center py-12 md:py-16 border-t border-white/5 overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariants}
        className="max-w-[1800px] mx-auto px-6 lg:px-8 flex flex-col items-center"
      >
        
        {/* Header */}
        <motion.div variants={itemVariants} className="border border-white/20 rounded-full px-4 py-1 text-xs tracking-wider text-white/50 mb-8 uppercase">
          Our Products
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-2xl md:text-5xl font-light text-center mb-8 md:mb-16 lg:mb-24 leading-snug">
          Explore our Cutting-Edge <br className="hidden md:block"/>
          Machine Learning Products
        </motion.h2>

        {/* Horizontal Slider/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {products.map((product) => (
            <motion.article 
              key={product.id} 
              variants={itemVariants}
              aria-label={product.title}
              className="group bg-[#152525] hover:bg-[#1a2e2e] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col transition-all duration-300 min-h-[300px] md:min-h-[420px]"
            >
              {/* Top Graphic Panel */}
              <div aria-hidden="true" className="relative h-56 border-b border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent flex items-start justify-end p-6">
                <span className="text-xs font-mono text-white/30 z-10 block">
                  / {product.id}
                </span>
                {product.pattern}
              </div>

              {/* Bottom Content Panel */}
              <div className="flex flex-col flex-1 p-8 lg:p-10 justify-center items-center text-center relative z-10">
                <h3 className="text-xl md:text-2xl font-medium mb-4 flex items-center justify-center gap-2 group-hover:text-accentTeal transition-colors">
                  {product.title} <span aria-hidden="true" className="text-sm font-light leading-none">↗</span>
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-light px-2 mb-8 max-w-sm">
                  {product.description}
                </p>
                
                <Link 
                  href="#" 
                  aria-label={`Learn more about ${product.title}`}
                  className="mt-auto text-xs uppercase tracking-widest font-semibold border-b border-white hover:text-accentTeal hover:border-accentTeal transition-all pb-1"
                >
                  Learn more
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Navigation Arrows */}
        <motion.div variants={itemVariants} className="flex gap-4 mt-16 text-white/40" role="group" aria-label="Product navigation">
          <button aria-label="Previous products" className="w-10 h-10 flex items-center justify-center hover:text-white transition-colors">
            <span aria-hidden="true">&larr;</span>
          </button>
          <button aria-label="Next products" className="w-10 h-10 flex items-center justify-center hover:text-white transition-colors">
            <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Products;
