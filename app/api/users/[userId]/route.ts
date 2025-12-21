import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  console.log(userId);

  if (!userId || userId === "undefined") {
    return NextResponse.json(
      { success: false, message: "Invalid ID" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    const followersCount = await prisma.user.count({
      where: { followingIds: { has: userId } },
    });
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
