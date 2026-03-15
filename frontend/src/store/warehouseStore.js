// src/store/warehouseStore.js

import { create } from "zustand";

export const useWarehouseStore = create((set) => {

  const stored = localStorage.getItem("scanmate_warehouse_id");

  return {

    currentWarehouseId: stored ? Number(stored) : null,

    setWarehouseId: (warehouseId) => {

      if (warehouseId === null) {
        localStorage.removeItem("scanmate_warehouse_id");
        set({ currentWarehouseId: null });
        return;
      }

      localStorage.setItem(
        "scanmate_warehouse_id",
        String(warehouseId)
      );

      set({ currentWarehouseId: warehouseId });
    },

    clearWarehouse: () => {
      localStorage.removeItem("scanmate_warehouse_id");
      set({ currentWarehouseId: null });
    },

  };

});