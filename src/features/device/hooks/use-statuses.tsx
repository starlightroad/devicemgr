"use client";

import { useEffect, useState } from "react";

import { getDeviceStatuses } from "@/dal/status";

export default function useDeviceStatuses() {
  const [statuses, setStatuses] = useState<{ id: string; name: string }[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await getDeviceStatuses();

        setStatuses(response.data);
      } catch {
        setError("Failed to get statuses.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  return { statuses, loading, error };
}
