import React, { FC, useEffect } from "react";
import AdminTable from "./adminTable";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
  CustomerListData,
  adminServiceController,
} from "@/app/service/adminServiceController";

const dummyData = [
  {
    id: "22739f0d-bb7a-4032-97ca-b8b292e5541a",
    customerId: "e783065d-11dc-4bb5-8086-d5ed7a8173f7",
    status: "requested",
  },
  {
    id: "ca8d0b7c-62ad-465e-8a3e-5b9f7b3fe14e",
    customerId: "8be1b2b5-c173-46fb-bd60-85c349ecf995",
    status: "accepted",
  },
];

const Page = async () => {
  // const getRequestList = async () => {
  //   const cookie = cookies().get("jwt") as RequestCookie;
  //   const jwt = cookie.value as string;
  //   const vehicleService = new adminServiceController();

  //   const data = await vehicleService
  //     .getList(jwt)
  //     .then((resp) => {
  //       return resp.data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log(err ?? "Something went wrong!");
  //       return [];
  //     });

  //   return data;
  // };

  // const requestList: CustomerListData[] | [] = await getRequestList();

  return <AdminTable />;
};

export default Page;
