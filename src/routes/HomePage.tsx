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
        <Group position="center" sx={{ width: "100%" }}>
          <Title order={1} sx={{ fontSize: "max(3rem, 2rem)" }}>
            We Take Care Of Your Loving Pets
          </Title>
          <Text size="md" sx={{ fontSize: "1.5rem" }}>
            Get the best the accommodation for your pets{" "}
          </Text>
        </Group>
      </Container>
    </main>
  );
}
