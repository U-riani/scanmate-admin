// src/queries/transferLinesMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTransferLines,
  updateTransferLine,
  deleteTransferLine,
} from "../api/transferLinesService";

export function useAddTransferLines() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, products }) =>
      addTransferLines(documentId, products),

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["transferLines", vars.documentId],
      });
    },
  });
}

export function useUpdateTransferLine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lineId, data }) => updateTransferLine(lineId, data),

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["transferLines"],
      });
    },
  });
}

export function useDeleteTransferLine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransferLine,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transferLines"],
      });
    },
  });
}
