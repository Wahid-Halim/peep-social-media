import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function PATCH(request: Request) {
  try {
    const { user } = await serverAuth();
    console.log(user);

    const body = await request.json();
    const { name, username, bio, profileImage, coverImage } = body;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { name, username, bio, profileImage, coverImage },
    });

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
