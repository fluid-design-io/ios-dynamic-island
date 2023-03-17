import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to get the dimensions (width and height) of an HTML element by its ID.
 * The hook utilizes the ResizeObserver API to listen for changes in the element's dimensions.
 *
 * @param {string} id - The ID of the HTML element to observe.
 * @returns {object} - An object containing the width and height of the observed element.
 */
export function useDimensionsById(id: string) {
  // State to store the dimensions of the element
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // useRef to store the latest width value
  const latestWidth = useRef(0);

  // useEffect to handle the ResizeObserver setup and cleanup
  useEffect(() => {
    const element = document.getElementById(id);

    // If the element is not found, return early
    if (!element) return;

    // Set up the ResizeObserver to listen for changes in the element's dimensions
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      latestWidth.current = width;
      setDimensions({ width, height });
    });

    observer.observe(element);

    // Clean up the observer when the component is unmounted
    return () => observer.unobserve(element);
  }, [id]);

  // useEffect to handle updating the latestWidth ref on mount or when the id changes
  useEffect(() => {
    const element = document.getElementById(id);

    // If the element is not found, return early
    if (!element) return;

    latestWidth.current = element.offsetWidth;
  }, [id]);

  // Return the dimensions object with the latest width value from the ref
  return { ...dimensions, width: latestWidth.current };
}
