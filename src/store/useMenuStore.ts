import dayjs from "dayjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Store {
  page: string;
  menu: string;
  date: string;
  changeMenu: (menu: string) => void;
  changePage: (page: string) => void;
  changeDate: (date: string) => void;
}

const useMenuStore = create<Store>()(
  devtools(set => ({
    page: "calendar",
    menu: "all",
    date: "",
    changePage: page => set({ page, menu: "all", date: dayjs().format("YYYY-MM-DD") }),
    changeMenu: menu => set({ menu }),
    changeDate: date => set({ date })
  }))
);
export default useMenuStore;
