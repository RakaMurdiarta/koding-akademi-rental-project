import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./nav";
import { customerService } from "../backend/services/impl/customer_service_impl";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import jwt from "jsonwebtoken";
import UserController from "@/utils/controllers/userController";
import { userStatus } from "../service/userServiceController";
import { NextRequest, NextResponse } from "next/server";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies().get("jwt") as RequestCookie;
  const token = cookie.value as string;
  const user = new UserController(token);

  const getIsOwner = async () => {
    const userId = user.userId;
    const isOwner = await customerService.isOwner(userId);
    return isOwner;
  };

  const data = (await getIsOwner()) as userStatus;

  console.log(data);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav data={data}>{children}</Nav>
      </body>
    </html>
  );
}
