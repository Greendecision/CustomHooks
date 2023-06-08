import { useEffect, useRef } from "react";

export const useEventListener = <K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
  eventType: K,
  callback: any,
  element: T | Window = window
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: any) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
};

export default useEventListener;
