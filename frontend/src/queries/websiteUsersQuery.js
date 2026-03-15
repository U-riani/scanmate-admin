// src/queries/websiteUsersQuery.js

import { useQuery } from "@tanstack/react-query";
import { getWebsiteUsers } from "../api/websiteUsersService";

export function useWebsiteUsers() {
  return useQuery({
    queryKey: ["websiteUsers"],
    queryFn: getWebsiteUsers,
  });
}