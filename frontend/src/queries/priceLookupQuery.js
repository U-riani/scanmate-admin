// src/queries/priceLookupQuery.js

import { useQuery } from "@tanstack/react-query";
import { lookupBarcodePrice } from "../api/priceLookupService";

export function usePriceLookup(warehouseId, barcode) {
  return useQuery({
    queryKey: ["priceLookup", warehouseId, barcode],
    queryFn: () => lookupBarcodePrice(warehouseId, barcode),
    enabled: !!warehouseId && !!barcode,
  });
}