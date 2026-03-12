"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
}

export function DotPattern({
  className,
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
}: DotPatternProps) {
  const id = useId();
  const patternId = `dot-pattern-${id}`;

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/30",
        className,
      )}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
