import { format } from "date-fns";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUser } from "@/hooks/useUser";
import React, { useMemo } from "react";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import uesEditModal from "@/hooks/useEditModal";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUserData } = useCurrentUser();
  const currentUser = currentUserData?.data;

  const { data } = useUser(userId);
  const user = data?.data;

  const editModal = uesEditModal();
  console.log(editModal);

  const createdAt = useMemo(() => {
    if (!user.createdAt) {
      return null;
    }

    return format(new Date(user.createdAt), "MMMM yyyy");
  }, [user.createdAt]);

  return (
    <div className="border-b border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={() => editModal.onOpen()} />
        ) : (
          <Button secondary label="Follow" />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{user?.name}</p>
          <p className="text-md text-neutral-500">@{user.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{user?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-3 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
