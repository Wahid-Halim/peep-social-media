import { useCallback, useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import { usePost } from "./usePost";
import toast from "react-hot-toast";
import api from "@/libs/api";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const queryClient = useQueryClient();

  const { data: currentUser } = useCurrentUser();
  const currentUserData = currentUser?.data;
  console.log(currentUserData, "ok", currentUserData);

  const { data } = usePost(postId);
  const post = data?.data;

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = post?.likedIds || [];

    return list.includes(currentUserData?.id);
  }, [currentUserData, post]);

  const toggleLike = useCallback(async () => {
    if (!currentUserData) {
      return loginModal.onOpen();
    }

    try {
      let request;
      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUserData, hasLiked, postId, loginModal, queryClient, userId]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
