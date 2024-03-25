import React from "react";
import DetailVehicles from "./detailVehicle";
import { newVehicleServices } from "@/app/backend/services/impl/vehicle_services_impl";
import { Vehicle } from "@prisma/client";

const Page = async ({ params }: { params: { id: string } }) => {
  // const dummy = {
  //   id: "1",
  //   model: "Toyota Corolla",
  //   year: 2020,
  //   identityNumber: "JT123456789012345",
  //   ownerId: "owner1",
  //   price: 20000,
  //   type: "Sedan",
  //   imageUrl: "https://example.com/toyota_corolla.jpg",
  //   isAvailable: true,
  // };

  let vehicleData: Vehicle | null;

  const getDetailVehicle = async (id: string) => {
    const vehicle = newVehicleServices.getVehicleById(id);
    return vehicle;
  };

  vehicleData = await getDetailVehicle(params.id);

  return <DetailVehicles vehicle={vehicleData} />;
};

export default Page;
