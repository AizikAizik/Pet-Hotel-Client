import React, { useEffect } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Notification,
  Loader,
  Space,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useInputState } from "@mantine/hooks";
import {
  useStoreActions,
  useStoreDispatch,
  useStoreState,
} from "../state/store";
import { X } from "tabler-icons-react";

export default function SignUpPage() {
  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [confirmpassword, setConfirmPassword] = useInputState("");
  const [fullName, setFullName] = useInputState("");

  const userSessionState = useStoreState((state) => state.userSession);

  const navigate = useNavigate();

  const { isLoading, userInfo, error } = userSessionState;

  const ErrorAction = useStoreActions((action) => action.userSession.setError);

  const registerAction = useStoreActions(
    (action) => action.userSession.register
  );

  const dispatch = useStoreDispatch();

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //e.preventDefault();
    if (password !== confirmpassword)
      ErrorAction(`The two Passwords do not match`);
    else dispatch(registerAction({ password, email, fullName }));
  };

  // this useEffect checks if the user is already logged in
  // if user is logged in then redirect user to dashboard page automatically
  useEffect(() => {
    if (userInfo) {
      navigate(`/dashboard`);
    }
  }, [navigate, userInfo]);

  return (
    <Container size={420} my={40}>
      <Title align="center">Join Us!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component={Link} to="/login">
          Log In
        </Anchor>
      </Text>

      {isLoading && (
        <>
          <Space h="lg" />
          <Loader />
        </>
      )}
      {error && (
        <>
          <Space h="lg" />
          <Notification
            icon={<X size={18} />}
            color="red"
            title="Error Occured"
          >
            {error}
          </Notification>
        </>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Full Name"
          placeholder="John Doe"
          required
          value={fullName}
          onChange={setFullName}
        />
        <TextInput
          label="Email"
          placeholder="you@email.com"
          mt="md"
          required
          value={email}
          onChange={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={setPassword}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter password again"
          required
          mt="md"
          value={confirmpassword}
          onChange={setConfirmPassword}
        />
        <Button
          fullWidth
          mt="xl"
          sx={{ backgroundColor: "#425168" }}
          onClick={submitHandler}
        >
          Create Account
        </Button>
      </Paper>
    </Container>
  );
}
