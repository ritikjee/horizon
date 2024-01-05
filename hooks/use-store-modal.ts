import { create } from "zustand";
import { Channel, ChannelType, Server } from "@prisma/client";
export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  queryKey?: Record<string, any>;
}

interface ModalState {
  modalType: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (modalType: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalState>((set) => ({
  modalType: null,
  data: {},
  isOpen: false,
  onClose: () => set({ isOpen: false, modalType: null }),
  onOpen: (modalType, data = {}) => set({ isOpen: true, modalType, data }),
}));
