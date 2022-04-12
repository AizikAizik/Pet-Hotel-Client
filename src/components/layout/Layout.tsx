import React from "react";
import PageHeader from "./PageHeader";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const linkData = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/about",
      label: "About Us",
    },
    {
      link: "/signup",
      label: "Sign Up",
    },
    {
      link: "/login",
      label: "Login",
    },
  ];
  return (
    <>
      <PageHeader links={linkData} />
      {children}
    </>
  );
}
