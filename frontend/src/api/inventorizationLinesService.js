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


export async function importInventorizationLines(documentId, rows) {
  return new Promise((resolve) => {
    const errors = [];
    const prepared = [];

    rows.forEach((row, index) => {
      const barcode = String(row["Barcode"] ?? "").trim();

      if (!barcode) {
        errors.push({
          row: index + 2,
          reason: "Barcode missing",
        });
        return;
      }

      prepared.push({
        id: Date.now() + index,
        document_id: documentId,
        barcode: barcode,
        article_code: row["Article"] ?? "",
        product_name: row["Product"] ?? "",
        expected_qty: Number(row["Expected Qty"]) || 0,
        counted_qty: null,
      });
    });

    db.push(...prepared);

    setTimeout(() => {
      resolve({
        imported: prepared.length,
        errors,
      });
    }, 200);
  });
}