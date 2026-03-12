"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  background?: string;
  borderRadius?: string;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  background = "rgba(0,0,0,1)",
  borderRadius = "100px",
  ...props
}: ShimmerButtonProps) {
  const id = useId();
  const animationName = `shimmer-sweep-${id.replace(/:/g, "")}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ${animationName} {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `,
        }}
      />
      <button
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95",
          className,
        )}
        style={{ borderRadius }}
        {...props}
      >
        {/* Background layer */}
        <span
          className="absolute inset-0"
          style={{
            background,
            borderRadius: "inherit",
          }}
        />

        {/* Shimmer sweep layer */}
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: "inherit" }}
        >
          <span
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                120deg,
                transparent 25%,
                ${shimmerColor}20 37%,
                ${shimmerColor}40 50%,
                ${shimmerColor}20 63%,
                transparent 75%
              )`,
              backgroundSize: "300% 100%",
              animation: `${animationName} ${shimmerDuration} ease-in-out infinite`,
            }}
          />
        </span>

        {/* Border shimmer on hover */}
        <span
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            borderRadius: "inherit",
            padding: shimmerSize,
            background: `linear-gradient(
              120deg,
              transparent 25%,
              ${shimmerColor}30 37%,
              ${shimmerColor}60 50%,
              ${shimmerColor}30 63%,
              transparent 75%
            )`,
            backgroundSize: "300% 100%",
            animation: `${animationName} ${shimmerDuration} ease-in-out infinite`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}
