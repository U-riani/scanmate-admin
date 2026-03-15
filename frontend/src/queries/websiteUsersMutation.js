// src/queries/websiteUsersMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWebsiteUser,
  updateWebsiteUser,
  deleteWebsiteUser,
  resetWebsiteUserPassword,
} from "../api/websiteUsersService";

export function useCreateWebsiteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWebsiteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["websiteUsers"] });
    },
  });
}

export function useUpdateWebsiteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateWebsiteUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["websiteUsers"] });
    },
  });
}

export function useDeleteWebsiteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWebsiteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["websiteUsers"] });
    },
  });
}

export function useResetWebsiteUserPassword() {
  return useMutation({
    mutationFn: ({ id, password }) =>
      resetWebsiteUserPassword(id, password),
  });
}