"use client";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
  const loginModal = useRegisterModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-gray-800 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather />
      </div>

      <div className="mt-16 hidden lg:block px-4 py-2 rounded-full bg-primary hover:bg-opacity-90 cursor-pointer transition">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Post
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
