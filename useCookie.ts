import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";

const defaultOptions: Cookies.CookieAttributes = {
  sameSite: "Strict",
  secure: true,
  expires: new Date("9999-12-31"),
};

interface optionsType {
  interval?: number;
  cookieOptions?: Cookies.CookieAttributes;
}

type updateCookieFunctionType = (
  newValue: string | object,
  options?: optionsType,
) => void;
type deleteCookieFunctionType = () => void;

type useCookieType = (
  key: string,
  defaultValue: string | object,
  options?: optionsType,
) => [
  string | object | null,
  updateCookieFunctionType,
  deleteCookieFunctionType,
];

/**
 * useState like hook
 * that under the hood uses the browser cookies API to store the value across multiple sessions
 *
 * @param key key used to store and retrieve the cookie
 * @param defaultValue default value used in case the cookie doesn't exist yet
 * @param options object containing interval and cookieOptions, if interval is a positive number, it will check for changes every n milliseconds
 * @returns array of [value, setValue, deleteValue]
 */
export const useCookie: useCookieType = (
  key: string,
  defaultValue: string | object,
  options: optionsType = {
    interval: -1,
    cookieOptions: defaultOptions,
  },
) => {
  const { interval, cookieOptions } = options;

  /** Actual function that gets the cookie value, with specified options if present. */
  const getCookie = useCallback(() => {
    const cookie = Cookies.get(key);
    if (!cookie) {
      const dv =
        typeof defaultValue === "object"
          ? JSON.stringify(defaultValue)
          : defaultValue;
      Cookies.set(key, dv, { ...defaultOptions, ...cookieOptions });
      return defaultValue;
    }
    try {
      // the cookies are always stored as strings
      // if it was originally an object, this parsing should work and restore it
      if (typeof cookie === "string") return JSON.parse(cookie);
    } catch (e) {
      // if the parsing fails, it means it was a string originally, so we just return the cookie
      return cookie;
    }
    return cookie;
  }, [key, defaultValue, cookieOptions]);

  /** Set the initial state */
  const [value, setValue] = useState<string | object | null>(() => getCookie());

  /** if an interval value is specified, every n-milliseconds, it checks if the value changed */
  useEffect(() => {
    if (!interval || interval < 0) return;
    const cookieInterval = setInterval(() => {
      const newValue = getCookie();
      setValue(newValue);
    }, interval);

    return () => clearInterval(cookieInterval);
  }, [interval, getCookie]);

  /** function to update the cookie value */
  const updateCookie: updateCookieFunctionType = useCallback(
    (newValue, newOptions) => {
      const nv =
        typeof newValue === "object" ? JSON.stringify(newValue) : newValue;
      Cookies.set(key, nv, { ...defaultOptions, ...newOptions?.cookieOptions });
      setValue(newValue);
    },
    [key],
  );

  /** function to delete the cookie value */
  const deleteCookie: deleteCookieFunctionType = useCallback(() => {
    Cookies.remove(key);
    setValue(null);
  }, [key]);

  return [value, updateCookie, deleteCookie];
};

export default useCookie;
