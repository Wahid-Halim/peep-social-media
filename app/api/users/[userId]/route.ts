import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId && typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...user, followersCount },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Cannot get user" },
      { status: 500 }
    );
  }
}
