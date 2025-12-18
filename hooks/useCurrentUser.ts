"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";

// queryFn
const fetchCurrentUser = async () => {
  const res = await api.get("/user"); // calls /api/user
  return res.data;
};

// useQuery
const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,

    staleTime: 1000 * 60 * 5,
    retry: 1, // retry once on failure
  });
};

export { useCurrentUser };
