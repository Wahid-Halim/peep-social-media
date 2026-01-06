import { useCallback, useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import { usePost } from "./usePost";
import toast from "react-hot-toast";
import api from "@/libs/api";
import { useQueryClient } from "@tanstack/react-query";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const queryClient = useQueryClient();

  const { data: currentUser } = useCurrentUser();

  const { data } = usePost(postId);
  const post = data?.data;

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = data?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser, data]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      if (hasLiked) {
        request = () => api.delete("/like", { data: { postId } });
      } else {
        request = () => api.post("/like", { postId });
      }

      await request();
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, hasLiked, postId, loginModal, queryClient, userId]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
