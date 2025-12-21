import React from "react";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data } = useUser(userId);
  const user = data?.data;

  return (
    <div className="">
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            src={user.coverImage}
            fill
            alt="cover image"
            className="object-cover"
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
