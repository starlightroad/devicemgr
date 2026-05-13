"use client";

import { useState } from "react";

type UseFieldsProps<T> = { [K in keyof T]: T[K] };

export default function useFields<T>(initialState: UseFieldsProps<T>) {
  const [field, setField] = useState(initialState);

  const handleFieldChange = (name: keyof typeof field, value: T[keyof T]) => {
    setField((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    field,
    handleFieldChange,
  };
}
