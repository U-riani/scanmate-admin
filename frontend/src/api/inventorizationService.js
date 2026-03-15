// src/api/inventorizationService.js

import { mockInventorizationDocs } from "../data/mockInventorizationDocs";

let db = [...mockInventorizationDocs];

export async function getInventorizations() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(db), 200);
  });
}

export async function createInventorization(data) {
  return new Promise((resolve) => {
    const doc = {
      ...data,
      id: Date.now(),
      status: "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.push(doc);

    setTimeout(() => resolve(doc), 200);
  });
}

export async function updateInventorizationStatus(id, newStatus) {

  return new Promise((resolve, reject) => {

    const doc = db.find((d) => d.id === id);

    if (!doc) {
      reject("Document not found");
      return;
    }

    doc.status = newStatus;
    doc.updated_at = new Date().toISOString();

    setTimeout(() => resolve(doc), 200);
  });

}