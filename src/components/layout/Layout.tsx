import React from "react";
import PageFooter from "./PageFooter";
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
      link: "hotels",
      label: "Hotels",
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
      <PageFooter />
    </>
  );
}
