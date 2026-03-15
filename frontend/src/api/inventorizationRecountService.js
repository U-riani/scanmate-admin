// src/api/inventorizationRecountService.js

import { mockInventorizationDocs } from "../data/mockInventorizationDocs";
import { mockInventorizationLines } from "../data/mockInventorizationLines";

let docs = [...mockInventorizationDocs];
let lines = [...mockInventorizationLines];

export async function createRecountDocument({
  parent_document_id,
  warehouse_id,
  employees,
  items
}) {

  return new Promise((resolve) => {

    const recountDoc = {
      id: Date.now(),
      name: `Recount for Doc ${parent_document_id}`,
      warehouse_id,
      type: "barcode",
      doc_type: "recount",
      parent_document_id,
      status: "draft",
      employees,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    docs.push(recountDoc);

    const recountLines = items.map((line) => ({
      id: Date.now() + Math.random(),
      document_id: recountDoc.id,

      barcode: line.barcode,
      article_code: line.article_code,
      product_name: line.product_name,

      expected_qty: line.counted_qty,
      counted_qty: null,

      recount_qty: null,
      recount_requested: false,

      employee_id: null
    }));

    lines.push(...recountLines);

    resolve({
      document: recountDoc,
      lines: recountLines
    });

  });

}