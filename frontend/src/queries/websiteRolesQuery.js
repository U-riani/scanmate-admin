// src/queries/websiteRolesQuery.js

import { useQuery } from "@tanstack/react-query";
import { getWebsiteRoles } from "../api/websiteRolesService";

export function useWebsiteRoles() {
  return useQuery({
    queryKey: ["websiteRoles"],
    queryFn: getWebsiteRoles,
  });
}