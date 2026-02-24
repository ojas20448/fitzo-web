"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDeg?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  tiltDeg = 6,
  glowColor = "rgba(255,255,255,0.06)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { position, handleMouseMove, handleMouseLeave } = useMousePosition(ref);

  const rotateX = position.isInside ? (position.y - 0.5) * -tiltDeg : 0;
  const rotateY = position.isInside ? (position.x - 0.5) * tiltDeg : 0;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {/* Cursor-following glow */}
      {position.isInside && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${position.x * 100}% ${position.y * 100}%, ${glowColor}, transparent 50%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
