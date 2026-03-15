// frontend/src/queries/pocketRolesMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPocketRole,
  updatePocketRole,
  deletePocketRole,
} from "../api/pocketRolesService";

export function useCreatePocketRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPocketRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pocketRoles"],
      });
    },
  });
}

export function useUpdatePocketRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId, modules }) =>
      updatePocketRole(roleId, modules),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pocketRoles"],
      });
    },
  });
}

export function useDeletePocketRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePocketRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pocketRoles"],
      });
    },
  });
}