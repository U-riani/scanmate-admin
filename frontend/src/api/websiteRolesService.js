// src/api/websiteRolesService.js
import { mockWebsiteRoles } from "../data/mockWebsiteRoles";

let rolesDB = [...mockWebsiteRoles];

export async function getWebsiteRoles() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(rolesDB), 200);
  });
}

export async function createWebsiteRole(role) {
  return new Promise((resolve) => {
    const newRole = {
      ...role,
      id: Date.now(),
    };

    rolesDB.push(newRole);

    setTimeout(() => resolve(newRole), 200);
  });
}

export async function updateWebsiteRole(roleId, data) {
  return new Promise((resolve) => {
    rolesDB = rolesDB.map((role) =>
      role.id === roleId ? { ...role, ...data } : role
    );

    const updated = rolesDB.find((r) => r.id === roleId);

    setTimeout(() => resolve(updated), 200);
  });
}

export async function deleteWebsiteRole(roleId) {
  return new Promise((resolve) => {
    rolesDB = rolesDB.filter((r) => r.id !== roleId);
    setTimeout(() => resolve(true), 200);
  });
}