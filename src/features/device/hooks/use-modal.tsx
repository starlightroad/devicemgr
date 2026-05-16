"use client";

import { useContext } from "react";

import { ModalContext } from "@/features/device/providers/modal-provider";

export default function useModal() {
  return useContext(ModalContext);
}
