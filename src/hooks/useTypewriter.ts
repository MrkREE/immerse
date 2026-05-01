import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed = 35, trigger = true) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!trigger) {
      setDisplayText("");
      setIsDone(false);
      indexRef.current = 0;
      return;
    }

    indexRef.current = 0;
    setDisplayText("");
    setIsDone(false);

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      setDisplayText(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(intervalRef.current!);
        setIsDone(true);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, trigger]);

  return { displayText, isDone };
}
