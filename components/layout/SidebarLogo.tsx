"use client";
import { useRouter } from "next/navigation";
import { FaFeatherAlt } from "react-icons/fa";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 
    w-14 p-4 flex items-center justify-center 
    hover:bg-secondary/50
    cursor-pointer
    transition
    "
    >
      <FaFeatherAlt size={28} />
    </div>
  );
};

export default SidebarLogo;
