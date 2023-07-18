import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const sesstion = await  getServerSession(req, res, authOptions);
console.log("server auth", sesstion)
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
