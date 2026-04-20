"use client"

import React, { createContext, useContext, useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type TransitionContextType = {
  transitionTo: (href: string) => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export const useWebGLTransition = () => {
  const context = useContext(TransitionContext)
  if (!context) throw new Error("useWebGLTransition must be used within a WebGLTransitionProvider")
  return context
}

export const WebGLTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  const progressRef = useRef(0)
  const opacityRef = useRef(0)
  const requestRef = useRef<number>(undefined)
  const targetHref = useRef<string | null>(null)
  const phase = useRef<"idle" | "in" | "out">("idle")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { alpha: true })
    if (!gl) return

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    window.addEventListener("resize", resize)
    resize()

    const vs = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fs = `
      precision highp float;
      varying vec2 vUv;
      uniform float uProgress;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uOpacity;

      // Simple noise function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / uResolution.y;
        vec2 p = uv;
        p.x *= aspect;

        // Particle dissolve logic
        // We use multi-layered noise for "fine" particles
        float n = noise(p * 200.0 + uTime * 0.1) * 0.2;
        n += noise(p * 100.0 - uTime * 0.2) * 0.3;
        n += noise(p * 50.0 + uTime * 0.05) * 0.5;

        // Progress threshold
        // As uProgress goes 0->1, the edge moves
        float threshold = uProgress * 1.2 - 0.1;
        
        // Circular/Directional flow
        float dist = distance(uv, vec2(0.5)) * 0.5;
        float edge = threshold - dist;
        
        float alpha = smoothstep(edge - 0.1, edge + 0.1, n);
        
        // Beautiful deep teal color (the TDI brand color)
        vec3 color = mix(vec3(0.02, 0.1, 0.1), vec3(0.05, 0.3, 0.3), n);
        
        // Add some highlights for "glowy" particles
        color += smoothstep(0.7, 1.0, n) * 0.2;

        gl_FragColor = vec4(color * alpha * uOpacity, alpha * uOpacity);
      }
    `

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vs))
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uProgress = gl.getUniformLocation(program, "uProgress")
    const uTime = gl.getUniformLocation(program, "uTime")
    const uResolution = gl.getUniformLocation(program, "uResolution")
    const uOpacity = gl.getUniformLocation(program, "uOpacity")

    let startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const time = (now - startTime) / 1000

      if (phase.current === "in") {
        progressRef.current += 0.02
        opacityRef.current = Math.min(1, opacityRef.current + 0.1)
        if (progressRef.current >= 1) {
          phase.current = "idle"
          if (targetHref.current) {
            router.push(targetHref.current)
            // Wait a tiny bit for the page to load/render
            setTimeout(() => {
              phase.current = "out"
            }, 100)
          }
        }
      } else if (phase.current === "out") {
        progressRef.current -= 0.02
        if (progressRef.current <= 0) {
          progressRef.current = 0
          opacityRef.current = Math.max(0, opacityRef.current - 0.1)
          if (opacityRef.current <= 0) {
            phase.current = "idle"
            setIsTransitioning(false)
          }
        }
      }

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.uniform1f(uProgress, progressRef.current)
      gl.uniform1f(uTime, time)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uOpacity, opacityRef.current)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      requestRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [router])

  const transitionTo = (href: string) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    targetHref.current = href
    progressRef.current = 0
    opacityRef.current = 0
    phase.current = "in"
  }

  return (
    <TransitionContext.Provider value={{ transitionTo, isTransitioning }}>
      {children}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
        style={{ opacity: isTransitioning ? 1 : 0, transition: "opacity 0.3s" }}
      />
    </TransitionContext.Provider>
  )
}
