"use client";
import { Button } from "@/components/ui/button";
// import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const Login = () => {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState<{
    err: string;
    resolve: string;
  }>({
    err: "",
    resolve: "",
  });
  
  interface Ilogin {
    email : string
    password : string
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const results = await fetch("/api/v1/auth/login", );

      console.log(results);
      if (results?.error) {
        setLoginStatus((prev) => {
          return { ...prev, err: results.error as string, resolve: "" };
        });
      } else {
        setLoginStatus((prev) => {
          return { ...prev, err: "", resolve: "succesfully login" };
        });

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-gradient-to-tr from-blue-800 to-purple-700 hidden lg:block w-full md:w-1/2 h-screen"></div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          {loginStatus.err && (
            <h1 className="bg-red-600 bg-opacity-60 p-3 rounded-lg mt-6 text-white">
              {loginStatus.err}
            </h1>
          )}

          {loginStatus.resolve && (
            <h1 className="bg-green-600 bg-opacity-60 p-3 rounded-lg mt-6 text-white">
              {loginStatus.resolve}
            </h1>
          )}

          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email Address"
                className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none ${
                  errors.email && "border-red-600"
                }`}
                required
                {...register("email", {
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "please enter the valid email",
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-600 text-sm p-1">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none ${
                  errors.password && "border-red-600"
                }`}
                required
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "You must Enter at least 8 charachter",
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-600 text-sm p-1">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              size={"lg"}
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Log In
            </Button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            onClick={() => {
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              });
            }}
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use href="#a" overflow="visible" />
                </clipPath>
                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
              <span className="ml-4">Log in with Google</span>
            </div>
          </button>

          <p className="mt-8">
            Need an account?
            <span className="text-blue-500 hover:text-blue-400 font-semibold">
              <Link href={"/register"}> Create an account</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;