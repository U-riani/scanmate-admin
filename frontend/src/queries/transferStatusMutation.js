// src/queries/transferStatusMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransferStatus } from "../api/transferService";

export function useTransferStatusMutation() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, status }) =>
      updateTransferStatus(id, status),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["transfers"]
      });

    }

  });

}