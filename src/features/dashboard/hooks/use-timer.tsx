"use client";

import { useEffect, useRef, useState } from "react";

import { TIMER_IN_MILLISECONDS } from "@/features/dashboard";

export default function useTimer() {
  const [state, setState] = useState<{ isRunning: boolean; delay: number }>({
    isRunning: false,
    delay: TIMER_IN_MILLISECONDS,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHandler = (delay = TIMER_IN_MILLISECONDS) => {
    if (timerRef.current) resetHandler();

    setState({
      isRunning: true,
      delay,
    });

    timerRef.current = setTimeout(stopHandler, delay);
  };

  const stopHandler = () => {
    setState({
      isRunning: false,
      delay: TIMER_IN_MILLISECONDS,
    });
  };

  const resetHandler = () => {
    clearTimeout(timerRef.current ? timerRef.current : undefined);
  };

  useEffect(() => {
    return () => resetHandler();
  }, []);

  return {
    isRunning: state.isRunning,
    startTimer: startHandler,
  };
}
