"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";

// queryFn
const fetchUser = async (userId: string) => {
  const res = await api.get(userId ? `/users/${userId}` : "");
  return res.data;
};

// useQuery
const useUser = (userId: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(userId),

    staleTime: 1000 * 60 * 5,
    retry: 1, // retry once on failure
  });
};

export { useUser };
