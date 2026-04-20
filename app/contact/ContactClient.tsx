"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { LayeredSlide } from "@/components/LayeredSlide";
import Footer from "@/components/Footer";

export default function ContactClient() {
  const [formStarted, setFormStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent("form_start", { form_name: "Discovery Session Form" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      trackEvent("form_error", { form_name: "Discovery Session Form", error: "validation_failed" });
      form.reportValidity();
      return;
    }
    trackEvent("form_submit", { form_name: "Discovery Session Form" });
    setIsSubmitted(true);
    form.reset();
  };

  return (
    <div 
      ref={scrollContainerRef}
      id="main-scroll-container"
      className="relative h-[100svh] overflow-y-auto overflow-x-hidden bg-black scroll-smooth md:snap-y md:snap-mandatory"
    >
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Intro Header */}
        <LayeredSlide index={0} containerRef={scrollContainerRef}>
          <section className="bg-black pt-32 h-[100svh] flex items-center overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 md:mb-8">
                  Start Your <br/><span className="text-accentTeal">Automation Discovery</span>
                </h1>
                <p className="text-white/50 text-base md:text-xl font-light leading-relaxed max-w-3xl">
                  Every engagement begins with a structured discovery session to understand your operational environment, current automation maturity, and specific objectives.
                </p>
              </motion.div>
            </div>
          </section>
        </LayeredSlide>

        {/* Form and info section */}
        <LayeredSlide index={1} containerRef={scrollContainerRef}>
          <section className="bg-black h-[100svh] flex items-center overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#0c1414] border border-white/5 rounded-3xl p-6 lg:p-8"
                >
                  <h2 className="text-xl font-normal text-white mb-6" id="form-heading">Request a Discovery Session</h2>
                  <form 
                    className="space-y-4 lg:space-y-5" 
                    aria-labelledby="form-heading" 
                    noValidate 
                    onSubmit={handleSubmit}
                    onChange={handleFocus}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-name" className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Full Name <span aria-label="required" className="text-red-400">*</span></label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          autoComplete="name"
                          className="bg-transparent border-b border-white/10 py-2 lg:py-3 text-white focus:outline-none focus:border-accentTeal transition-colors placeholder:text-white/20 text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-email" className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Work Email <span aria-label="required" className="text-red-400">*</span></label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          autoComplete="email"
                          className="bg-transparent border-b border-white/10 py-2 lg:py-3 text-white focus:outline-none focus:border-accentTeal transition-colors placeholder:text-white/20 text-sm"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-org" className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Organization &amp; Industry</label>
                      <input
                        id="contact-org"
                        type="text"
                        autoComplete="organization"
                        className="bg-transparent border-b border-white/10 py-2 lg:py-3 text-white focus:outline-none focus:border-accentTeal transition-colors placeholder:text-white/20 text-sm"
                        placeholder="Acme Corp - Logistics"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-objective" className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Automation Objective</label>
                      <textarea
                        id="contact-objective"
                        rows={2}
                        className="bg-transparent border border-white/10 p-3 rounded-xl text-white text-xs lg:text-sm focus:outline-none focus:border-accentTeal transition-colors placeholder:text-white/20"
                        placeholder="Tell us about the processes you are looking to automate..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-white text-black font-semibold py-3 lg:py-3.5 rounded-full hover:bg-accentTeal hover:text-white transition-all shadow-xl text-sm"
                    >
                      Request Discovery Session
                    </button>
                    {isSubmitted && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-accentTeal/10 border border-accentTeal/20 text-accentTeal text-[12px] font-medium text-center">
                        Thank you! Your discovery request has been received. We will be in touch shortly.
                      </motion.div>
                    )}
                  </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col justify-between py-10"
                >
                  <div className="space-y-8 lg:space-y-10">
                    <div>
                      <h3 className="text-[10px] uppercase tracking-widest text-accentTeal font-bold mb-4 lg:mb-6" id="contact-details-heading">Contact Details</h3>
                      <div className="space-y-3 lg:space-y-4" aria-labelledby="contact-details-heading">
                        <a
                          href="mailto:connect@thedataisland.com"
                          className="block text-lg lg:text-2xl text-white font-medium hover:text-accentTeal transition-colors"
                        >
                          connect@thedataisland.com
                        </a>
                        <a
                          href="tel:+880171100000"
                          className="block text-lg lg:text-2xl text-white font-medium hover:text-accentTeal transition-colors"
                        >
                          +880 1711 XXX XXX
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[10px] uppercase tracking-widest text-accentTeal font-bold mb-4 lg:mb-6">Strategic Locations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="flex flex-col gap-2">
                          <span className="text-white text-base lg:text-lg font-medium">Singapore (HQ)</span>
                          <p className="text-white/40 text-[12px] lg:text-sm leading-relaxed font-light">The Data Island LLC<br/>Marina Bay, Singapore</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-white text-base lg:text-lg font-medium">Bangladesh (Ops)</span>
                          <p className="text-white/40 text-[12px] lg:text-sm leading-relaxed font-light">Dhaka City Office<br/>Bangladesh</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-white/30 text-[10px] font-light max-w-sm">
                      We generally respond to discovery requests within 24–48 hours to schedule an initial consultation.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </LayeredSlide>

        <LayeredSlide index={2} containerRef={scrollContainerRef}>
          <Footer />
        </LayeredSlide>
      </main>
    </div>
  );
}


