"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SystemPipeline } from "./SystemPipeline"
import { ImpactMetrics } from "./ImpactMetrics"

export interface CaseStudy {
  id: string
  title: string
  client: string
  industry?: string
  problem?: string
  systemSummary: string
  capabilities: string[]
  impact: string[]
  systemNote?: string
  pipeline: {
    nodes: { id: string; label: string }[]
    connections: { from: string; to: string }[]
  }
}

interface CaseStudyPanelProps {
  study: CaseStudy
}

export const CaseStudyPanel: React.FC<CaseStudyPanelProps> = ({ study }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.4, once: false })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  }

  return (
    <div ref={ref} className="w-full flex-shrink-0 h-[100svh] flex flex-col justify-center px-6 md:px-24 bg-black overflow-hidden py-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto w-full flex flex-col h-full justify-center"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12 shrink-0">
          <div className="space-y-3">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none"
            >
              {study.title}
            </motion.h2>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 lg:gap-12">
              <div>
                <p className="text-accentTeal text-[10px] font-bold uppercase tracking-widest mb-1">Client / Industry</p>
                <p className="text-white text-lg lg:text-xl font-medium">{study.client || study.industry}</p>
              </div>
              {study.problem && (
                <div>
                  <p className="text-accentTeal text-[10px] font-bold uppercase tracking-widest mb-1">Problem</p>
                  <p className="text-white text-base lg:text-lg font-medium max-w-md line-clamp-2">{study.problem}</p>
                </div>
              )}
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="md:text-right hidden sm:block">
             <p className="text-accentTeal text-[10px] font-bold uppercase tracking-widest mb-1">System Architecture</p>
             <p className="text-white/60 text-xs font-mono">{study.systemSummary}</p>
          </motion.div>
        </div>

        {/* Visual System Diagram */}
        <motion.div variants={itemVariants} className="mb-6 lg:mb-10 shrink-0">
          <SystemPipeline 
            nodes={study.pipeline.nodes} 
            connections={study.pipeline.connections}
            active={isInView}
          />
        </motion.div>

        {study.systemNote && (
          <motion.div 
            variants={itemVariants}
            className="mb-8 lg:mb-12 p-3 border-l-2 border-accentTeal bg-accentTeal/5 text-white/70 italic text-xs lg:text-sm font-light shrink-0"
          >
            {study.systemNote}
          </motion.div>
        )}

        {/* Impact Section */}
        <motion.div variants={itemVariants} className="shrink-0">
          <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white/10 pb-3 mb-4 lg:mb-6">
            Operational Impact & Metrics
          </h3>
          <ImpactMetrics metrics={study.impact} active={isInView} />
        </motion.div>
      </motion.div>
    </div>
  )
}
