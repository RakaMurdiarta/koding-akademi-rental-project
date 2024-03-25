"use client";
import React, { createContext, useContext, ReactNode } from "react";
import UserController from "@/utils/controllers/userController";
import { getJWT } from "../utils/helpers";
interface UserContextType {
  userId: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const jwt = getJWT();
  const user = new UserController(jwt);
  const userId = user.userId;
  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
