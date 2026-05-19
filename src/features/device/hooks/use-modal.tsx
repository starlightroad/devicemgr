"use client";

import { useState } from "react";

type ModalType = "edit" | "share" | "move" | "delete";

export default function useModal() {
  const [modal, setModal] = useState<ModalType | null>(null);

  const handleSetModal = (modal: ModalType) => setModal(modal);

  const handleCloseModal = () => setModal(null);

  return {
    modal,
    setModal: handleSetModal,
    closeModal: handleCloseModal,
  };
}
