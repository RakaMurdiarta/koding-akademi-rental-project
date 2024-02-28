// "use client";
import {
  Vehicle,
  vehicleServiceController,
} from "@/app/service/vehichleServiceController";
import React, { useEffect } from "react";
import VehicleList from "../../vehicleList";
import DetailVehicles from "./detailVehicle";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const dummyVehicle: Vehicle = {
  id: "d27f29b2-d18d-11ee-92b1-0242ac110129",
  model: "Toyota Camry",
  year: 2020,
  identityNumber: "123456789",
  ownerId: "ab1482c6-09b9-4fac-934e-ace53bd826a7",
  price: 50000,
  type: "Sedan",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg",
  isAvailable: true,
  owner: {
    id: "ab1482c6-09b9-4fac-934e-ace53bd826a7",
    customerId: "8be1b2b5-c173-46fb-bd60-85c349ecf995",
    customer: {
      phone: "081558446458",
      fullname: "raka",
    },
  },
};

const Page = async ({ params }: { params: { id: string } }) => {
  const getDetailVehicle = async (id: string) => {
    const cookie = cookies().get("jwt") as RequestCookie;
    const jwt = cookie.value as string;
    const vehicleService = new vehicleServiceController();

    const data = await vehicleService
      .getById(id, jwt)
      .then((resp) => {
        console.log("test", resp.data);
        return resp.data;
      })
      .catch((err) => {
        console.log(err ?? "Something went wrong!");
        // return null;
        return null;
      });

    return data;
  };

  const vehicle: Vehicle | null = await getDetailVehicle(params.id);

  return <DetailVehicles vehicle={vehicle} />;
};

export default Page;
