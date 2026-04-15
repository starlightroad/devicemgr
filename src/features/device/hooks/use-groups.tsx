"use client";

import { useEffect, useState } from "react";

import { getDeviceGroups } from "@/dal/group";

export default function useDeviceGroups() {
  const [groups, setGroups] = useState<{ id: string; name: string }[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getDeviceGroups();

        setGroups(response.data);
      } catch {
        setError("Failed to get groups.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return { groups, loading, error };
}
