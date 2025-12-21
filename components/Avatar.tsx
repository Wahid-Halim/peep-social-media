import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const { data } = useUser(userId);
  const user = data?.data;

  const onClick = useCallback(
    (event: any) => {
      event?.stopPropagation();

      router.push(`users/${userId}`);
    },
    [router, userId]
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""} 
        ${isLarge ? "h-32 w-32" : "h-12 w-12"} 
rounded-full hover:opacity-90 transition cursor-pointer relative
      `}
    >
      <Image
        fill
        alt="Avatar"
        onClick={onClick}
        className="rounded-full object-cover"
        src={user?.profileImage || "/images/placeholder.jpg"}
      />
    </div> 
  );
};

export default Avatar;
