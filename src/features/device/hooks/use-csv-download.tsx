"use client";

import { useCallback } from "react";

import { createFileName } from "@/features/device/lib/utils";

import type { DownloadData } from "@/features/device/lib/definitions";

export default function useCsvDownload(data: DownloadData[], fileName?: string) {
  const handleDownload = useCallback(() => {
    if (!data.length) return;

    const header = Object.keys(data[0]).join(",");

    const rows = data.map((row) => Object.values(row).join(",")).join("\n");

    const content = `${header}\n${rows}`;

    const blob = new Blob([content], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const element = document.createElement("a");

    element.setAttribute("href", url);

    element.setAttribute("download", `${fileName ?? createFileName()}.csv`);

    element.style.display = "none";

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }, [data, fileName]);

  return {
    download: handleDownload,
  };
}
