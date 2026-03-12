"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  const id = useId();
  const safeId = id.replace(/:/g, "");
  const animName = `marquee-${safeId}`;

  const to = vertical
    ? "translateY(calc(-100% - var(--gap)))"
    : "translateX(calc(-100% - var(--gap)))";

  const keyframes = reverse
    ? `@keyframes ${animName} { from { transform: ${to}; } to { transform: translate${vertical ? "Y" : "X"}(0); } }`
    : `@keyframes ${animName} { from { transform: translate${vertical ? "Y" : "X"}(0); } to { transform: ${to}; } }`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        className={cn(
          "group flex overflow-hidden",
          vertical ? "flex-col" : "flex-row",
          className,
        )}
        style={
          {
            "--gap": "1rem",
            "--duration": "40s",
            maskImage: vertical
              ? "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
              : "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: vertical
              ? "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
              : "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          } as React.CSSProperties
        }
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around",
              vertical ? "flex-col" : "flex-row",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
            )}
            style={{
              gap: "var(--gap)",
              animation: `${animName} var(--duration) linear infinite`,
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </>
  );
}
