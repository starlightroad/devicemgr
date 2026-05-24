"use client";

import { Button } from "@/components/ui/button";

import useDownloadDevices from "@/features/device/hooks/use-download-devices";

export default function DownloadButton() {
  const { handleDownload } = useDownloadDevices();

  return (
    <Button type="button" variant="outline" aria-label="Download data as CSV" onClick={handleDownload}>
      Download
    </Button>
  );
}
