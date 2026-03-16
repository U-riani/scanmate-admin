// src/queries/priceUploadMutation.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPriceUpload,
  setActivePriceUpload,
  archivePriceUpload,
  addPriceRows,
} from "../api/priceUploadService";

export function useCreatePriceUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPriceUpload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["priceUploads"] });
      queryClient.invalidateQueries({ queryKey: ["activePriceUpload"] });
      queryClient.invalidateQueries({ queryKey: ["priceRows"] });
    },
  });
}

export function useSetActivePriceUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setActivePriceUpload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["priceUploads"] });
      queryClient.invalidateQueries({ queryKey: ["activePriceUpload"] });
    },
  });
}

export function useArchivePriceUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archivePriceUpload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["priceUploads"] });
      queryClient.invalidateQueries({ queryKey: ["activePriceUpload"] });
    },
  });
}


export function useAddPriceRows() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPriceRows,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["priceRows", variables.upload_id],
      });

      queryClient.invalidateQueries({
        queryKey: ["priceUpload", variables.upload_id],
      });
    },
  });
}