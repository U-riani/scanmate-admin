// frontend/src/queries/pocketRolesQuery.js

import { useQuery } from "@tanstack/react-query";
import { getPocketRoles } from "../api/pocketRolesService";

export function usePocketRoles() {
  return useQuery({
    queryKey: ["pocketRoles"],
    queryFn: getPocketRoles,
  });
}