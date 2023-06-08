import { useState, useCallback } from "react";
import Cookies from "js-cookie";

const defaultOptions: Cookies.CookieAttributes = {
  sameSite: "Strict",
  secure: true,
};

/**
 * useState like hook
 * that under the hood uses the browser cookies API to store the value across multiple sessions
 *
 * @param key key used to store and retrieve the cookie
 * @param defaultValue default value used in case the cookie doesn't exist yet
 * @param options Cookies.CookieAttribute object passed to the Cookies API
 * @returns array of [value, setValue, deleteValue]
 */
export const useCookie = (
  key: string,
  defaultValue: string | object,
  options: Cookies.CookieAttributes = defaultOptions
): [
  string | object | null,
  (newValue: string | object, options?: Cookies.CookieAttributes) => void,
  () => void
] => {
  const [value, setValue] = useState<string | object | null>(() => {
    const cookie = Cookies.get(key);
    if (!cookie) {
      const dv = typeof defaultValue === "object" ? JSON.stringify(defaultValue) : defaultValue;
      Cookies.set(key, dv, { ...defaultOptions, ...options });
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
  });

  const updateCookie: (newValue: string | object, options?: Cookies.CookieAttributes) => void = useCallback(
    (newValue, options) => {
      const nv = typeof newValue === "object" ? JSON.stringify(newValue) : newValue;
      Cookies.set(key, nv, { ...defaultOptions, ...options });
      setValue(newValue);
    },
    [key]
  );

  const deleteCookie: () => void = useCallback(() => {
    Cookies.remove(key);
    setValue(null);
  }, [key]);

  return [value, updateCookie, deleteCookie];
};

export default useCookie;
