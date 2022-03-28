import { useState } from "react";
import { useEventListener } from "./useEventListener";

/**
 * Hook that updated the return value every time the dimension of the window changes
 * @returns { height, width } object
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

export default useWindowSize;
