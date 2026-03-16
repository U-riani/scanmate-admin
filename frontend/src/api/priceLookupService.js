// src/api/priceLookupService.js

import { mockPriceUploads } from "../data/mockPriceUploads";
import { mockPriceListRows } from "../data/mockPriceListRows";

let uploadsDb = [...mockPriceUploads];
let rowsDb = [...mockPriceListRows];

export async function lookupBarcodePrice(warehouseId, barcode) {
  return new Promise((resolve) => {
    const activeUpload = uploadsDb.find(
      (u) => u.warehouse_id === warehouseId && u.status === "active"
    );

    if (!activeUpload) {
      setTimeout(
        () =>
          resolve({
            found: false,
            barcode,
            warehouse_id: warehouseId,
            reason: "No active upload for warehouse",
          }),
        200
      );
      return;
    }

    const row = rowsDb.find(
      (r) =>
        r.upload_id === activeUpload.id &&
        String(r.barcode) === String(barcode)
    );

    if (!row) {
      setTimeout(
        () =>
          resolve({
            found: false,
            barcode,
            warehouse_id: warehouseId,
          }),
        200
      );
      return;
    }

    setTimeout(
      () =>
        resolve({
          found: true,
          barcode: row.barcode,
          warehouse_id: row.warehouse_id,
          base_price: row.base_price,
          adjusted_price: row.adjusted_price,
          price_type: row.price_type,
          article: row.article,
          name: row.name,
        }),
      200
    );
  });
}