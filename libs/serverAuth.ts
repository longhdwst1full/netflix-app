import prisma from "@/libs/prismadb";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
const serverAuth = async (req: NextApiRequest) => {
  const sesstion = await getSession({ req });

  if (!sesstion?.user?.email) {
    throw new Error("Not signed in");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: sesstion.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return { currentUser };
};

export default serverAuth;
