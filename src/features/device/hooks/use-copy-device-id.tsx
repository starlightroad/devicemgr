"use client";

import { toast } from "sonner";

import { ACTION_MESSAGE } from "@/features/device/lib/constants";

import useCopyToClipboard from "@/features/device/hooks/use-copy-to-clipboard";

export default function useCopyDeviceId() {
  const { copy } = useCopyToClipboard();

  const handleCopy = async (deviceId: string) => {
    try {
      await copy(deviceId);
      toast.success(ACTION_MESSAGE.copied);
    } catch {
      toast.error("Failed to copy device ID.");
    }
  };

  return {
    handleCopy,
  };
}
