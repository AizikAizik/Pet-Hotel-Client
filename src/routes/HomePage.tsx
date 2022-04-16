import { Container, createStyles, Title, Text, Group } from "@mantine/core";
import PricingCard from "../components/cards/PricingCard";

const useStyles = createStyles((theme) => ({
  main: {
    width: "100%",
    height: "600px",
    color: "#425168",
    backgroundColor: "#FFF2BD",
  },
  pricing: {},
  pricing__wrapper: {
    width: "100%",
    height: "auto",
  },
  pricing__header: {
    width: "100%",
    height: "150px",
    textAlign: "center",
  },
  pricing__body: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));
export default function Home() {
  const { classes } = useStyles();

  return (
    <>
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
      <section className={classes.pricing}>
        <Container mt={"xl"}>
          <section className={classes.pricing__wrapper}>
            <Group
              position="center"
              direction={"column"}
              className={classes.pricing__header}
            >
              <Title order={2} sx={{ fontSize: "2rem" }}>
                Our Packages
              </Title>
              <Text>
                We offer very special plans just for you and your little family.
              </Text>
            </Group>
            <div className={classes.pricing__body}>
              <PricingCard
                title="Friendly Pack"
                price="100"
                items={[
                  "5 days service",
                  "Pet Shower",
                  "Basic Checkup",
                  "Grooming",
                  "Hair and Nail Cut",
                ]}
              />
              <PricingCard
                title="Exclusive Pack"
                price="175"
                items={[
                  "15 days service",
                  "Pet Shower",
                  "Intensive Checkup",
                  "Grooming",
                  "Hair and Nail Cut",
                  "Control Hair Falling",
                  "Fresh Snack",
                  "Pet Park & Games",
                ]}
              />
              <PricingCard
                title="Family Pack"
                price="200"
                items={[
                  "30 days service",
                  "Pet Shower",
                  "Basic Checkup",
                  "Grooming",
                  "Hair and Nail Cut",
                ]}
              />
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}
