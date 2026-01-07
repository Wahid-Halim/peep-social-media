"use client";
import useTweetModal from "@/hooks/useTweetModal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import useLoginModal from "@/hooks/useLoginModal";

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();
  const tweetModal = useTweetModal();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    tweetModal.onOpen();
  }, [loginModal, currentUser, tweetModal]);

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-gray-800 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-secondary hover:bg-secondary/75 cursor-pointer transition">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Post
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
