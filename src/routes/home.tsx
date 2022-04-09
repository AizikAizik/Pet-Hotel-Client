import React from "react";
import PageHeader from "../components/layout/PageHeader";

export default function Home() {
  const linkData = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/pricing",
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
    </>
  );
}
