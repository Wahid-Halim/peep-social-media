"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";

// queryFn
const fetchCurrentUser = async () => {
  const res = await api.get("/users"); // calls /api/user
  return res.data;
};

// useQuery
const UseUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchCurrentUser,

    staleTime: 1000 * 60 * 5,
    retry: 1, // retry once on failure
  });
};

export { UseUsers };
