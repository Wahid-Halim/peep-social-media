"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";

// queryFn
const fetchCurrentUser = async () => {
  const res = await api.get("/current-user"); // calls /api/user
  return res.data;
};

// useQuery
const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: 1,
  });
};

export { useCurrentUser };
