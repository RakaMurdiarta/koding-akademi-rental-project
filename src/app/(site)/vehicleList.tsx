"use client";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { formatToRupiahIntl } from "./utils";
import { Vehicle } from "../service/vehichleServiceController";

type prop = {
  data: Vehicle[];
};

const VehicleList: FC<prop> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6 text-[#909090] py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-bold">
          All <span className="text-black">Vehicle</span>
        </h1>
        <p>Here is some of my latest creations, hope you enjoy it!</p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((vehicle, index) => (
            <div
              key={index}
              className="group block relative overflow-hidden rounded-xl transition-all ease-in-out duration-300 hover:shadow-xl"
            >
              <div className="w-full h-full transition-all ease-in-out duration-300">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.model}
                  className="w-full min-h-[300px] brightness-100 object-cover object-center brightness-100 group-hover:brightness-50 transition-all ease-in-out duration-300"
                />
              </div>
              <div className="bg-white w-full absolute bottom-[-150px] p-4 transition-all ease-in-out duration-300 group-hover:bottom-0 flex justify-between">
                <div className="flex flex-col gap-1 w-1/2">
                  <div className="min-h-[3rem]">
                    <p className="font-bold text-base  overflow-ellipsis">
                      {vehicle.model}
                    </p>
                    <p className="font-bold text-xs overflow-ellipsis">
                      {vehicle.owner.customer.fullname}
                    </p>
                  </div>
                  <p className="text-xs italic">Plate Number</p>
                  <p className="text-sm">{vehicle.identityNumber}</p>
                </div>
                <div className="h-auto flex flex-col w-1/2 gap-1 items-end justify-end">
                  <div>
                    <p className="text-xs italic text-end">Price</p>
                    <p className="font-bold">
                      {formatToRupiahIntl(vehicle.price)}
                      <span className="font-normal">/day</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      router.push(`/vehicle/${vehicle.id}`);
                    }}
                    className="px-2 py-1 rounded-sm border w-full transition-all ease-in-out hover:bg-slate-100"
                  >
                    RENT
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Vehicle</p>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
