import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./prisma";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) throw new Error("Not authenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  return { session, user };
};

export default serverAuth;
