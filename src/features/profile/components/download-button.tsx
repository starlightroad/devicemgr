"use client";

import { useRouter } from "next/navigation";

import { DOWNLOAD_CSV_URL } from "@/features/device/lib/constants";

import { Button } from "@/components/ui/button";

export default function DownloadButton() {
  const { push } = useRouter();

  const handleDownload = async () => {
    push(DOWNLOAD_CSV_URL);
  };

  return (
    <Button type="button" variant="outline" aria-label="Download data as CSV" onClick={handleDownload}>
      Download
    </Button>
  );
}
