"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface RippleProps {
  className?: string;
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export function Ripple({
  className,
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
}: RippleProps) {
  const circles = useMemo(() => {
    return Array.from({ length: numCircles }, (_, i) => {
      const size = mainCircleSize + i * 70;
      const opacity = mainCircleOpacity - i * (mainCircleOpacity / numCircles);
      const animationDelay = `${i * 0.6}s`;
      const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
      const borderOpacity = 5 + i * 5;

      return {
        id: i,
        size,
        opacity: Math.max(opacity, 0),
        animationDelay,
        borderStyle,
        borderOpacity,
      };
    });
  }, [mainCircleSize, mainCircleOpacity, numCircles]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `}</style>

      {circles.map((circle) => (
        <div
          key={circle.id}
          className="absolute rounded-full"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            borderWidth: "1px",
            borderStyle: circle.borderStyle,
            borderColor: `rgba(255, 255, 255, ${circle.borderOpacity / 100})`,
            opacity: circle.opacity,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: `ripple-expand 4s ${circle.animationDelay} linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default Ripple;
