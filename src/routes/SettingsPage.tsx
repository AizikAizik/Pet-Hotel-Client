import React, { useEffect } from "react";
import DashBoard from "../components/layout/DashBoard";
import { useStoreState } from "../state/store";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  createStyles,
  Grid,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import image from "../assets/gifs/settingsImage.png";
// import axios from "axios";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function SettingsPage() {
  const { classes } = useStyles();
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
          <Grid gutter="md">
            <Grid.Col span={12} mt="xl">
              <Image src={image} className={classes.mobileImage} />
              <div>
                <Title className={classes.title}>Coming Soon</Title>
                <Text color="dimmed" size="lg">
                  Settings Page coming soon. You'd have the option to change
                  your password and many more
                </Text>
                <Button
                  variant="outline"
                  size="md"
                  mt="xl"
                  className={classes.control}
                  onClick={() => navigate(-1)}
                >
                  Go back to previous page
                </Button>
              </div>
              <Image src={image} className={classes.desktopImage} />
            </Grid.Col>
          </Grid>
        </Container>
      </SimpleGrid>
    </>
  );
}
