/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

export default function useDebounceInput(
  callback: (inputValue: string) => void,
  time: number,
) {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let timer: any = null;
    clearTimeout(timer);
    setIsDebouncing(true);
    timer = setTimeout(() => {
      callback(inputValue);
      setIsDebouncing(false);
    }, time);
    return () => clearTimeout(timer);
  }, [inputValue]);

  function eventHandler(e: any) {
    setInputValue(e.target.value);
  }

  return { eventHandler, isDebouncing };
}
