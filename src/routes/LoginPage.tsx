import React, { useEffect } from "react";
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
  Loader,
  Notification,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useInputState } from "@mantine/hooks";
import { useStoreActions, useStoreState } from "../state/store";

export default function LoginPage() {
  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");

  const userSessionState = useStoreState((state) => state.userSession);

  const navigate = useNavigate();

  const { isLoading, userInfo, error } = userSessionState;

  // this useEffect checks if the user is already logged in
  // if user is logged in then redirect user to dashboard page automatically
  useEffect(() => {
    if (userInfo) {
      navigate(`/dashboard`);
    }
  }, [navigate, userInfo]);

  const loginAction = useStoreActions((action) => action.userSession.login);

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await loginAction({ password, email });
    navigate(`/dashboard`);
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} to="/signup">
          Create account
        </Anchor>
      </Text>

      {isLoading && <Loader />}
      {error && (
        <Notification icon={<X size={18} />} color="red" title="Error Occured">
          {error}
        </Notification>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@email.com"
          value={email}
          onChange={setEmail}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          value={password}
          onChange={setPassword}
          mt="md"
        />
        <Group position="apart" mt="md">
          <Checkbox label="Keep me signed in" />
          <Anchor size="sm" component={Link} to="/">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          sx={{ backgroundColor: "#425168" }}
          onClick={submitHandler}
          // onClick={() => loginAction({ password, email })}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
