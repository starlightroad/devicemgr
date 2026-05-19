import { getAllDevices } from "@/dal/device";

import { extractDeviceDetails } from "@/features/device/lib/utils";

import DownloadButton from "@/features/profile/components/download-button";

export default async function AccountDataDownload() {
  const devices = await getAllDevices();

  const newDevices = extractDeviceDetails(devices.data);

  return <DownloadButton data={newDevices} />;
}
