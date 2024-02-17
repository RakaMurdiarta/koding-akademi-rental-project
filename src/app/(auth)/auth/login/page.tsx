"use client";
import {
  AuthServiceController,
  loginFormData,
  loginResponse,
} from "@/app/service/authServiceController";
import { BaseApiResponse } from "@/app/service/interface";
import AuthInput from "@/components/ui/form/input";
import loginValidation from "@/lib/validationSchema/loginValidation";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [loginFormData, setLoginFormData] = useState<loginFormData>({
    email: "",
    password: "",
  });

  const authService = new AuthServiceController();
  const router = useRouter();

  const login = async (data: loginFormData) => {
    await authService
      .login(data)
      .then((resp) => {
        toast.success("Successfully register proceed to log in!");
        console.log(resp);
        // setTimeout(() => {
        //   router.push("/");
        // }, 2500);
      })
      .catch((err) => {
        const error: AxiosError<BaseApiResponse<loginResponse>> = err as any;
        toast.error(error.response?.data.message ?? "Please try again!");
      });
  };

  return (
    <>
      <Formik
        initialValues={loginFormData}
        onSubmit={(values) => {
          login(values);
        }}
        validationSchema={loginValidation}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <p className="mb-4">Please login to your account</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <AuthInput
                  error={errors.email}
                  name="Email"
                  type="email"
                  touched={touched.email}
                  value={values.email}
                  handleChange={handleChange("email")}
                />
                {touched.email && errors?.email && (
                  <p className="text-red-500 mt-0.5">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <AuthInput
                  error={errors.password}
                  name="Password"
                  type="password"
                  touched={touched.email}
                  value={values.password}
                  handleChange={handleChange("password")}
                />
                {touched.password && errors?.password && (
                  <p className="text-red-500 mt-0.5">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="my-8 text-center">
              <button
                type="submit"
                className="px-8 py-3 rounded border-2 border-neutral-200 text-xs uppercase leading-normal transition duration-150 ease-in-out  bg-slate-600 hover:bg-slate-700 font-bold text-white"
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex items-center justify-between pb-6">
        <p className="mb-0 mr-2">Dont have an account?</p>
        <a
          href="/auth/register"
          className="px-8 py-3 rounded border-2 border-neutral-200 text-xs uppercase leading-normal transition duration-150 ease-in-out  bg-transparent hover:bg-slate-100 font-bold text-black"
        >
          register
        </a>
      </div>
    </>
  );
};

export default Page;
