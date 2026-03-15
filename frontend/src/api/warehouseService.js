// warehouseService.js

import { mockWarehouses } from "../data/mockWarehouses";

let db = [...mockWarehouses];

export async function getWarehouses() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(db), 200);
  });
}

export async function createWarehouse(data) {
  return new Promise((resolve) => {

    const newWarehouse = {
      ...data,
      id: Date.now(),
    };

    db.push(newWarehouse);

    setTimeout(() => resolve(newWarehouse), 200);
  });
}

export async function updateWarehouse(id, data) {
  return new Promise((resolve) => {

    db = db.map((w) =>
      w.id === id ? { ...w, ...data } : w
    );

    const updated = db.find((w) => w.id === id);

    setTimeout(() => resolve(updated), 200);
  });
}

export async function deleteWarehouse(id) {
  return new Promise((resolve) => {

    db = db.filter((w) => w.id !== id);

    setTimeout(() => resolve(true), 200);
  });
}