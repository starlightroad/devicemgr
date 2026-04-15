import type { ModalRootProps } from "@heroui/react";

import { devicesTable } from "@/db/schemas";

export type Device = Pick<typeof devicesTable.$inferSelect, "id" | "name" | "serialNumber" | "ipAddress"> & {
  type: string;
  status: string;
  group: string;
};

export type MoveDeviceModalProps = Pick<ModalRootProps, "isOpen" | "onOpenChange"> & {
  data: Device;
};
