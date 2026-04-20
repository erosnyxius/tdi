"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const leaders = [
  {
    role: "DIRECTOR OF ENGINEERING",
    name: "Sarah Mitchell",
    image: "https://i.pravatar.cc/800?img=44",
    key: false,
  },
  {
    role: "CHAIRMAN AND CO-FOUNDER",
    name: "Riyadh Hossain",
    image: "/Riyadh.png",
    key: true,
  },
  {
    role: "COO AND CO-FOUNDER",
    name: "Intisar Tahmid Naheen",
    image: "/Intisar.png",
    key: true,
  },
  {
    role: "HEAD OF AI SYSTEMS",
    name: "Tanvir Tabassum",
    image: "/Tanvir.png",
    key: false,
  },
];

// The 2 inner (key) cards slide in from opposite sides; outer cards fade straight in
const startOffsets = ["0px", "-140px", "140px", "0px"];

const PhotoCard = ({ leader, index }: { leader: typeof leaders[0]; index: number }) => {
  const isKeyPerson = leader.key;
  const initial = { opacity: 0, x: startOffsets[index] };
  const animate = { opacity: 1, x: "0px" };

  return (
    <motion.article
      initial={initial}
      whileInView={animate}
      transition={{
        duration: isKeyPerson ? 1.4 : 0.8,
        delay: isKeyPerson ? 0.5 : 0.2,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      viewport={{ once: true, margin: "-15%" }}
      tabIndex={0}
      aria-label={`${leader.name}, ${leader.role}`}
      className={`relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#111] flex-shrink-0 snap-center shadow-2xl group focus:outline-none focus:ring-2 focus:ring-[#6CF2B0] focus-visible:ring-4
        ${isKeyPerson
          ? "w-[130px] xs:w-[150px] sm:w-[280px] md:w-[320px] lg:w-[380px] h-[210px] xs:h-[230px] sm:h-[360px] md:h-[420px] lg:h-[480px] z-20 -translate-y-1 xs:-translate-y-2 sm:-translate-y-4 md:-translate-y-8 lg:-translate-y-10"
          : "w-[90px] xs:w-[100px] sm:w-[150px] md:w-[200px] lg:w-[260px] h-[160px] xs:h-[170px] sm:h-[240px] md:h-[300px] lg:h-[360px] z-10 opacity-70 hover:opacity-100 focus:opacity-100 transition-opacity duration-500 -translate-y-1 xs:-translate-y-1 sm:-translate-y-3 md:-translate-y-5"
        }`}
    >
      {/* Full-bleed photo */}
      <Image
        src={leader.image}
        alt={`Portrait of ${leader.name}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center grayscale group-hover:grayscale-0 group-focus:grayscale-0 group-hover:scale-105 group-focus:scale-105 transition-all duration-700 ease-in-out"
      />

      {/* Left-to-right shadow vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none z-10" />
      {/* Top subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none z-10" />

      {/* Top-left: Role + Name */}
      <div className="absolute top-0 left-0 w-full z-20 p-3 sm:p-4 md:p-5 lg:p-8 flex flex-col pointer-events-none">
        <p className={`text-white/60 font-semibold mb-1 uppercase break-words ${
          isKeyPerson ? "text-[8px] sm:text-[9px] md:text-[10px] tracking-widest" : "text-[7px] sm:text-[8px] md:text-[9px] tracking-wider"
        }`}>
          {leader.role}
        </p>
        <h3 className={`text-white font-medium break-words leading-snug w-full ${
          isKeyPerson ? "text-[12px] sm:text-[14px] md:text-lg lg:text-3xl" : "text-[10px] sm:text-[12px] md:text-base lg:text-lg pr-2"
        }`}>
          {leader.name}
        </h3>
      </div>

      {/* Bottom-left: TDI Technologies watermark */}
      {isKeyPerson && (
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5 lg:bottom-8 lg:left-8 z-20 opacity-50 bg-gradient-to-tr from-white/10 to-transparent p-2 sm:p-3 md:p-4 rounded-xl backdrop-blur-sm w-max">
          <span className="font-sans font-bold text-white text-xs sm:text-sm md:text-lg lg:text-xl tracking-widest">
            TDI
            <span className="text-[7px] sm:text-[8px] font-normal tracking-normal ml-1 opacity-70 block -mt-1 uppercase">
              Technologies
            </span>
          </span>
        </div>
      )}
    </motion.article>
  );
};

const Leadership: React.FC = () => {
  return (
    <section aria-labelledby="leadership-heading" className="bg-white dark:bg-[#010404] text-textDark dark:text-white w-full flex flex-col items-center py-16 md:py-24 overflow-hidden relative border-t border-gray-100 dark:border-white/5">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        aria-hidden="true"
        className="border border-gray-200 dark:border-white/10 rounded-full px-4 py-1.5 text-[10px] tracking-widest text-accentTeal dark:text-[#6CF2B0] mb-8 uppercase font-mono font-bold"
      >
        Company
      </motion.div>

      <motion.h2
        id="leadership-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-light text-center mb-6 tracking-tight max-w-3xl px-6"
      >
        About Our Company and Leadership Team
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="text-sm md:text-base text-gray-500 dark:text-white/50 font-light text-center max-w-2xl leading-relaxed mb-10 md:mb-14 px-6"
      >
        TDI is an AI-first professional services company specializing in process and
        workflow automation through applied artificial intelligence. Headquartered in Singapore
        with a full delivery base in Bangladesh, we partner with enterprises and high-growth
        organizations to redesign how work gets done.
      </motion.p>

      {/* Desktop: 4-Photo Row: outer two stay, inner two slide in from sides */}
      <div className="hidden md:flex flex-row items-end justify-start xl:justify-center gap-4 sm:gap-5 md:gap-6 w-full max-w-[1500px] px-6 md:px-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none">
        {leaders.map((leader, i) => (
          <PhotoCard key={i} leader={leader} index={i} />
        ))}
      </div>

      {/* Mobile: Grid Layout - Key leaders on top, others below */}
      <div className="md:hidden flex flex-col items-center gap-4 w-full pb-8">
        {/* Top Row: Key Leaders */}
        <div className="flex flex-row flex-nowrap gap-2 xs:gap-3 w-full justify-center px-2">
          {leaders.filter(l => l.key).map((leader, i) => (
            <PhotoCard key={`mobile-key-${i}`} leader={leader} index={leaders.indexOf(leader)} />
          ))}
        </div>
        
        {/* Bottom Row: Other Leaders */}
        <div className="flex flex-row flex-nowrap gap-2 xs:gap-3 w-full justify-center px-2">
          {leaders.filter(l => !l.key).map((leader, i) => (
            <PhotoCard key={`mobile-other-${i}`} leader={leader} index={leaders.indexOf(leader)} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Leadership;
