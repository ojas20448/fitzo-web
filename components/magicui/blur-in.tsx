"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurInProps {
  word: string;
  className?: string;
  variant?: Variants;
  duration?: number;
}

export function BlurIn({ word, className, variant, duration = 1 }: BlurInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultVariants: Variants = {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const activeVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      className={cn("", className)}
      variants={activeVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {word}
    </motion.div>
  );
}

export default BlurIn;
