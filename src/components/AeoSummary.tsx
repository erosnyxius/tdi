"use client";

import React from "react";

export const AeoSummary: React.FC = () => {
  return (
    <section className="bg-black text-white/80 py-16 px-6 md:px-24 border-t border-white/5" aria-labelledby="aeo-summary-heading">
      <div className="max-w-[1400px] mx-auto">
        <h2 id="aeo-summary-heading" className="text-3xl md:text-5xl font-normal mb-12">
          Company Overview & Capabilities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-accentTeal font-bold uppercase tracking-widest text-sm mb-4">What TDI Does</h3>
            <p className="text-sm font-light leading-relaxed">
              We design and deploy purpose-built AI systems that automate complex processes driving enterprise and high-growth business performance. We focus exclusively on production-grade automation, not demonstrations.
            </p>
          </div>
          
          <div>
            <h3 className="text-accentTeal font-bold uppercase tracking-widest text-sm mb-4">Industries Served</h3>
            <ul className="text-sm font-light space-y-2">
              <li>Manufacturing</li>
              <li>Retail & E-commerce</li>
              <li>Logistics & Supply Chain</li>
              <li>Financial Services</li>
              <li>Enterprise Operations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-accentTeal font-bold uppercase tracking-widest text-sm mb-4">AI Systems Built</h3>
            <ul className="text-sm font-light space-y-2">
              <li>Operational AI Agents</li>
              <li>Visual Process Automation</li>
              <li>Language & Document Intelligence</li>
              <li>Go-to-Market Automation</li>
              <li>Core MVP AI Infrastructure</li>
            </ul>
          </div>

          <div>
            <h3 className="text-accentTeal font-bold uppercase tracking-widest text-sm mb-4">Technology Stack</h3>
            <ul className="text-sm font-light space-y-2">
              <li>Next.js & React</li>
              <li>Python & C++</li>
              <li>n8n, LangChain, LangGraph</li>
              <li>Computer Vision (OpenCV, YOLO)</li>
              <li>Large Language Models (LLMs)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
