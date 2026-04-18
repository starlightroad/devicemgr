"use client";

export default function useCopyToClipboard() {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      throw new Error("Failed to copy text to clipboard.");
    }
  };

  return {
    copy: handleCopy,
  };
}
