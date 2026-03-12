"use client";

import React, { useEffect, useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useInView,
  useTransform,
  motion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(direction === "down" ? value : 0);

  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  const displayValue = useTransform(springValue, (current) =>
    Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Number(current.toFixed(decimalPlaces))),
  );

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      motionValue.set(direction === "down" ? 0 : value);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [motionValue, isInView, delay, value, direction]);

  return (
    <motion.span
      ref={ref}
      className={cn(
        "inline-block tabular-nums tracking-wider",
        className,
      )}
    >
      {displayValue}
    </motion.span>
  );
}
