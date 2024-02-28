export const dynamic = "force-dynamic";

import React, { FC, useEffect } from "react";
import AdminTable from "./adminTable";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
  CustomerListData,
  adminServiceController,
} from "@/app/service/adminServiceController";

const Page = async () => {
  const getRequestList = async () => {
    const cookie = cookies().get("jwt") as RequestCookie;
    const jwt = cookie.value as string;
    const vehicleService = new adminServiceController();

    const data = await vehicleService
      .getList(jwt)
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

  const requestList: CustomerListData[] | [] = await getRequestList();

  return <AdminTable data={requestList} />;
};

export default Page;
