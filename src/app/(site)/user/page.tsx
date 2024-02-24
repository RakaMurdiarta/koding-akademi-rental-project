// "use client";
import React, { useEffect } from "react";
import {
  Vehicle,
  vehicleServiceController,
} from "../../service/vehichleServiceController";
import VehicleList from "./vehicleList";

const Page = async () => {
  const getAllVehicle = async () => {
    const vehicleService = new vehicleServiceController();

    const data = await vehicleService
      .getAll()
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
