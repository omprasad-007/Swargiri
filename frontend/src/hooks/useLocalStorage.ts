"use client";

import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const skipWrite = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue) as T);
        skipWrite.current = true;
      }
    } catch (error) {
      console.error(`Failed to read localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (skipWrite.current) {
      skipWrite.current = false;
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to write localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
