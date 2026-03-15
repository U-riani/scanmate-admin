// src/queries/inventorizationRecountMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecountDocument } from "../api/inventorizationRecountService";

export function useCreateRecount() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: createRecountDocument,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["inventorizations"]
      });

      queryClient.invalidateQueries({
        queryKey: ["inventorizationLines"]
      });

    }

  });

}