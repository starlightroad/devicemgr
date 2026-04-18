"use client";

import { useCallback, useState } from "react";

export default function useFields(initialState: Record<string, { name: string; value: string }>) {
  const [field, setField] = useState(initialState);

  const handleFieldChange = useCallback((name: keyof typeof field, value: string) => {
    setField((prevState) => ({ ...prevState, [name]: { name: prevState[name].name, value } }));
  }, []);

  return {
    field,
    handleFieldChange,
  };
}
