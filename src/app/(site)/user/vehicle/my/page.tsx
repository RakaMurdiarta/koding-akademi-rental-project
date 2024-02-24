import { vehicleServiceController } from "@/app/service/vehichleServiceController";
import React, { useEffect } from "react";
import MyVehicles from "./myVehicles";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const Page = async () => {
  const getAllMyVehicle = async () => {
    const cookie = cookies().get("jwt") as RequestCookie;
    const jwt = cookie.value as string;
    const vehicleService = new vehicleServiceController();

    const data = await vehicleService
      .getMy(jwt)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
        console.log(err ?? "Something went wrong!");
        return [];
      });

    return data;
  };

  const rentedVehicle: any = await getAllMyVehicle();

  return <MyVehicles data={rentedVehicle} />;
};

export default Page;
