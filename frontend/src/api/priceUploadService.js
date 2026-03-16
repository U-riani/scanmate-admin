// src/api/priceUploadService.js

import { mockPriceUploads } from "../data/mockPriceUploads";
import { mockPriceListRows } from "../data/mockPriceListRows";

let uploadsDb = [...mockPriceUploads];
let rowsDb = [...mockPriceListRows];

function getPriceType(basePrice, adjustedPrice) {
  if (adjustedPrice < basePrice) return "discounted";
  if (adjustedPrice > basePrice) return "markup";
  return "none";
}

export async function getPriceUploads() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(uploadsDb), 200);
  });
}

export async function getPriceUploadById(uploadId) {
  return new Promise((resolve, reject) => {
    const upload = uploadsDb.find((u) => u.id === uploadId);

    if (!upload) {
      reject("Upload not found");
      return;
    }

    setTimeout(() => resolve(upload), 200);
  });
}

export async function getPriceRowsByUploadId(uploadId) {
  return new Promise((resolve) => {
    const rows = rowsDb.filter((r) => r.upload_id === uploadId);
    setTimeout(() => resolve(rows), 200);
  });
}

export async function getActivePriceUploadByWarehouse(warehouseId) {
  return new Promise((resolve) => {
    const upload = uploadsDb.find(
      (u) => u.warehouse_id === warehouseId && u.status === "active"
    );
    setTimeout(() => resolve(upload || null), 200);
  });
}

export async function createPriceUpload({
  warehouse_id,
  file_name,
  uploaded_by = 1,
  rows = [],
  notes = null,
}) {
  return new Promise((resolve, reject) => {
    if (!warehouse_id) {
      reject("Warehouse is required");
      return;
    }

    const errors = [];
    const preparedRows = [];
    const barcodeSeen = new Map();
    let duplicateCount = 0;

    rows.forEach((row, index) => {
      const barcode = String(row.barcode ?? "").trim();
      const name = String(row.name ?? "").trim();
      const category = String(row.category ?? "").trim();
      const color = String(row.color ?? "").trim();
      const size = String(row.size ?? "").trim();
      const group = String(row.group ?? "").trim();
      const article = String(row.article ?? "").trim();

      const basePrice = Number(row.base_price);
      const adjustedPrice = Number(row.adjusted_price);

      if (!barcode) {
        errors.push({ row: index + 1, reason: "Barcode is required" });
        return;
      }

      if (Number.isNaN(basePrice) || basePrice < 0) {
        errors.push({ row: index + 1, reason: "Base Price must be >= 0" });
        return;
      }

      if (Number.isNaN(adjustedPrice) || adjustedPrice < 0) {
        errors.push({ row: index + 1, reason: "Adjusted Price must be >= 0" });
        return;
      }

      const normalized = {
        barcode,
        name,
        category,
        color,
        size,
        group,
        article,
        base_price: basePrice,
        adjusted_price: adjustedPrice,
        price_type: getPriceType(basePrice, adjustedPrice),
      };

      if (barcodeSeen.has(barcode)) {
        duplicateCount += 1;
      }

      barcodeSeen.set(barcode, normalized);
    });

    for (const normalized of barcodeSeen.values()) {
      preparedRows.push(normalized);
    }

    uploadsDb = uploadsDb.map((u) =>
      u.warehouse_id === warehouse_id && u.status === "active"
        ? { ...u, status: "archived" }
        : u
    );

    const newUpload = {
      id: Date.now(),
      warehouse_id,
      file_name,
      uploaded_by,
      uploaded_at: new Date().toISOString(),
      rows_count: rows.length,
      valid_rows_count: preparedRows.length,
      error_rows_count: errors.length,
      duplicate_count: duplicateCount,
      status: "active",
      notes,
    };

    uploadsDb.push(newUpload);

    const newRows = preparedRows.map((row, i) => ({
      id: Date.now() + i + Math.random(),
      upload_id: newUpload.id,
      warehouse_id,
      ...row,
    }));

    rowsDb.push(...newRows);

    setTimeout(
      () =>
        resolve({
          upload: newUpload,
          rows: newRows,
          errors,
        }),
      200
    );
  });
}

export async function setActivePriceUpload(uploadId) {
  return new Promise((resolve, reject) => {
    const upload = uploadsDb.find((u) => u.id === uploadId);

    if (!upload) {
      reject("Upload not found");
      return;
    }

    uploadsDb = uploadsDb.map((u) =>
      u.warehouse_id === upload.warehouse_id
        ? { ...u, status: u.id === uploadId ? "active" : "archived" }
        : u
    );

    const updated = uploadsDb.find((u) => u.id === uploadId);

    setTimeout(() => resolve(updated), 200);
  });
}

export async function archivePriceUpload(uploadId) {
  return new Promise((resolve, reject) => {
    const upload = uploadsDb.find((u) => u.id === uploadId);

    if (!upload) {
      reject("Upload not found");
      return;
    }

    upload.status = "archived";

    setTimeout(() => resolve(upload), 200);
  });
}

export async function addPriceRows({ upload_id, rows }) {
  return new Promise((resolve, reject) => {
    const upload = uploadsDb.find((u) => u.id === upload_id);

    if (!upload) {
      reject("Upload not found");
      return;
    }

    const errors = [];
    const preparedRows = [];
    const barcodeSeen = new Map();
    let duplicateCount = 0;

    rows.forEach((row, index) => {
      const barcode = String(row.barcode ?? "").trim();
      const name = String(row.name ?? "").trim();
      const category = String(row.category ?? "").trim();
      const color = String(row.color ?? "").trim();
      const size = String(row.size ?? "").trim();
      const group = String(row.group ?? "").trim();
      const article = String(row.article ?? "").trim();

      const basePrice = Number(row.base_price);
      const adjustedPrice = Number(row.adjusted_price);

      if (!barcode) {
        errors.push({ row: index + 1, reason: "Barcode is required" });
        return;
      }

      if (Number.isNaN(basePrice) || basePrice < 0) {
        errors.push({ row: index + 1, reason: "Base Price must be >= 0" });
        return;
      }

      if (Number.isNaN(adjustedPrice) || adjustedPrice < 0) {
        errors.push({ row: index + 1, reason: "Adjusted Price must be >= 0" });
        return;
      }

      const normalized = {
        barcode,
        name,
        category,
        color,
        size,
        group,
        article,
        base_price: basePrice,
        adjusted_price: adjustedPrice,
        price_type: getPriceType(basePrice, adjustedPrice),
      };

      if (barcodeSeen.has(barcode)) {
        duplicateCount++;
      }

      barcodeSeen.set(barcode, normalized);
    });

    for (const row of barcodeSeen.values()) {
      preparedRows.push(row);
    }

    const newRows = preparedRows.map((row, i) => ({
      id: Date.now() + i + Math.random(),
      upload_id,
      warehouse_id: upload.warehouse_id,
      ...row,
    }));

    rowsDb.push(...newRows);

    upload.rows_count += rows.length;
    upload.valid_rows_count += preparedRows.length;
    upload.error_rows_count += errors.length;
    upload.duplicate_count += duplicateCount;

    setTimeout(
      () =>
        resolve({
          rows: newRows,
          errors,
        }),
      200
    );
  });
}