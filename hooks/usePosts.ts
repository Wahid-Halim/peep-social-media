import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";

const fetchPosts = async (userId?: string) => {
  const url = userId ? `/posts?userId=${userId}` : "/posts";
  const res = await api.get(url);
  return res.data;
};

export const usePosts = (userId?: string) => {
  return useQuery({
    queryKey: ["posts", userId], // 🔑 IMPORTANT
    queryFn: () => fetchPosts(userId),
  });
};
