import { create } from "zustand";

type TTargetId = string;
type TSelectDate = [string, string];

export interface Store {
  targetId: TTargetId;
  getTargetId: (targetId: TTargetId) => void;
  selectDate: TSelectDate;
  getDate: (date: TSelectDate) => void;
}

const useScheduleIdStore = create<Store>(set => ({
  targetId: "",
  getTargetId: targetId => set(state => ({ ...state, targetId })),
  selectDate: ["", ""],
  getDate: date => set(state => ({ ...state, selectDate: [date[0], date[1]] }))
}));

export default useScheduleIdStore;
