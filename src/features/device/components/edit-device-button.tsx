"use client";

import { EditIcon } from "lucide-react";

import type { Device, DeviceItem } from "@/features/device/lib/definitions";

import useModal from "@/features/device/hooks/use-modal";

import { Button } from "@/components/ui/button";

import EditDeviceModal from "@/features/device/components/edit-device-modal";

type EditDeviceButtonProps = {
  device: Device;
  types: DeviceItem[] | null;
  statuses: DeviceItem[] | null;
  groups: DeviceItem[] | null;
};

export default function EditDeviceButton({ device, types, statuses, groups }: EditDeviceButtonProps) {
  const { modal, setModal, closeModal } = useModal();

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setModal("edit")}>
        <EditIcon data-icon="inline-start" />
        Edit Device
      </Button>
      {modal === "edit" && (
        <EditDeviceModal device={device} types={types} statuses={statuses} groups={groups} onClose={closeModal} />
      )}
    </>
  );
}
