import { Container, createStyles, Title, Text, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  main: {
    width: "100%",
    height: "600px",
    backgroundColor: "#FFF2BD",
    color: "#425168",
  },
}));
export default function Home() {
  const { classes } = useStyles();

  return (
    <main className={classes.main}>
      <Container sx={{ paddingTop: "5rem" }}>
        <Group position="center" direction={"column"} sx={{ width: "100%" }}>
          <Title order={1} sx={{ fontSize: "clamp(2.2rem,4vw,3rem)" }}>
            We Take Care Of Your Loving Pets
          </Title>
          <Text size="xl">Get the best the accommodation for your pets </Text>
        </Group>
      </Container>
    </main>
  );
}
