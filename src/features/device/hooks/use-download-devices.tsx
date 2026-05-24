"use client";

import { DOWNLOAD_CSV_URL } from "@/features/device/lib/constants";

export default function useDownloadDevices() {
  const handleDownload = () => {
    const linkElement = document.createElement("a");
    linkElement.href = DOWNLOAD_CSV_URL;

    document.body.appendChild(linkElement);
    linkElement.click();

    document.body.removeChild(linkElement);
  };

  return {
    handleDownload,
  };
}
