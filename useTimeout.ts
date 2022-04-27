import { useCallback, useEffect, useRef } from "react";

/**
 * Hook that takes a callback and calls it after a certain delay has passed.
 * It returns a function that can be used to restart it and one that can be used to stop it
 * @param callback function called when the delay time has passed
 * @param delay duration of the timeout in ms
 * @returns [reset (restart the timer for the same delay time), clear (cancel the timer)]
 */
export const useTimeout = (callback: () => void, delay: number) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (!timeoutRef.current) return;
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return [reset, clear];
};

export default useTimeout;
