"use client";

import React, { FC, useEffect } from "react";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-6 text-[#909090] py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-bold">
          Admin <span className="text-black">Dashboard</span>
        </h1>
        <p>Welcome back, Admin!</p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6"></div>
    </div>
  );
};

export default Dashboard;
