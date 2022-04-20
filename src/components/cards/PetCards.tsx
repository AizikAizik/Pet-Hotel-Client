import React from "react";
import { Avatar, Text, Button, Paper, Space } from "@mantine/core";
import { FaDog, FaCat } from "react-icons/fa";

interface PetProps {
  pet: "Dog" | "Cat";
  name: string;
  breed?: string;
  image?: string;
  likes?: string;
  dislike?: string;
  age?: number;
}

export default function PetCards({ image, name, pet, breed }: PetProps) {
  return (
    <>
      <Space h="xl" />
      <Paper
        radius="md"
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
        <Button variant="default" fullWidth mt="md">
          Edit Pet
        </Button>
      </Paper>
    </>
  );
}
