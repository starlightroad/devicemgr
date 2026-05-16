"use client";

import { createContext, useState } from "react";

type ModalType = "edit" | "share" | "move" | "delete";

type ModalContextProps = {
  modal: ModalType | null;
  setModal: (modal: ModalType) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextProps>({ modal: null, setModal: () => {}, closeModal: () => {} });

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalType | null>(null);

  const handleCloseModal = () => setModal(null);

  const contextValue = {
    modal,
    setModal: (modal: ModalType) => setModal(modal),
    closeModal: handleCloseModal,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}
