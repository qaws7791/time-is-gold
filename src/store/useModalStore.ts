import { create } from "zustand";

export interface IModalStatus {
  postCalendarForm: boolean;
  modifyCalendarForm: boolean;
  detailSchedule: boolean;
}
export interface Store {
  modalStatus: IModalStatus;
  myProfile: boolean;
  openModal: (target: keyof IModalStatus) => void;
  closeModal: (target: keyof IModalStatus) => void;
}

const useModalStore = create<Store>(set => ({
  modalStatus: {
    postCalendarForm: false,
    modifyCalendarForm: false,
    detailSchedule: false
  },
  myProfile: false,
  openModal: target =>
    set(state => ({ ...state, modalStatus: { ...state.modalStatus, [target]: true } })),
  closeModal: target =>
    set(state => ({ ...state, modalStatus: { ...state.modalStatus, [target]: false } }))
}));

export default useModalStore;
