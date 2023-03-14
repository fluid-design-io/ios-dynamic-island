"use client";
import { useState, useEffect, useRef } from "react";

export function useDimensionsById(id: string) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const latestWidth = useRef(0);

  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      latestWidth.current = width;
      setDimensions({ width, height });
    });

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [id]);

  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;
    latestWidth.current = element.offsetWidth;
  }, [id]);

  return { ...dimensions, width: latestWidth.current };
}
