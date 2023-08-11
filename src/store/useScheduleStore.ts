import { create } from "zustand";

type TTargetId = string;
type TSelectDate = [string, string];

interface Store {
  targetId: TTargetId;
  getTargetId: (targetId: TTargetId) => void;
  selectDate: TSelectDate;
  getDate: (date: TSelectDate) => void;
}

export const useScheduleStore = create<Store>(set => ({
  targetId: "0",
  getTargetId: targetId => set(state => ({ ...state, targetId })),
  selectDate: ["", ""],
  getDate: date => set(state => ({ ...state, selectDate: [date[0], date[1]] }))
}));
