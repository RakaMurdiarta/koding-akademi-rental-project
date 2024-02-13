import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="w-full">{children}</div>;
};

export default Container;