"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

interface MeteorStyle {
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
  width: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const meteors = useMemo<MeteorStyle[]>(() => {
    return Array.from({ length: number }, () => ({
      top: `${Math.random() * 50 - 10}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      width: `${Math.random() * 2 + 1}px`,
    }));
  }, [number]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <style jsx>{`
        @keyframes meteor-fall {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(-500px) translateY(500px) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>
      {meteors.map((style, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            top: style.top,
            left: style.left,
            width: style.width,
            height: style.width,
            background: "white",
            boxShadow: "0 0 2px 1px rgba(255, 255, 255, 0.3)",
            animation: `meteor-fall ${style.animationDuration} ${style.animationDelay} linear infinite`,
          }}
        >
          {/* Meteor tail */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "100%",
              transform: "translateY(-50%)",
              width: `${Math.random() * 80 + 40}px`,
              height: style.width,
              background:
                "linear-gradient(to right, rgba(255,255,255,0.6), transparent)",
              borderRadius: "9999px",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Meteors;
