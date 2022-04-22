import { Center, Container, Grid, Title } from "@mantine/core";
import { Actions, State, useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import HotelCard from "../components/cards/HotelCard";
import { StoreModel } from "../state/store";

export default function HotelsPage() {
  const fetchHotels = useStoreActions(
    (actions: Actions<StoreModel>) => actions.hotelsState.fetchAll
  );
  const hotels = useStoreState(
    (state: State<StoreModel>) => state.hotelsState.hotels
  );

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  return (
    <Container my="xl" sx={{ minHeight: 550, height: "auto" }}>
      {hotels.length !== 0 ? (
        <Grid align={"stretch"} gutter={"md"}>
          {hotels.map((hotel, idx) => {
            return (
              <Grid.Col sm={6} lg={4} xl={3} key={idx}>
                <HotelCard {...hotel} key={idx} />
              </Grid.Col>
            );
          })}
        </Grid>
      ) : (
        <Center>
          <Title order={1}>No Hotels Available</Title>
        </Center>
      )}
    </Container>
  );
}
