import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    console.log(userId, "userId in posts route");
    let posts;

    if (userId && typeof userId === "string") {
      posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json({ posts ,userId});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    const body = await req.json();
    const { body: postBody } = body;

    if (!postBody || typeof postBody !== "string" || postBody.length === 0) {
      return NextResponse.json(
        { error: "Post body cannot be empty" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        body: postBody,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
