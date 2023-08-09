import { create } from "zustand";

export interface Store {
  myProfile: boolean;
  openModal: (target: string) => void;
  closeModal: (target: string) => void;
}

const useModalStore = create<Store>(set => ({
  myProfile: false,
  openModal: target => set(state => ({ ...state, [target]: true })),
  closeModal: target => set(state => ({ ...state, [target]: false }))
}));

export default useModalStore;
