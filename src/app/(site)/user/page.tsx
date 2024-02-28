export const dynamic = "force-dynamic";
import React, { useEffect } from "react";
import {
  Vehicle,
  vehicleServiceController,
} from "../../service/vehichleServiceController";
import VehicleList from "./vehicleList";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const Page = async () => {
  const getAllVehicle = async () => {
    const cookie = cookies().get("jwt") as RequestCookie;
    const jwt = cookie.value as string;
    const vehicleService = new vehicleServiceController();

    const data = await vehicleService
      .getAll(jwt)
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

  const allVehicle: Vehicle[] | [] = await getAllVehicle();

  return <VehicleList data={allVehicle} />;
};

export default Page;
