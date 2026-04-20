"use client";

import React from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export const CTASection: React.FC = () => {
  return (
    <section aria-labelledby="cta-heading" className="bg-black text-white relative overflow-hidden w-full h-full flex items-center">
      {/* Decorative background elements */}
      <div aria-hidden="true" className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accentTeal/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accentTeal/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-ultra mx-auto px-6 lg:px-8 relative z-10 w-full py-12 md:py-24">
        <div className="flex flex-col items-center text-center max-w-[1400px] mx-auto min-h-[40vh] justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h2 id="cta-heading" className="text-4xl md:text-7xl lg:text-[90px] font-normal leading-[1.1] tracking-tighter mb-8 md:mb-12">
              Start Your AI <br aria-hidden="true" />
              <span className="text-accentTeal italic">Automation Audit</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl lg:text-2xl mb-10 md:mb-16 font-light max-w-4xl mx-auto leading-relaxed">
              Every engagement begins with a structured discovery session to understand your operational environment before any technical recommendations are made.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => trackEvent("cta_click", { cta_text: "Request Automation Audit", location: "footer_cta" })}
                className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-accentTeal transition-all hover:scale-105"
              >
                Request Automation Audit
              </button>
              <button 
                onClick={() => trackEvent("cta_click", { cta_text: "Contact TDI", location: "footer_cta" })}
                className="bg-black text-white border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all hover:scale-105"
              >
                Contact TDI
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
