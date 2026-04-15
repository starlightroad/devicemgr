"use client";

import { useEffect, useState } from "react";

import { getDeviceTypes } from "@/dal/type";

export default function useDeviceTypes() {
  const [types, setTypes] = useState<{ id: string; name: string }[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await getDeviceTypes();

        setTypes(response.data);
      } catch {
        setError("Failed to get groups.");
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, loading, error };
}
