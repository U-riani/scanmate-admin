// src/queries/inventorizationQuery.js

import { useQuery } from "@tanstack/react-query";
import { getInventorizations } from "../api/inventorizationService";

export function useInventorizations() {
  return useQuery({
    queryKey: ["inventorizations"],
    queryFn: getInventorizations,
  });
}