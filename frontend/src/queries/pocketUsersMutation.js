// frontend/src/queries/pocketUsersMutation.js

import { resetPocketUserPassword } from "../api/pocketUsersService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPocketUser,
  updatePocketUser,
  deletePocketUser,
} from "../api/pocketUsersService";

export function useCreatePocketUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPocketUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pocketUsers"],
      });
    },
  });
}

export function useUpdatePocketUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updatePocketUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pocketUsers"],
      });
    },
  });
}

export function useDeletePocketUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePocketUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pocketUsers"],
      });
    },
  });
}



export function useResetPocketUserPassword() {

  return useMutation({
    mutationFn: ({ id, password }) =>
      resetPocketUserPassword(id, password)
  });

}