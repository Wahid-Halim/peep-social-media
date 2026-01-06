"use client";

import { usePosts } from "@/hooks/usePosts";

import React from "react";
import { BiLoader } from "react-icons/bi";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data, isPending } = usePosts(userId);
  console.log(data);

  if (isPending) return <BiLoader />;

  console.log(data);
  return (
    <>
      {data?.map((post: Record<string, any>) => {
        return <PostItem userId={userId} key={post.id} data={post} />;
      })}
    </>
  );
};

export default PostFeed;
