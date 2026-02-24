"use client";

import { useState, useCallback, RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
  isInside: boolean;
}

export function useMousePosition(ref: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0.5,
    y: 0.5,
    isInside: false,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setPosition({ x, y, isInside: true });
    },
    [ref]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0.5, y: 0.5, isInside: false });
  }, []);

  return { position, handleMouseMove, handleMouseLeave };
}
