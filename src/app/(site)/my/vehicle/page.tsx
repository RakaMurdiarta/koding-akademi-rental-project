import React from "react";
import UserController from "@/utils/controllers/userController";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
import { Vehicle } from "@prisma/client";
import MyVehicles from "./myVehicles";
import { NextRequest, NextResponse } from "next/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const Page = async () => {
  const cookie = cookies().get("jwt") as RequestCookie;
  const token = cookie.value as string;
  const user = new UserController(token);
  const userId = user.userId;

  let myVehicle: Vehicle[] | [];

  /*
      @TODO : please get customerVehicleList directly from prisma service;
  */

  myVehicle = [];

  return <MyVehicles data={myVehicle} />;
};

export default Page;
