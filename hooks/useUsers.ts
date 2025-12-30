"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";
import { User } from "@prisma/client";

// queryFn
const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get("/users"); // calls /api/users
  return res.data;
};

// useQuery
const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,

    staleTime: 1000 * 60 * 5,
    retry: 1, // retry once on failure
  });
};

export { useUsers };
