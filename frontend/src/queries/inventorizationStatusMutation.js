// src/queries/inventorizationStatusMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInventorizationStatus } from "../api/inventorizationService";

export function useInventorizationStatusMutation() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, status }) =>
      updateInventorizationStatus(id, status),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["inventorizations"]
      });

    }

  });

}