import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ModalsProvider } from "@mantine/modals";

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
      <ModalsProvider>
        <NotificationsProvider>
          <Layout>
            <Outlet />
          </Layout>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
