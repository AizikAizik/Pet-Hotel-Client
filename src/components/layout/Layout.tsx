import { useStoreState, State } from "easy-peasy";
import React from "react";
import { StoreModel } from "../../state/store";
import PageFooter from "./PageFooter";
import PageHeader from "./PageHeader";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const isLoggedIn = useStoreState(
    (state: State<StoreModel>) => state.userSession.isLoggedIn
  );

  const isAuthLink = (value: { link: string; label: string }) => {
    return value.link !== "/login" && value.link !== "/signup";
  };

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
      <PageHeader links={isLoggedIn ? linkData.filter(isAuthLink) : linkData} />
      {children}
      <PageFooter />
    </>
  );
}
