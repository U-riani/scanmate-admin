// src/queries/pocketUsersQuery.js

import { useQuery } from "@tanstack/react-query";
import { getPocketUsers } from "../api/pocketUsersService";

export function usePocketUsers() {
  return useQuery({
    queryKey: ["pocketUsers"],
    queryFn: getPocketUsers
  });
}