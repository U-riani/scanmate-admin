// frontend/src/api/pocketRolesService.js

import { mockPocketRoles } from "../data/mockPocketRoles";

let rolesDB = [...mockPocketRoles];

export async function getPocketRoles() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(rolesDB), 200);
  });
}

export async function createPocketRole(role) {
  return new Promise((resolve) => {
    const newRole = {
      ...role,
      id: Date.now(),
    };

    rolesDB.push(newRole);

    setTimeout(() => resolve(newRole), 200);
  });
}

export async function updatePocketRole(roleId, modules) {
  return new Promise((resolve) => {
    rolesDB = rolesDB.map((role) =>
      role.id === roleId ? { ...role, modules } : role
    );

    const updated = rolesDB.find((r) => r.id === roleId);

    setTimeout(() => resolve(updated), 200);
  });
}

export async function deletePocketRole(roleId) {
  return new Promise((resolve) => {
    rolesDB = rolesDB.filter((role) => role.id !== roleId);
    setTimeout(() => resolve(true), 200);
  });
}