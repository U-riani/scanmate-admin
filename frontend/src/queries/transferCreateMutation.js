// src/queries/transferCreateMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransfer } from "../api/transferService";

export function useCreateTransfer() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: createTransfer,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["transfers"]
      });

    }

  });

}