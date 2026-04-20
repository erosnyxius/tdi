"use client"

import React from "react"
import { CaseStudyPanel } from "./CaseStudyPanel"

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

export const caseStudies: CaseStudy[] = [
  {
    id: "intrusion-monitoring",
    title: "Automated Intrusion Monitoring",
    client: "Bangladesh Army",
    problem: "Monitoring CCTV manually across many feeds",
    systemSummary: "AI intrusion monitoring pipeline",
    systemNote: "This system converts passive CCTV → automated security monitoring workflow.",
    capabilities: [
      "Real-time person detection",
      "Restricted zone monitoring",
      "CCTV stream analysis",
      "Event-based alert generation"
    ],
    impact: [
      "Continuous 24/7 monitoring",
      "Reduced human observation dependency",
      "Faster detection of unauthorized presence"
    ],
    pipeline: {
      nodes: [
        { id: "cam", label: "CCTV FEEDS" },
        { id: "ai", label: "AI DETECTION" },
        { id: "alert", label: "ALERT SYSTEM" }
      ],
      connections: [
        { from: "cam", to: "ai" },
        { from: "ai", to: "alert" }
      ]
    }
  },
  {
    id: "unilever-u-lens",
    title: "Retail Execution Visibility",
    client: "Unilever Bangladesh",
    problem: "Lack of real-time visibility in 500k+ retail outlets",
    systemSummary: "U-Lens Platform",
    systemNote: "Proof-based reporting before day close.",
    capabilities: [
      "geo-validated store visits",
      "computer-vision shelf analysis",
      "share-of-shelf measurement",
      "POSM tracking",
      "real-time dashboards"
    ],
    impact: [
      "visibility across 500,000+ retail outlets",
      "40% improvement in execution efficiency",
      "25% reduction in operational cost"
    ],
    pipeline: {
      nodes: [
        { id: "store", label: "RETAIL OUTLET" },
        { id: "vis", label: "COMPUTER VISION" },
        { id: "dash", label: "REAL-TIME DASHBOARD" }
      ],
      connections: [
        { from: "store", to: "vis" },
        { from: "vis", to: "dash" }
      ]
    }
  },
  {
    id: "garment-quality",
    title: "Garment Quality Inspection",
    client: "Industry: Manufacturing",
    industry: "Manufacturing",
    problem: "Manual inspection inconsistency and low throughput",
    systemSummary: "Automated Garment Quality Inspection",
    capabilities: [
      "defect detection",
      "stitching error detection",
      "fabric damage detection",
      "production line monitoring"
    ],
    impact: [
      "real-time defect detection",
      "consistent inspection standards",
      "reduced manual inspection workload"
    ],
    pipeline: {
      nodes: [
        { id: "line", label: "CAM: FABRIC SCAN" },
        { id: "ml", label: "DEFECT ANALYZER" },
        { id: "qa", label: "REJECT HANDLER" }
      ],
      connections: [
        { from: "line", to: "ml" },
        { from: "ml", to: "qa" }
      ]
    }
  },
  {
    id: "doc-processing",
    title: "Document Processing Pipeline",
    client: "Industry: Financial Services",
    industry: "Financial Services",
    problem: "High administrative cost and slow data extraction",
    systemSummary: "AI Document Processing Pipeline",
    capabilities: [
      "OCR extraction",
      "document classification",
      "automated routing",
      "structured data generation"
    ],
    impact: [
      "faster document processing",
      "improved data accuracy",
      "reduced administrative workload"
    ],
    pipeline: {
      nodes: [
        { id: "doc", label: "RAW DOCUMENTS" },
        { id: "ocr", label: "OCR ENGINE" },
        { id: "data", label: "STRUCTURED DATA" }
      ],
      connections: [
        { from: "doc", to: "ocr" },
        { from: "ocr", to: "data" }
      ]
    }
  },
  {
    id: "safety-monitoring",
    title: "Industrial Safety Monitoring",
    client: "Industry: Industrial manufacturing",
    industry: "Industrial manufacturing",
    problem: "Manual safety supervision gaps in high-risk zones",
    systemSummary: "Industrial Safety Monitoring",
    capabilities: [
      "PPE compliance detection",
      "restricted zone monitoring",
      "safety alerts",
      "compliance logging"
    ],
    impact: [
      "improved safety compliance",
      "faster violation detection",
      "automated supervision of safety protocols"
    ],
    pipeline: {
      nodes: [
        { id: "safety", label: "SAFETY CAMS" },
        { id: "logic", label: "RULE ENGINE" },
        { id: "log", label: "COMPLIANCE LOG" }
      ],
      connections: [
        { from: "safety", to: "logic" },
        { from: "logic", to: "log" }
      ]
    }
  }
];
