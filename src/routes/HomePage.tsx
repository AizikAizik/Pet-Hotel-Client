import { Container, createStyles, Title, Text, Group } from "@mantine/core";
import PricingCard from "../components/cards/PricingCard";

const useStyles = createStyles((theme) => ({
  main: {
    width: "100%",
    height: "600px",
    backgroundColor: "#FFF2BD",
    color: "#425168",
  },
  pricing: {},
  pricing__wrapper: {},
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
        <Container>
          <section className={classes.pricing__wrapper}>
            <div className="pricing__header">
              <h2>Our Plans</h2>
              <p>
                We offer very special plans just for you and your little family.
              </p>
            </div>
            <div className="pricing__body">
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
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}
