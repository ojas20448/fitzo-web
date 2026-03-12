"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  className?: string;
  curvature?: number;
  duration?: number;
  pathColor?: string;
  pathWidth?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  reverse?: boolean;
}

interface Point {
  x: number;
  y: number;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  className,
  curvature = 0,
  duration = 2,
  pathColor = "gray",
  pathWidth = 2,
  gradientStartColor = "#ffffff",
  gradientStopColor = "#4ade80",
  reverse = false,
}: AnimatedBeamProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const gradientId = useRef(
    `beam-gradient-${Math.random().toString(36).slice(2, 9)}`,
  ).current;

  const getElementCenter = useCallback(
    (ref: React.RefObject<HTMLElement | null>): Point | null => {
      if (!ref.current || !containerRef.current) return null;

      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = ref.current.getBoundingClientRect();

      return {
        x: elRect.left - containerRect.left + elRect.width / 2,
        y: elRect.top - containerRect.top + elRect.height / 2,
      };
    },
    [containerRef],
  );

  const updatePath = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    setSvgDimensions({
      width: containerRect.width,
      height: containerRect.height,
    });

    const fromPoint = getElementCenter(fromRef);
    const toPoint = getElementCenter(toRef);

    if (!fromPoint || !toPoint) return;

    const start = reverse ? toPoint : fromPoint;
    const end = reverse ? fromPoint : toPoint;

    // Calculate control point for quadratic bezier
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;

    // Curvature offsets the control point perpendicular to the line
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len; // Normal perpendicular direction
    const ny = dx / len;

    const controlX = midX + nx * curvature;
    const controlY = midY + ny * curvature;

    setPathD(
      `M ${start.x},${start.y} Q ${controlX},${controlY} ${end.x},${end.y}`,
    );
  }, [containerRef, fromRef, toRef, curvature, reverse, getElementCenter]);

  useEffect(() => {
    updatePath();

    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", updatePath);
    };
  }, [updatePath, containerRef]);

  return (
    <svg
      ref={svgRef}
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-0",
        className,
      )}
      width={svgDimensions.width}
      height={svgDimensions.height}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStartColor} stopOpacity="0" />
        </linearGradient>

        <mask id={`${gradientId}-mask`}>
          <motion.rect
            x="-20%"
            y="0"
            width="40%"
            height="100%"
            fill="white"
            animate={{
              x: ["-20%", "120%"],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </mask>
      </defs>

      {/* Background path (static) */}
      {pathD && (
        <path
          d={pathD}
          fill="none"
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={0.2}
          strokeLinecap="round"
        />
      )}

      {/* Animated gradient beam */}
      {pathD && (
        <path
          d={pathD}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={pathWidth}
          strokeLinecap="round"
          mask={`url(#${gradientId}-mask)`}
        />
      )}
    </svg>
  );
}

export default AnimatedBeam;
