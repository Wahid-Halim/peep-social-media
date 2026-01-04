import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

/* FOLLOW */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const { currentUser } = await serverAuth(req);

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    if (!currentUser.followingIds.includes(userId)) {
      const updatedUser = await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          followingIds: {
            push: userId,
          },
        },
      });
      return NextResponse.json(updatedUser);
    } else {
      return NextResponse.json(currentUser);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to follow user" },
      { status: 500 }
    );
  }
}

/* UNFOLLOW */
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const { currentUser } = await serverAuth(req);

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        followingIds: {
          set: currentUser.followingIds.filter((id: string) => id !== userId),
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to unfollow user" },
      { status: 500 }
    );
  }
}
