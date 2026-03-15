// src/queries/warehouseMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWarehouse,
  updateWarehouse,
  deleteWarehouse
} from "../api/warehouseService";

export function useCreateWarehouse() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
    },
  });
}

export function useUpdateWarehouse() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateWarehouse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
    },
  });
}

export function useDeleteWarehouse() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
    },
  });
}