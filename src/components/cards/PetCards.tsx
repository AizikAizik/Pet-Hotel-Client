import React, { useEffect } from "react";
import {
  Avatar,
  Text,
  Button,
  Paper,
  Space,
  Group,
  Tooltip,
} from "@mantine/core";
import { FaDog, FaCat } from "react-icons/fa";
import { Pencil, Trash, Eye } from "tabler-icons-react";
import { useModals } from "@mantine/modals";
import { useStoreActions } from "../../state/store";
import { ThunkCreator } from "easy-peasy";

interface PetProps {
  _id: string;
  pet: "Dog" | "Cat";
  name: string;
  breed?: string;
  image?: string;
  likes?: string;
  dislike?: string;
  age?: number;
}

interface Props {
  fetchPetAction: ThunkCreator<void, any>;
}

export default function PetCards({
  image,
  name,
  pet,
  breed,
  _id,
  fetchPetAction,
}: PetProps & Props) {
  const modals = useModals();
  const deletePetAction = useStoreActions((action) => action.pet.deletePet);
  //const fetchPetAction = useStoreActions((action) => action.pet.fetchPet);
  //const dispatch = useStoreDispatch();
  useEffect(() => {
    fetchPetAction();
  }, [fetchPetAction]);

  const openDeleteModal = (petName: string) =>
    modals.openConfirmModal({
      title: `Delete Pet`,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete {petName}'s details? This action can't
          be undone!
        </Text>
      ),
      labels: { confirm: "Delete pet", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        deletePetAction({ petID: _id });
        fetchPetAction();
      },
    });

  return (
    <>
      <Space h="xl" />
      <Paper
        radius="md"
        shadow="lg"
        withBorder
        p="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        })}
      >
        {image && <Avatar src={image} size={120} radius={120} mx="auto" />}
        <Text align="center" size="lg" weight={500} mt="md">
          {name}
        </Text>
        {pet === "Dog" ? (
          <Text align="center" color="dimmed" size="md">
            <FaDog />
          </Text>
        ) : (
          <Text align="center" color="dimmed" size="md">
            <FaCat />
          </Text>
        )}

        <Text align="center" color="dimmed" size="sm">
          {breed}
        </Text>
        <Group position="center" mt="lg">
          <Tooltip
            withArrow
            transition="fade"
            label="edit pet"
            wrapLines
            transitionDuration={200}
          >
            <Button color="teal" size="xs">
              <Pencil size={13} />
            </Button>
          </Tooltip>
          <Tooltip
            withArrow
            transition="fade"
            label="view pet"
            wrapLines
            transitionDuration={200}
          >
            <Button variant="default" size="xs">
              <Eye size={13} />
            </Button>
          </Tooltip>
          <Tooltip
            withArrow
            transition="fade"
            label="remove pet"
            wrapLines
            transitionDuration={200}
          >
            <Button color="red" size="xs" onClick={() => openDeleteModal(name)}>
              <Trash size={13} />
            </Button>
          </Tooltip>
        </Group>
      </Paper>
    </>
  );
}
