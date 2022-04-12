import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Lato",
        headings: {
          fontFamily: "Neucha",
          fontWeight: "400",
        },
      }}
    >
      <NotificationsProvider>
        <Layout>
          <Outlet />
        </Layout>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
