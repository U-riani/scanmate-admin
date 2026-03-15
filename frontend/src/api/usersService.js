// frontend/src/api/usersService.js

import { mockWarehouseUsers } from "../data/mockWarehouseUsers";

let usersDB = [...mockWarehouseUsers];

export async function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(usersDB), 300);
  });
}

export async function createUser(newUser) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const created = {
        ...newUser,
        id: Date.now(),
      };

      usersDB.push(created);
      resolve(created);
    }, 300);
  });
}