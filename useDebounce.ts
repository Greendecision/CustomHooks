import { useEffect } from "react";
import { useTimeout } from "./useTimeout";

/**
 * Hook that watches some variables and calls a callback only after a certain time since the variable stopped changing
 * by resetting the timer every time a value in the dependency changes.
 *
 * For example it can be used in a search field:
 * instead of calling a callback after every character,
 * it calls it only if the user hasn't been typing for more than 200ms
 *
 * @param callback callback function
 * @param delay time to wait in ms
 * @param dependencies array of variables to watch
 */
export const useDebounce = (callback: () => void, delay: number, dependencies: unknown[]) => {
  const [reset, clear] = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clear, []);
};
