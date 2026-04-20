"use client";

import React, { useRef, useEffect, useState } from "react";

interface ParticleFieldProps {
  active: boolean;
  mouseX: number;
  mouseY: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
  phase: "fadein" | "drift" | "fadeout";
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ active, mouseX, mouseY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: mouseX, y: mouseY });
  const activeRef = useRef(active);

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticle = (): Particle => {
      const rect = canvas.getBoundingClientRect();
      const mx = mouseRef.current.x - rect.left;
      const my = mouseRef.current.y - rect.top;
      const spread = 80;
      const maxLife = 1500 + Math.random() * 1500; // 1.5–3s
      return {
        x: mx + (Math.random() - 0.5) * spread,
        y: my + (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.4, // upward drift
        opacity: 0,
        size: 1.5 + Math.random() * 1,
        life: 0,
        maxLife,
        phase: "fadein",
      };
    };

    let lastSpawn = 0;
    const spawnInterval = 200;

    const render = (timestamp: number) => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles near cursor
      if (activeRef.current && timestamp - lastSpawn > spawnInterval) {
        if (particlesRef.current.length < 12) {
          particlesRef.current.push(spawnParticle());
        }
        lastSpawn = timestamp;
      }

      const dt = 16; // ~60fps frame delta
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life += dt;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;

        if (progress < 0.2) {
          p.opacity = progress / 0.2 * 0.7;
          p.phase = "fadein";
        } else if (progress < 0.8) {
          p.opacity = 0.7;
          p.phase = "drift";
        } else {
          p.opacity = (1 - progress) / 0.2 * 0.7;
          p.phase = "fadeout";
        }

        if (p.opacity > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();
        }

        return p.life < p.maxLife;
      });

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};
