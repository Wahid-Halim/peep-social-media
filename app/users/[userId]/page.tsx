"use client";

import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import { useUser } from "@/hooks/useUser";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const { userId }: { userId: string } = useParams();
  const { data, isPending } = useUser(userId);
  const user = data?.data;
  console.log(user);

  if (isPending || !user)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );

  return (
    <>
      <Header label={user?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId} />
    </>
  );
};

export default UserView;
