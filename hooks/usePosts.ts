"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";
import { Post } from "@prisma/client";

const fetchPosts = async (userId?: string): Promise<Post[]> => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";
  const res = await api.get(url);
  return res.data;
};

const usePosts = (userId?: string) => {
  return useQuery<Post[], Error>({
    queryKey: userId ? ["posts", userId] : ["posts"],
    queryFn: () => fetchPosts(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // retry once on failure
  });
};

export { usePosts };
