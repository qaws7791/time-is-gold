import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Store {
  currentUserEmail: string;
  setCurrentUser: (email: string) => void;
}

export const useCurrentUser = create(
  persist<Store>(
    set => ({
      currentUserEmail: "",
      setCurrentUser: email => set(state => ({ ...state, currentUserEmail: email }))
    }),
    { name: "userEmail" }
  )
);
