"use client";

import { useState } from "react";

import type { Device, DeviceItem } from "@/features/device/lib/definitions";

import { Button } from "@/components/ui/button";

import EditDeviceModal from "@/features/device/components/edit-device-modal";

type EditDeviceButtonProps = {
  device: Device;
  types: DeviceItem[] | null;
  statuses: DeviceItem[] | null;
  groups: DeviceItem[] | null;
};

export default function EditDeviceButton({ device, types, statuses, groups }: EditDeviceButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setModalOpen(true)}>
        Edit Device
      </Button>
      {modalOpen && (
        <EditDeviceModal device={device} types={types} statuses={statuses} groups={groups} onClose={handleCloseModal} />
      )}
    </>
  );
}
