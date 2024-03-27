import React from "react";
import DetailVehicles from "./detailVehicle";
import { newVehicleServices } from "@/app/backend/services/impl/vehicle_services_impl";
import { Vehicle } from "@prisma/client";

const Page = async ({ params }: { params: { id: string } }) => {
  let vehicleData: Vehicle | null;

  /*
      @TODO : please get vehicleByID directly from prisma service;
  */

  vehicleData = null;

  return <DetailVehicles vehicle={vehicleData} />;
};

export default Page;
