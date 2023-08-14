import { create } from "zustand";

export interface IModalStatus {
  postCalendarForm: boolean;
  modifyCalendarForm: boolean;
  detailSchedule: boolean;
}

interface Store {
  modalStatus: IModalStatus;
  openModal: (target: keyof IModalStatus) => void;
  closeModal: (target: keyof IModalStatus) => void;
}

export const useModalStore = create<Store>(set => ({
  modalStatus: {
    postCalendarForm: false,
    modifyCalendarForm: false,
    detailSchedule: false
  },
  openModal: target =>
    set(state => ({ ...state, modalStatus: { ...state.modalStatus, [target]: true } })),
  closeModal: target =>
    set(state => ({ ...state, modalStatus: { ...state.modalStatus, [target]: false } }))
}));
