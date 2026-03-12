"use client";

import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
}

export function RetroGrid({ className, angle = 65 }: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className,
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Fade mask overlay */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_80%)] z-[1]" />

      {/* Grid surface */}
      <div
        className="absolute inset-0 z-[0]"
        style={{
          transform: `rotateX(var(--grid-angle))`,
          transformOrigin: "center center",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 40px",
          backgroundPosition: "center center",
          top: "50%",
          height: "200%",
          width: "200%",
          left: "-50%",
        }}
      >
        {/* Animated scan line for subtle movement */}
        <div
          className="absolute inset-0 animate-[retro-grid-move_8s_linear_infinite]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 40px",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes retro-grid-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 40px;
          }
        }
      `}</style>
    </div>
  );
}

export default RetroGrid;
