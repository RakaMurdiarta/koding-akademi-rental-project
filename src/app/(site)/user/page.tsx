// "use client";
import React, { useEffect } from "react";
import {
  Vehicle,
  vehicleServiceController,
} from "../../service/vehichleServiceController";
import { AxiosError } from "axios";
import { BaseApiResponse } from "../../service/interface";
import { loginResponse } from "../../service/authServiceController";
import VehicleList from "./vehicleList";
import { toast } from "react-toastify";

const dummyVehicle: Vehicle[] = [
  {
    id: "d1b07286-390e-4dd2-8e7c-c5e9f183f1f2",
    model: "HONDA C-RV",
    year: 2010,
    identityNumber: "B-1208-PJC",
    ownerId: "78aff25e-2277-4506-a4fb-9096eb674246",
    price: 229922,
    type: "mobil",
    imageUrl:
      "https://media.karousell.com/media/photos/products/2020/11/11/honda_crv_24_at_2010_antik_1605071230_72ddd4d6_progressive.jpg",
  },
  {
    id: "d1b07286-390e-4dd2-8e7c-c5e9f183f1f2",
    model: "HONDA C-RV",
    year: 2010,
    identityNumber: "B-1208-PJC",
    ownerId: "78aff25e-2277-4506-a4fb-9096eb674246",
    price: 229922,
    type: "mobil",
    imageUrl:
      "https://media.karousell.com/media/photos/products/2020/11/11/honda_crv_24_at_2010_antik_1605071230_72ddd4d6_progressive.jpg",
  },
];

const Page = async () => {
  const getAllVehicle = async () => {
    console.log("jalanTest");
    const vehicleService = new vehicleServiceController();

    const data = await vehicleService
      .getAll()
      .then((resp) => {
        return resp.data.data;
      })
      .catch((err) => {
        // const error: AxiosError<BaseApiResponse<loginResponse>> = err as any;
        // console.log(error.response?.data);
        console.log(err);
        console.log(err ?? "Something went wrong!");
        return [];
        // return dummyVehicle;
      });

    return data;
  };

  const allVehicle: Vehicle[] | [] = await getAllVehicle();

  return <VehicleList data={allVehicle} />;
};

export default Page;
