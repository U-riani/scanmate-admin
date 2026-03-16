// src/queries/inventorizationMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventorization } from "../api/inventorizationService";
import { importInventorizationLines } from "../api/inventorizationLinesService";

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

export function useImportInventorizationLines() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, rows }) =>
      importInventorizationLines(documentId, rows),

    onSuccess: () => {
      queryClient.invalidateQueries(["inventorizationLines"]);
    },
  });
}