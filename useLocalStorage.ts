import { useCallback, useEffect, useState } from "react";

type optionsType = {
  interval?: number; // Interval in milliseconds to check for changes
}

type updateLocalStorageFunctionType = (
  newValue: string | object,
) => void;
type deleteLocalStorageFunctionType = () => void;

type useLocalStorageType = (
  key: string,
  defaultValue: string | object,
  options?: optionsType,
) => [
  string | object | null,
  updateLocalStorageFunctionType,
  deleteLocalStorageFunctionType,
];

/**
 * useState like hook
 * that under the hood uses the browser local storages API to store the value across multiple sessions
 *
 * @param key key used to store and retrieve the local storage
 * @param defaultValue default value used in case the local storage doesn't exist yet
 * @param options object containing interval and local storageOptions, if interval is a positive number, it will check for changes every n milliseconds
 * @returns array of [value, setValue, deleteValue]
 */
export const useLocalStorage: useLocalStorageType = (
  key: string,
  defaultValue: string | object,
  options: optionsType = {
    interval: -1,
  },
) => {
  const { interval } = options;

  /** Actual function that gets the local storage value, with specified options if present. */
  const getItem = useCallback(() => {
    const item = localStorage.getItem(key);
    if (!item) {
      const dv =
        typeof defaultValue === "object"
          ? JSON.stringify(defaultValue)
          : defaultValue;
      localStorage.setItem(key, dv);
      return defaultValue;
    }
    try {
      // the local storages are always stored as strings
      // if it was originally an object, this parsing should work and restore it
      if (typeof item === "string") return JSON.parse(item);
    } catch (e) {
      // if the parsing fails, it means it was a string originally, so we just return the local storage
      return item;
    }
    return item;
  }, [key, defaultValue]);

  /** Set the initial state */
  const [value, setValue] = useState<string | object | null>(() => getItem());

  /** if an interval value is specified, every n-milliseconds, it checks if the value changed */
  useEffect(() => {
    if (!interval || interval < 0) return;
    const checkInterval = setInterval(() => {
      const newValue = getItem();
      setValue(newValue);
    }, interval);

    return () => clearInterval(checkInterval);
  }, [interval, getItem]);

  /** function to update the local storage value */
  const updateLocalStorage: updateLocalStorageFunctionType = useCallback(
    (newValue: string | object) => {
      const nv =
        typeof newValue === "object" ? JSON.stringify(newValue) : newValue;
      localStorage.setItem(key, nv);
      setValue(newValue);
    },
    [key],
  );

  /** function to delete the local storage value */
  const deleteLocalStorage: deleteLocalStorageFunctionType = useCallback(() => {
    localStorage.removeItem(key);
    setValue(null);
  }, [key]);

  return [value, updateLocalStorage, deleteLocalStorage];
};

export default useLocalStorage;
