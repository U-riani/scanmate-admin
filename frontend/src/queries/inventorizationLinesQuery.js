// src/queries/inventorizationLinesQuery.js

import { useQuery } from "@tanstack/react-query";
import { getInventorizationLines } from "../api/inventorizationLinesService";

export function useInventorizationLines(documentId) {

  return useQuery({
    queryKey: ["inventorizationLines", documentId],
    queryFn: () => getInventorizationLines(documentId),
    enabled: !!documentId
  });

}