"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklesTextProps {
  text: string;
  className?: string;
  sparklesCount?: number;
  colors?: {
    first: string;
    second: string;
  };
}

interface SparkleData {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

function SparkleIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
        fill={color}
      />
    </svg>
  );
}

export function SparklesText({
  text,
  className,
  sparklesCount = 10,
  colors = { first: "#4ade80", second: "#ffffff" },
}: SparklesTextProps) {
  const sparkles = useMemo<SparkleData[]>(() => {
    return Array.from({ length: sparklesCount }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 10 + 6,
      color: i % 2 === 0 ? colors.first : colors.second,
      delay: Math.random() * 3,
      duration: Math.random() * 1.5 + 1,
    }));
  }, [sparklesCount, colors.first, colors.second]);

  return (
    <span className={cn("relative inline-block", className)}>
      {/* The text itself */}
      <span className="relative z-10">{text}</span>

      {/* Sparkle stars */}
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="pointer-events-none absolute z-20"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2 + 1,
            ease: "easeInOut",
          }}
        >
          <SparkleIcon size={sparkle.size} color={sparkle.color} />
        </motion.span>
      ))}
    </span>
  );
}

export default SparklesText;
