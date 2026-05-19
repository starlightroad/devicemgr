"use client";

import { Button } from "@/components/ui/button";

import useCsvDownload from "@/features/device/hooks/use-csv-download";

type DownloadData = Record<string, string>;

export default function DownloadButton({ data }: { data: DownloadData[] }) {
  const { download } = useCsvDownload(data);

  return (
    <Button type="button" variant="outline" aria-label="Download data as CSV" onClick={download}>
      Download
    </Button>
  );
}
