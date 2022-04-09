import { Container, createStyles } from "@mantine/core";
import React from "react";
import PageHeader from "../components/layout/PageHeader";

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: "#FFF2BD",
  },
}));
export default function Home() {
  const { classes } = useStyles();
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
      <main className={classes.main}>
        <Container></Container>
      </main>
    </>
  );
}
