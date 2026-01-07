import api from "@/libs/api";
import { useQuery } from "@tanstack/react-query";

const fetchNotifications = async (userId?: string) => {
  if (!userId) return { notifications: [] }; // return empty if no user
  const res = await api.get(`/notifications?userId=${userId}`);
  return res.data;
};

export const useNotifications = (userId?: string) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId),
    enabled: !!userId, // only fetch if userId exists
  });
};
