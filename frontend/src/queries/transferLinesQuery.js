// src/queries/transferLinesQuery.js

import { useQuery } from "@tanstack/react-query";
import { getTransferLines } from "../api/transferLinesService";

export function useTransferLines(documentId) {

  return useQuery({
    queryKey: ["transferLines", documentId],
    queryFn: () => getTransferLines(documentId),
    enabled: !!documentId
  });

}