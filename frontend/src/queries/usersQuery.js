// frontend/src/queries/usersQuery.js
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/usersService";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });
}