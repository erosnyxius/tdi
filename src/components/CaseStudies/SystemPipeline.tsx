"use client"

import React, { useId } from "react"
import { motion } from "framer-motion"

interface Node {
  id: string
  label: string
}

interface Connection {
  from: string
  to: string
}

interface SystemPipelineProps {
  nodes: Node[]
  connections: Connection[]
  active?: boolean
}

export const SystemPipeline: React.FC<SystemPipelineProps> = ({ nodes, connections, active = false }) => {
  const uniqueId = useId().replace(/:/g, "")
  const gradientId = `gradient-${uniqueId}`

  return (
    <div className="relative w-full h-48 flex items-center justify-between px-8 md:px-16">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2" />
      
      {/* Connections with animations */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {connections.map((conn, i) => {
          const fromIdx = nodes.findIndex(n => n.id === conn.from)
          const toIdx = nodes.findIndex(n => n.id === conn.to)
          if (fromIdx === -1 || toIdx === -1) return null

          const step = 100 / (nodes.length - 1)
          const x1 = `${step * fromIdx}%`
          const x2 = `${step * toIdx}%`
          
          return (
            <motion.line
              key={`conn-${i}`}
              x1={x1}
              y1="50%"
              x2={x2}
              y2="50%"
              className="stroke-accentTeal"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.6 + i * 0.4, ease: "easeInOut" as const }}
            />
          )
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, idx) => (
        <motion.div
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: idx * 0.4 
          }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-5 h-5 rounded-full bg-accentTeal shadow-[0_0_20px_rgba(14,77,77,0.8)] border-2 border-white mb-4" />
          <span className="text-[10px] md:text-sm font-semibold text-white/90 uppercase tracking-widest whitespace-nowrap">
            {node.label}
          </span>
          
          {/* Technical scanning line */}
          <motion.div 
            animate={active ? { height: [0, 30, 0], opacity: [0, 0.5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2, delay: idx * 0.5 }}
            className="absolute -top-10 w-px bg-white/40"
          />
        </motion.div>
      ))}
    </div>
  )
}
