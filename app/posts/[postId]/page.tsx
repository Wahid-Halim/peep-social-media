"use client";

import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import { usePost } from "@/hooks/usePost";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

const PostView = () => {
  const params = useParams();
  const postId = params.postId as string;

  const { data, isPending } = usePost(postId);
  const post = data?.data;

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={post} />
      <Form
        postId={postId as string}
        isComment
        placeholder="tweet your replay"
      />
      <CommentFeed comments={post?.comments} />
    </>
  );
};

export default PostView;
