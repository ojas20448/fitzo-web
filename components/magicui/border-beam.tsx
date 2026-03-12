"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  colorFrom = "#fff",
  colorTo = "#4ade80",
  delay = 0,
}: BorderBeamProps) {
  const id = useId();
  const animationName = `border-beam-${id.replace(/:/g, "")}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ${animationName} {
              0% {
                offset-distance: 0%;
              }
              100% {
                offset-distance: 100%;
              }
            }
          `,
        }}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
          className,
        )}
      >
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "inherit",
            padding: "1.5px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 10%, ${colorTo} 20%, transparent 40%)`,
              borderRadius: "50%",
              offsetPath: `rect(0 auto auto 0 round ${size}px)`,
              animation: `${animationName} ${duration}s linear ${delay}s infinite`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    </>
  );
}
