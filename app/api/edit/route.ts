import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { z } from "zod";

const editSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }).optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }).regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }).optional(),
  bio: z.string().optional(),
  profileImage: z.string().url({ message: "Invalid profile image URL" }).optional(),
  coverImage: z.string().url({ message: "Invalid cover image URL" }).optional(),
}).partial(); // All fields are optional

export async function PATCH(request: NextRequest) {
  try {
    const { currentUser } = await serverAuth(request);

    const body = await request.json();
    const validation = editSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, username, bio, profileImage, coverImage } = validation.data;

    const updatedData: { [key: string]: any } = {};

    if (name) updatedData.name = name;
    if (username) updatedData.username = username;
    if (bio) updatedData.bio = bio;
    if (profileImage) updatedData.profileImage = profileImage;
    if (coverImage) updatedData.coverImage = coverImage;

    // Check for unique username if it's being changed
    if (username && username !== currentUser.username) {
      const existingUserWithUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUserWithUsername) {
        return NextResponse.json(
          { success: false, message: "Username already exists" },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: updatedData,
    });

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user profile",
      },
      { status: 500 }
    );
  }
}
