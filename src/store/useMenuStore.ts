import dayjs from "dayjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Store {
  page: string;
  menu: string;
  date: string;
  tag: string;
  changeMenu: (menu: string) => void;
  changeTag: (tag: string) => void;
  changePage: (page: string) => void;
  changeDate: (date: string) => void;
}

export const useMenuStore = create<Store>()(
  devtools(set => ({
    page: "calendar",
    changePage: page => set({ page, menu: "all", date: dayjs().format("YYYY-MM-DD") }),
    tag: "전체태그",
    changeTag: tag => set({ tag }),
    menu: "all",
    changeMenu: menu => set({ menu }),
    date: "",
    changeDate: date => set({ date })
  }))
);
