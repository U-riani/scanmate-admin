// src/queries/inventorizationMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventorization } from "../api/inventorizationService";

export function useCreateInventorization() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInventorization,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventorizations"],
      });
    },
  });
}