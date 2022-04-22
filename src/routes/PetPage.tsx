import React, { useEffect, useState } from "react";
import DashBoard from "../components/layout/DashBoard";
import { useStoreActions, useStoreState } from "../state/store";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  Container,
  Divider,
  Drawer,
  Grid,
  Group,
  SimpleGrid,
  Space,
} from "@mantine/core";
import PetCards from "../components/cards/PetCards";
import AddPet from "../components/layout/AddPet";
// import axios from "axios";

export default function PetPage() {
  const userInfoState = useStoreState((state) => state.profile.userProfile);
  const { pets } = userInfoState!;
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  const fetchPetAction = useStoreActions((action) => action.pet.fetchPet);

  useEffect(() => {
    if (!userInfoState) {
      navigate("/login");
    } else {
      fetchPetAction();
    }
  }, [navigate, userInfoState, fetchPetAction]);

  return (
    <>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <DashBoard />
        <Container>
          <Grid gutter="md">
            {pets.map((pet, idx) => (
              <Grid.Col span={6} key={idx}>
                <PetCards {...pet} />
              </Grid.Col>
            ))}
          </Grid>
          <Space h="xl" />
          <Space h="xl" />
          <Divider my="sm" variant="dashed" />
          <Grid gutter="md">
            <Center inline>
              <Group position="center" grow>
                <Button color="teal" onClick={() => setOpened(true)}>
                  Add New Pet
                </Button>
              </Group>
            </Center>
          </Grid>
        </Container>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Pet Details"
          padding="xl"
          position="right"
          size="xl"
        >
          <AddPet toggleDrawer={setOpened} />
        </Drawer>
      </SimpleGrid>
    </>
  );
}
