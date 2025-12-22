"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/libs/api";

const fetchUser = async (userId: string) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

const updateUser = async ({ userId, data }: { userId: string; data: any }) => {
  const res = await api.put(`/edit`, data);
  return res.data;
};

const useUser = (userId?: string) => {
  const queryClient = useQueryClient();

  // GET
  const query = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 min
    retry: 1,
  });

  // MUTATION
  const mutation = useMutation({
    mutationFn: (data: any) => updateUser({ userId: userId!, data }),
    onSuccess: (updatedUser) => {
      // Update the cache after success
      queryClient.setQueryData(["user", userId], updatedUser);
    },
  });

  return { ...query, mutateUser: mutation };
};

export { useUser };
