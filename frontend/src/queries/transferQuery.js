//src/queries/transferQuery.js

import { useQuery } from "@tanstack/react-query";
import { getTransfers } from "../api/transferService";

export function useTransfers() {

  return useQuery({
    queryKey: ["transfers"],
    queryFn: getTransfers
  });

}