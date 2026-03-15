// src/api/transferLinesService.js

import { mockTransferLines } from "../data/mockTransferLines";

let db = [...mockTransferLines];

export async function getTransferLines(documentId) {

  return new Promise((resolve) => {

    const lines = db.filter(
      (l) => l.document_id === documentId
    );

    setTimeout(() => resolve(lines), 200);

  });

}

export async function addTransferLines(documentId, product) {

  return new Promise((resolve) => {

    const line = {
      id: Date.now(),

      document_id: documentId,

      product_id: product.product_id,

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

    setTimeout(() => resolve(line), 200);

  });

}

export async function updateSenderScan(lineId, qty, userId) {

  return new Promise((resolve, reject) => {

    const line = db.find((l) => l.id === lineId);

    if (!line) {
      reject("Line not found");
      return;
    }

    line.sent_qty = qty;
    line.sender_user_id = userId;
    line.sender_scanned_at = new Date().toISOString();

    line.updated_at = new Date().toISOString();

    setTimeout(() => resolve(line), 200);

  });

}

export async function updateReceiverScan(lineId, qty, userId) {

  return new Promise((resolve, reject) => {

    const line = db.find((l) => l.id === lineId);

    if (!line) {
      reject("Line not found");
      return;
    }

    line.received_qty = qty;
    line.receiver_user_id = userId;
    line.receiver_scanned_at = new Date().toISOString();

    line.difference_qty = qty - line.sent_qty;

    line.updated_at = new Date().toISOString();

    setTimeout(() => resolve(line), 200);

  });

}


export async function updateTransferLine(lineId, data) {

  return new Promise((resolve, reject) => {

    const line = db.find((l) => l.id === lineId);

    if (!line) {
      reject("Line not found");
      return;
    }

    if (data.sent_qty !== undefined) {
      line.sent_qty = data.sent_qty;
    }

    if (data.received_qty !== undefined) {
      line.received_qty = data.received_qty;
      line.difference_qty = line.received_qty - line.sent_qty;
    }

    if (data.expected_qty !== undefined) {
      line.expected_qty = data.expected_qty;
    }

    line.updated_at = new Date().toISOString();

    setTimeout(() => resolve(line), 200);

  });

}


export async function deleteTransferLine(lineId) {

  return new Promise((resolve, reject) => {

    const index = db.findIndex((l) => l.id === lineId);

    if (index === -1) {
      reject("Line not found");
      return;
    }

    db.splice(index, 1);

    setTimeout(() => resolve(true), 200);

  });

}