import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";

const fetchPost = async (postId?: string) => {
  const res = await api.get(`/posts/${postId}`);
  return res.data;
};

export const usePost = (postId?: string) => {
  return useQuery({
    queryKey: ["post", postId], 
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
  });
};
