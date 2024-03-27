export const dynamic = "force-dynamic";
import React from "react";
import { newVehicleServices } from "../backend/services/impl/vehicle_services_impl";
import VehicleList from "./vehicleList";
import { Vehicle } from "@prisma/client";

const Page = async () => {
  let allVehicle: Vehicle[] | [];
  /*
      @TODO : please get allVehicleList directly from prisma service;
  */

  allVehicle = []; //put here

  return <VehicleList data={allVehicle} />;
};

export default Page;
