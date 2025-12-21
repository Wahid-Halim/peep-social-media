import { format } from "date-fns";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUser } from "@/hooks/useUser";
import React, { useMemo } from "react";
import Button from "../Button";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUserData } = useCurrentUser();
  const currentUser = currentUserData?.data;
  console.log(currentUser);

  const { data } = useUser(userId);
  const user = data?.data;
  console.log(user);

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
          <Button secondary label="Edit" />
        ) : (
          <Button secondary label="Follow" />
        )}
      </div>
    </div>
  );
};

export default UserBio;
