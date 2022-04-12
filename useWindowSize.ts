import { useState, useLayoutEffect } from "react";
import { useEventListener } from "./useEventListener";

/**
 * Hook that updated the return value every time the dimension of the window changes.
 * @returns {object} Height and width of the window.
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEventListener("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  });

  return windowSize;
};

/**
 * Hook that synchronously keep track of window size when page is resized by the user.
 * @returns {object} Height and width of the window.
 */
export const useSynchronousWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  /** Shortcut for updating the state (i.e., page width and height). */
  const updateSize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  };

  /** Synchronously updates size. */
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useWindowSize;
