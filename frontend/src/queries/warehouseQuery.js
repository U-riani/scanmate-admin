// src/queries/warehouseQuery.js

import { useQuery } from "@tanstack/react-query";
import { getWarehouses } from "../api/warehouseService";

export function useWarehouses() {
  return useQuery({
    queryKey: ["warehouses"],
    queryFn: getWarehouses,
  });
}