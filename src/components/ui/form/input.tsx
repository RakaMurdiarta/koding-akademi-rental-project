import React, { ChangeEvent, FC, useState } from "react";
import { Field } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type AuthInputType = {
  name: string;
  value?: string | number;
  error?: string;
  type: string;
  touched?: boolean;
  handleChange: (e: string | ChangeEvent<any>) => void;
};

const AuthInput: FC<AuthInputType> = ({
  error,
  name,
  value,
  type,
  touched,
  handleChange,
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="relative">
      <label
        className={`pointer-events-none bg-white px-2 absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]  font-semibold italic transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8]  motion-reduce:transition-none ${
          touched && error ? "text-red-500" : "text-neutral-500"
        }`}
      >
        {name}
      </label>
      <input
        value={value}
        onChange={handleChange}
        id={name}
        name={name}
        type={type === "password" ? (show ? "text" : "password") : type}
        className={`peer block min-h-[auto] w-full rounded   border-2 border-solid px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:placeholder:text-neutral-200 placeholder:opacity-0 ${
          touched && error ? "border-red-500" : "border-neutral-200"
        }`}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? (
            <EyeIcon className="w-6 h-6 text-neutral-400" />
          ) : (
            <EyeSlashIcon className="w-6 h-6 text-neutral-400" />
          )}
        </button>
      )}
    </div>
  );
};

export default AuthInput;
