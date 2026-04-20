"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "John Wilson",
    role: "Director of Operations",
    quote: "The predictive modeling tools provided by TDI have completely transformed our supply chain logistics, saving us millions annually.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "VP of Analytics",
    quote: "Exceptional machine learning infrastructure. We seamlessly deployed models that historically took us months to set up.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

const partners = [
  "Campbell's",
  "CME Group",
  "N", // McDonald's-like 'M' placeholder or simple glyph
  "Campbell's",
  "NSE",
  "HERSHEY'S",
  "Campbell's",
  "CME Group",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  },
};

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      aria-label="Client testimonials"
      className="bg-white text-textDark w-full flex items-center py-12 md:py-16"
    >
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariants}
        className="max-w-ultra mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start"
      >
        
        {/* Left Column: Headlines and Logos */}
        <div className="flex flex-col h-full justify-between">
          <motion.div variants={itemVariants}>
            <div className="inline-block border border-gray-200 rounded-full px-4 py-1 text-xs tracking-wider text-gray-500 mb-8 uppercase">
              Partners
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight max-w-[500px]">
              We Build Enterprise AI Solutions For Our Clients
            </h2>
          </motion.div>

          {/* Partner Logos Strip — decorative */}
          <motion.div variants={itemVariants} aria-hidden="true" className="hidden lg:flex mt-10 lg:mt-32 w-full overflow-hidden gap-8 md:gap-12 opacity-50 grayscale select-none">
            {partners.map((partner, idx) => (
              <span key={idx} className="text-xl md:text-2xl font-bold font-sans whitespace-nowrap shrink-0">
                {partner}
              </span>
            ))}
          </motion.div>

          {/* Mobile Partner Carousel */}
          <motion.div variants={itemVariants} aria-hidden="true" className="lg:hidden mt-8 w-full overflow-hidden">
            <div className="partner-carousel flex whitespace-nowrap animate-marquee gap-6 opacity-60 grayscale">
              {[...partners, ...partners].map((partner, idx) => (
                <span key={idx} className="text-sm md:text-base font-bold font-sans whitespace-nowrap shrink-0">
                  {partner}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Testimonial Card */}
        <motion.div
          variants={itemVariants}
          role="region"
          aria-label="Testimonials"
          aria-roledescription="carousel"
          className="relative border-t border-gray-200 pt-10 mt-10 lg:mt-0 lg:border-t-0 lg:pt-0"
        >
          {/* Visually hidden live region so AT announces slide changes */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Testimonial {current + 1} of {testimonials.length}: {testimonials[current].name}, {testimonials[current].role}.
          </div>
          
          <div className="flex gap-4 md:gap-6 mb-6 md:mb-12 items-center">
            {/* Quote Icon */}
            <div aria-hidden="true" className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center font-serif text-3xl text-gray-400 italic font-bold">
              &ldquo;
            </div>
            
            {/* Avatar & Name */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden grayscale">
                <Image
                  src={testimonials[current].avatar}
                  alt={`Portrait of ${testimonials[current].name}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{testimonials[current].name}</h4>
                <p className="text-sm text-gray-500">{testimonials[current].role}</p>
              </div>
            </div>
          </div>

          {/* Quote Body */}
          <p className="text-xl md:text-3xl lg:text-[40px] font-light leading-[1.3] text-gray-800 mb-8 md:mb-16">
            <span className="text-gray-300">"</span>
            {testimonials[current].quote}
            <span className="text-gray-300">"</span>
          </p>

          {/* Nav Arrows */}
          <div className="flex gap-8 text-gray-400" role="group" aria-label="Testimonial navigation">
            <button 
              onClick={prev}
              aria-label={`Previous testimonial — ${testimonials[(current - 1 + testimonials.length) % testimonials.length].name}`}
              className="hover:text-black transition-colors p-1"
            >
              <svg aria-hidden="true" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <button 
              onClick={next}
              aria-label={`Next testimonial — ${testimonials[(current + 1) % testimonials.length].name}`}
              className="hover:text-black transition-colors p-1"
            >
              <svg aria-hidden="true" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Testimonials;
