import React from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <Container size={420} my={40}>
      <Title align="center">Join Us!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component={Link} to="/login">
          Log In
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Full Name" placeholder="John Doe" required />
        <TextInput label="Email" placeholder="you@email.com" mt="md" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter password again"
          required
          mt="md"
        />
        <Button fullWidth mt="xl" sx={{ backgroundColor: "#425168" }}>
          Create Account
        </Button>
      </Paper>
    </Container>
  );
}
