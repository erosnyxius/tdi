"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface LayeredSlideProps {
  children: React.ReactNode
  className?: string
  index?: number
  containerRef?: React.RefObject<HTMLDivElement | null>
  disableTransform?: boolean
}

export const LayeredSlide: React.FC<LayeredSlideProps> = ({ 
  children, 
  className, 
  index = 0, 
  containerRef,
  disableTransform = false 
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  // Removed isDesktop check to allow animations across all devices
  const { scrollYProgress } = useScroll({
    target: elementRef,
    container: containerRef,
    offset: ["start end", "end start"]
  })

  // Entrance and Exit transforms — active unless disabled
  const y = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], !disableTransform ? ["20vh", "0vh", "0vh", "-10vh"] : ["0vh", "0vh", "0vh", "0vh"])
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], !disableTransform ? [0.85, 1, 1, 0.95] : [1, 1, 1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], !disableTransform ? [0, 1, 1, 0] : [1, 1, 1, 1])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], !disableTransform ? [15, 0, -5] : [0, 0, 0])

  return (
    <div 
      ref={elementRef} 
      className={`relative w-full overflow-visible min-h-[100dvh] md:snap-start ${className}`}
      style={{ perspective: !disableTransform ? "2000px" : "none" }}
    >
      <motion.div
        style={{
          y,
          scale,
          opacity,
          rotateX,
          transformOrigin: "center center",
          zIndex: 10 + index
        }}
        className="w-full min-h-full h-auto flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  )
}
