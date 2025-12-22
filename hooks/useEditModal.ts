import { create } from "zustand";

interface EditMOdalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const uesEditModal = create<EditMOdalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default uesEditModal;
