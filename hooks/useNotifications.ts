import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";

const fetchPosts = async (userId?: string) => {
  const res = await api.get(`/notifications?userId=${userId}`);
  return res.data;
};

export const useNotifications = (userId?: string) => {
  return useQuery({
    queryKey: ["notifications", userId], // 🔑 IMPORTANT
    queryFn: () => fetchPosts(userId),
    enabled: userId !== undefined || userId === undefined,
  });
};
