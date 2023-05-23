import ToasterProvider from "@/providers/ToasterProvider";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return <div className="min-w-screen min-h-screen">{children}</div>;
};
