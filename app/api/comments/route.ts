import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    const { body } = await req.json();
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId || typeof postId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replay to your post",
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

    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to follow user" },
      { status: 500 }
    );
  }
}
