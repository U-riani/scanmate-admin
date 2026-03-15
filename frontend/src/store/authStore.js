// frontend/src/store/authStore.js

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("scanmate_user")) || null,

  setUser: (user) => {
    localStorage.setItem("scanmate_user", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("scanmate_user");
    localStorage.removeItem("scanmate_warehouse_id");
    set({ user: null });
  },
}));
