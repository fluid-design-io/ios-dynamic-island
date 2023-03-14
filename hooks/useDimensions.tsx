"use client";

import { useState, useEffect, useRef } from "react";

export function useDimensions(ref: React.RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const latestWidth = useRef(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      latestWidth.current = width;
      setDimensions({ width, height });
    });

    observer.observe(ref.current);

    return () => {
      if (!ref.current) return;
      observer.unobserve(ref.current);
    };
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;
    latestWidth.current = ref.current.offsetWidth;
  }, [ref]);

  return { ...dimensions, width: latestWidth.current };
}
