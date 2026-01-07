import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import prisma from "./prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  return { currentUser };
};

export default serverAuth;