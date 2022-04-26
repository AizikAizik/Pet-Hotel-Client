import React, { useEffect, useState } from "react";
import DashBoard from "../components/layout/DashBoard";
import { useStoreActions, useStoreState } from "../state/store";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  Container,
  Drawer,
  Grid,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import PetCards from "../components/cards/PetCards";
import AddPet from "../components/layout/AddPet";
import nopets5 from "../assets/gifs/nopets5.png";
// import axios from "axios";

export default function PetPage() {
  const userPetState = useStoreState((state) => state.pet);
  const userInfoState = useStoreState((state) => state.userSession.userInfo);
  const { petInfo, isLoading } = userPetState;
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
            {isLoading && (
              <Center>
                <Loader />
              </Center>
            )}
            {petInfo.length ? (
              petInfo.map((pet, idx) => (
                <Grid.Col span={6} key={idx}>
                  <PetCards {...pet} fetchPetAction={fetchPetAction} />
                </Grid.Col>
              ))
            ) : (
              <div
                style={{
                  width: 540,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: 40,
                  marginTop: 40,
                }}
              >
                <Image
                  radius="md"
                  src={nopets5}
                  alt="No booking state"
                  fit="contain"
                />
                <Center>
                  <Text color="dimmed" weight="500" mt="xl">
                    No Pets Available Yet ☹️
                  </Text>
                </Center>
              </div>
            )}
            {/* {petInfo.map((pet, idx) => (
              <Grid.Col span={6} key={idx}>
                <PetCards {...pet} fetchPetAction={fetchPetAction} />
              </Grid.Col>
            ))} */}
          </Grid>
          <Space h="xl" />
          <Space h="xl" />
          <Center>
            <Group position="center" grow>
              <Button color="teal" onClick={() => setOpened(true)}>
                Add New Pet
              </Button>
            </Group>
          </Center>
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
