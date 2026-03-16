// src/queries/priceUploadsQuery.js

import { useQuery } from "@tanstack/react-query";
import {
  getPriceUploads,
  getPriceUploadById,
  getPriceRowsByUploadId,
  getActivePriceUploadByWarehouse,
} from "../api/priceUploadService";

export function usePriceUploads() {
  return useQuery({
    queryKey: ["priceUploads"],
    queryFn: getPriceUploads,
  });
}

export function usePriceUpload(uploadId) {
  return useQuery({
    queryKey: ["priceUpload", uploadId],
    queryFn: () => getPriceUploadById(uploadId),
    enabled: !!uploadId,
  });
}

export function usePriceRows(uploadId) {
  return useQuery({
    queryKey: ["priceRows", uploadId],
    queryFn: () => getPriceRowsByUploadId(uploadId),
    enabled: !!uploadId,
  });
}

export function useActivePriceUpload(warehouseId) {
  return useQuery({
    queryKey: ["activePriceUpload", warehouseId],
    queryFn: () => getActivePriceUploadByWarehouse(warehouseId),
    enabled: !!warehouseId,
  });
}