// src/api/pocketUsersService.js
import { mockPocketUsers } from "../data/mockPocketUsers";

let db = [...mockPocketUsers];

export async function getPocketUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(db), 300);
  });
}

export async function createPocketUser(user) {
  return new Promise((resolve) => {
    const newUser = {
      ...user,
      id: Date.now(),
      last_login: null,
    };

    db.push(newUser);

    setTimeout(() => resolve(newUser), 300);
  });
}

export async function updatePocketUser(id, data) {
  return new Promise((resolve) => {

    db = db.map((u) =>
      u.id === id ? { ...u, ...data } : u
    );

    const updated = db.find((u) => u.id === id);

    setTimeout(() => resolve(updated), 300);
  });
}

export async function deletePocketUser(id) {
  return new Promise((resolve) => {

    db = db.filter((u) => u.id !== id);

    setTimeout(() => resolve(true), 300);
  });
}

export async function resetPocketUserPassword(id, password) {

  return new Promise((resolve) => {

    db = db.map((u) =>
      u.id === id
        ? { ...u, password }
        : u
    );

    setTimeout(() => resolve(true), 300);
  });
}