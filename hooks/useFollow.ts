import { useCallback, useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const useFollow = (userId: string) => {
  const queryClient = useQueryClient();
  const { data: currentUserData } = useCurrentUser();
  const currentUser = currentUserData?.data;
  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    try {
      let request;
      if (isFollowing) {
        request = () =>
          axios.delete("/api/follow", {
            data: { userId },
          });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();

      // 🔁 refetch data
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, isFollowing, userId, loginModal, queryClient]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
