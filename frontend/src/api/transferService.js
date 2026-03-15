// src/api/transferService.js

import { mockTransferDocs } from "../data/mockTransferDocs";

let db = [...mockTransferDocs];

export async function getTransfers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(db), 200);
  });
}

export async function createTransfer(data) {

  return new Promise((resolve) => {

    const doc = {
      id: Date.now(),

      name: data.name,
      number: data.number,

      from_warehouse_id: data.from_warehouse_id,
      to_warehouse_id: data.to_warehouse_id,

      type: data.type,

      status: "draft",

      sender_user_id: data.sender_user_id,
      receiver_user_id: data.receiver_user_id ?? null,

      sender_finished_at: null,
      receiver_finished_at: null,

      signature_status: "pending",
      signed_by_user_id: null,
      signed_at: null,

      created_by: data.created_by ?? 1,

      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),

      total_lines: 0,
      sent_lines: 0,
      received_lines: 0,
      difference_lines: 0,

      is_locked: false
    };

    db.push(doc);

    setTimeout(() => resolve(doc), 200);

  });

}

export async function updateTransferStatus(id, newStatus) {

  return new Promise((resolve, reject) => {

    const doc = db.find((d) => d.id === id);

    if (!doc) {
      reject("Transfer not found");
      return;
    }

    doc.status = newStatus;
    doc.updated_at = new Date().toISOString();

    // automatic locking if closed
    if (newStatus === "closed") {
      doc.is_locked = true;
      doc.closed_at = new Date().toISOString();
    }

    setTimeout(() => resolve(doc), 200);

  });

}

export async function signTransfer(id, userId) {

  return new Promise((resolve, reject) => {

    const doc = db.find((d) => d.id === id);

    if (!doc) {
      reject("Transfer not found");
      return;
    }

    doc.signature_status = "confirmed";
    doc.signed_by_user_id = userId;
    doc.signed_at = new Date().toISOString();

    setTimeout(() => resolve(doc), 200);

  });

}


export async function addTransferLines(documentId, products) {

  return new Promise((resolve) => {

    const created = products.map((product) => {

      const line = {
        id: Date.now() + Math.random(),

        document_id: documentId,

        product_id: product.product_id ?? null,

        barcode: product.barcode,
        article_code: product.article_code,
        product_name: product.product_name,

        expected_qty: product.expected_qty ?? 0,

        sent_qty: 0,
        received_qty: 0,

        difference_qty: 0,

        sender_user_id: null,
        receiver_user_id: null,

        sender_scanned_at: null,
        receiver_scanned_at: null,

        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      db.push(line);

      return line;
    });

    setTimeout(() => resolve(created), 200);

  });

}