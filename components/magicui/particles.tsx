"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  size?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  vx?: number;
  vy?: number;
}

interface Particle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function Particles({
  className,
  quantity = 50,
  color = "#ffffff",
  size = 0.4,
  staticity = 50,
  ease = 50,
  refresh = false,
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dprRef = useRef(typeof window !== "undefined" ? window.devicePixelRatio : 1);
  const rafRef = useRef<number>(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rgb = hexToRgb(color);

  const createParticle = useCallback((): Particle => {
    const { w, h } = canvasSizeRef.current;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      translateX: 0,
      translateY: 0,
      size: Math.random() * 2 + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, [size]);

  const drawParticle = useCallback(
    (particle: Particle, ctx: CanvasRenderingContext2D) => {
      const { x, y, translateX, translateY, size: pSize, alpha } = particle;
      ctx.beginPath();
      ctx.arc(x + translateX, y + translateY, pSize, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
      ctx.fill();
    },
    [rgb],
  );

  const resizeCanvas = useCallback(() => {
    if (!canvasContainerRef.current || !canvasRef.current || !contextRef.current)
      return;

    const container = canvasContainerRef.current;
    canvasSizeRef.current.w = container.offsetWidth;
    canvasSizeRef.current.h = container.offsetHeight;

    const dpr = dprRef.current;
    canvasRef.current.width = canvasSizeRef.current.w * dpr;
    canvasRef.current.height = canvasSizeRef.current.h * dpr;
    canvasRef.current.style.width = `${canvasSizeRef.current.w}px`;
    canvasRef.current.style.height = `${canvasSizeRef.current.h}px`;
    contextRef.current.scale(dpr, dpr);
  }, []);

  const initParticles = useCallback(() => {
    particlesRef.current = [];
    for (let i = 0; i < quantity; i++) {
      particlesRef.current.push(createParticle());
    }
  }, [quantity, createParticle]);

  const animate = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSizeRef.current.w, canvasSizeRef.current.h);

    particlesRef.current.forEach((particle) => {
      // Movement
      particle.x += particle.dx + vx;
      particle.y += particle.dy + vy;

      // Mouse interaction
      const easeFactor = ease / 1000;
      particle.translateX +=
        (mouseRef.current.x / (staticity / particle.magnetism) -
          particle.translateX) *
        easeFactor;
      particle.translateY +=
        (mouseRef.current.y / (staticity / particle.magnetism) -
          particle.translateY) *
        easeFactor;

      // Fade in
      if (particle.alpha < particle.targetAlpha) {
        particle.alpha = Math.min(
          particle.alpha + 0.01,
          particle.targetAlpha,
        );
      }

      // Boundary wrapping with fade
      const { w, h } = canvasSizeRef.current;
      if (
        particle.x + particle.translateX < -10 ||
        particle.x + particle.translateX > w + 10 ||
        particle.y + particle.translateY < -10 ||
        particle.y + particle.translateY > h + 10
      ) {
        // Reset particle to random edge
        particle.alpha = 0;
        particle.x = Math.random() * w;
        particle.y = Math.random() * h;
      }

      drawParticle(particle, ctx);
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [vx, vy, ease, staticity, drawParticle]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    if (!canvasRef.current) return;
    contextRef.current = canvasRef.current.getContext("2d");
    if (!contextRef.current) return;

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasContainerRef.current) return;
      const rect = canvasContainerRef.current.getBoundingClientRect();
      const { w, h } = canvasSizeRef.current;
      mouseRef.current = {
        x: e.clientX - rect.left - w / 2,
        y: e.clientY - rect.top - h / 2,
      };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion, animate, resizeCanvas, initParticles]);

  // Handle refresh prop
  useEffect(() => {
    initParticles();
  }, [refresh, initParticles]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      ref={canvasContainerRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
