import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function get(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const notification = await prisma?.notification.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { hasNotification: false },
    });

      return NextResponse.json(notification);
      
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
