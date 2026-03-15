// src/api/inventorizationLinesService.js

import { mockInventorizationLines } from "../data/mockInventorizationLines";
import { mockWarehouseProducts } from "../data/mockWarehouseProducts";

let db = [...mockInventorizationLines];

export async function getInventorizationLines(documentId) {
  return new Promise((resolve) => {
    const lines = db.filter((l) => l.document_id === documentId);

    setTimeout(() => resolve(lines), 200);
  });
}

export async function preloadLinesFromWarehouse(documentId, warehouseId) {
  return new Promise((resolve) => {
    const products = mockWarehouseProducts.filter(
      (p) => p.warehouse_id === warehouseId,
    );

    const lines = products.map((p) => ({
      id: Date.now() + Math.random(),
      document_id: documentId,

      barcode: p.barcode,
      article_code: p.article_code,
      product_name: p.product_name,

      expected_qty: p.stock_qty,
      counted_qty: 0,

      recount_qty: null,
      recount_requested: false,

      employee_id: null,
    }));

    db.push(...lines);

    setTimeout(() => resolve(lines), 200);
  });
}

export async function markLinesForRecount(lineIds) {
  return new Promise((resolve) => {
    db = db.map((l) =>
      lineIds.includes(l.id) ? { ...l, recount_requested: true } : l,
    );

    resolve(true);
  });
}
