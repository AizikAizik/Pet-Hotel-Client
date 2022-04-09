import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Lato",
        headings: {
          fontFamily: "Neucha",
        },
      }}
    >
      <NotificationsProvider>
        <Outlet />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
