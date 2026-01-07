import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";

/* LIKE POST */
export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json();
    const { currentUser } = await serverAuth(request);

    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedLikedIds = [...(post.likedIds || []), currentUser.id];

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likedIds: updatedLikedIds },
    });

    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone liked your post",
            userId: post.userId,
          },
        });
        await prisma.user.update({
          where: { id: post.userId },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* UNLIKE POST */
export async function DELETE(request: NextRequest) {
  try {
    const { postId } = await request.json();
    const { currentUser } = await serverAuth(request);

    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedLikedIds = (post.likedIds || []).filter(
      (id) => id !== currentUser.id
    );

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likedIds: updatedLikedIds },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
