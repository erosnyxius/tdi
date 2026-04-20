"use client"

import React, { useRef, useEffect } from "react"

export default function DotFieldShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    const resizeView = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.65;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    // Initial resize inside a layout effect or small timeout ensures parent node exists
    setTimeout(resizeView, 0);
    window.addEventListener("resize", resizeView)

    const vertex = `
      attribute vec2 position;
      void main(){
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragment = `
      precision mediump float;

      uniform vec2 resolution;
      uniform float time;

      void main(){
        // Normalized coordinates for the macro wave field
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        
        // Boostedfrequencies to match the multiple diagonal bands in the reference image
        float f =
          sin(uv.x * 8.0 + time * 0.6) +
          cos(uv.y * 7.0 + time * 0.4) +
          sin((uv.x + uv.y) * 10.0 + time * 0.3);

        // Normalize wave interference to 0.0 -> 1.0
        float brightness = clamp((f + 2.0) / 4.0, 0.0, 1.0);

        // Pixel coordinates for the micro halftone grid (prevents stretching)
        vec2 pos = gl_FragCoord.xy;
        
        // Rotate the dot grid by 45 degrees
        float s = 0.707106;
        float c = 0.707106;
        vec2 st = vec2(
            pos.x * c - pos.y * s,
            pos.x * s + pos.y * c
        );

        // Grid spacing (determines total number of dots)
        float spacing = 12.0; 
        vec2 gv = fract(st / spacing) - 0.5;
        float d = length(gv);

        // True Halftone Effect: dot radius physically grows in brighter wave areas
        float radius = mix(0.05, 0.35, brightness); 
        
        // Anti-aliased dot drawing
        float dotAlpha = 1.0 - smoothstep(radius - 0.05, radius + 0.05, d);

        // Modulate final opacity based on the wave to deepen the contrast
        // Decrease the max value (currently 0.45) if you want the peaks to be even dimmer
        float finalOpacity = dotAlpha * mix(0.1, 0.45, brightness);
        
        // Crisp teal/white dot color
        // You can also darken the base color here if needed (e.g. vec3(0.6, 0.7, 0.8))
        vec3 dotColor = vec3(0.85, 0.95, 1.0);

        // Premultiplied alpha output for flawless canvas blending over the hero gradient
        gl_FragColor = vec4(dotColor * finalOpacity, finalOpacity);
      }
    `

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        1, 1
      ]),
      gl.STATIC_DRAW
    )

    const pos = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const timeLoc = gl.getUniformLocation(program, "time")
    const resLoc = gl.getUniformLocation(program, "resolution")

    let t = 0
    let frameId: number

    const render = () => {
      t += 0.03
      gl.uniform1f(timeLoc, t)
      gl.uniform2f(resLoc, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeView)
      cancelAnimationFrame(frameId)
    }

  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
    />
  )
}
