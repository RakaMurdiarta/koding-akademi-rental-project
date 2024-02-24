"use client";
import { formatToRupiahIntl } from "@/app/(site)/utils";
import { Form, Formik } from "formik";
import {
  Rent,
  Vehicle,
  vehicleServiceController,
} from "@/app/service/vehichleServiceController";
import React, { FC, useState } from "react";
import rentValidation from "@/lib/validationSchema/rentValidation";
import AuthInput from "@/components/ui/form/input";
import { toast } from "react-toastify";

type prop = {
  vehicle: Vehicle | null;
};

type rentFormData = {
  from: string;
  until: string;
};

const DetailVehicles: FC<prop> = ({ vehicle }) => {
  const [rentFormData, setRentFormData] = useState<rentFormData>({
    from: "",
    until: "",
  });

  const vehicleService = new vehicleServiceController();
  const rent = async ({ from, until }: rentFormData) => {
    const data: Rent = {
      from: from,
      until: until,
      total: vehicle !== null ? vehicle.price : 0,
      vehicle_id: vehicle !== null ? vehicle.id : "",
    };
    await vehicleService
      .rent(data)
      .then((resp) => {
        toast.success("Vehicle Rented!");
      })
      .catch((err) => {
        toast.error(err.message ?? "Please try again!");
      });
  };

  return (
    <>
      {vehicle !== null ? (
        <div className="w-full flex flex-col gap-6 text-[#909090] py-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-bold">{vehicle.model}</h1>
            <p>owner: {vehicle.owner.customer.fullname}</p>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-7/12 h-[320px] rounded-md overflow-hidden mx-auto">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.model}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="w-7/12 flex flex-col gap-2">
              <div>
                <p className="text-2xl text-black font-bold">{vehicle.model}</p>
                <p className="italic text-xl">
                  {vehicle.type} - {vehicle.year}
                </p>
              </div>
              <div>
                <p className="italic text-md">Price</p>
                <p className="text-2xl font-bold text-black">
                  {formatToRupiahIntl(vehicle.price)}
                  <span className="font-normal">/day</span>
                </p>
              </div>
              <Formik
                initialValues={rentFormData}
                onSubmit={(values) => {
                  rent(values);
                }}
                validationSchema={rentValidation}
              >
                {({ errors, touched, values, handleChange }) => (
                  <Form>
                    <p className="">Please input your rental duration!</p>
                    <p className="italic mb-4 text-sm">example: 2024-02-14</p>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <AuthInput
                          error={errors.from}
                          name="From"
                          type="text"
                          touched={touched.from}
                          value={values.from}
                          handleChange={handleChange("from")}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <AuthInput
                          error={errors.until}
                          name="Until"
                          type="text"
                          touched={touched.until}
                          value={values.until}
                          handleChange={handleChange("until")}
                        />
                      </div>
                    </div>

                    <div className="mt-2 text-center">
                      <button
                        type="submit"
                        className="w-full px-8 py-1 rounded border-2 border-neutral-200 text-xs uppercase leading-normal transition duration-150 ease-in-out  bg-slate-600 hover:bg-slate-700 font-bold text-white"
                      >
                        Rent!
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <div>Opps Something Went Wrong!</div>
      )}
    </>
  );
};

export default DetailVehicles;
