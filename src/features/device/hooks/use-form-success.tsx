"use client";

import { useEffect } from "react";

export default function useFormSuccess(success?: boolean, handler?: () => void) {
  useEffect(() => {
    if (success && handler) {
      handler();
    }
  }, [success, handler]);
}
