// frontend/src/services/authService.js

import { mockWebsiteUsers } from "../data/mockWebsiteUsers";
import { mockWebsiteRoles } from "../data/mockWebsiteRoles";

export function authenticate(email, password) {
  const user = mockWebsiteUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const role = mockWebsiteRoles.find((r) => r.id === user.role_id);

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role_id: role.id,
    role: role,
    warehouses: user.warehouses || [],
  };
}
