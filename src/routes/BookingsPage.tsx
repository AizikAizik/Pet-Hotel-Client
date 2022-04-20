import React, { useEffect, useState } from "react";
import DashBoard from "../components/layout/DashBoard";
import { useInputState } from "@mantine/hooks";
import {
  useStoreActions,
  useStoreDispatch,
  useStoreState,
} from "../state/store";
import { useNavigate } from "react-router-dom";
import { Container, Grid, SimpleGrid } from "@mantine/core";
// import axios from "axios";

export default function BookingsPage() {
  const userInfoState = useStoreState((state) => state.userSession.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfoState) {
      navigate("/login");
    }
  }, [navigate, userInfoState]);

  return (
    <>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <DashBoard />
        <Container>
          <Grid gutter="md">Bookings Page</Grid>
        </Container>
      </SimpleGrid>
    </>
  );
}
