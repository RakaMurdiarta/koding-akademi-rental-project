// "use client";
import {
  Rental,
  Vehicle,
  vehicleServiceController,
} from "@/app/service/vehichleServiceController";
import React from "react";
import RentedVehicles from "./rentedVehicles";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const Page = async () => {
  const getAllRentedVehicle = async () => {
    const cookie = cookies().get("jwt") as RequestCookie;
    const jwt = cookie.value as string;
    console.log("jalanTest", jwt);
    const vehicleService = new vehicleServiceController();

    const data = await vehicleService
      .getRented(jwt)
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

  const rentedVehicle: Rental[] | [] = await getAllRentedVehicle();

  return <RentedVehicles data={rentedVehicle} />;
};

export default Page;
