import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Store {
  page: string;
  changePage: (page: string) => void;
  menu: string;
  changeMenu: (menu: string) => void;
  tag: string;
  changeTag: (tag: string) => void;
}

const useMenuStore = create<Store>()(
  devtools(set => ({
    page: "calendar",
    changePage: page => set({ page, menu: "1" }),
    menu: "1",
    changeMenu: menu => set({ menu }),
    tag: "전체태그",
    changeTag: tag => set({ tag })
  }))
);
export default useMenuStore;
