import {
  Container,
  createStyles,
  Title,
  Text,
  Group,
  Image,
  Box,
} from "@mantine/core";
import PricingCard from "../components/cards/PricingCard";
import TestimonialCard from "../components/cards/TestimonialCard";
import mainImg from "../assets/images/main-image.png";

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
    color: "#425168",
  },
  pricing__body: {
    height: "auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  testimonial: {
    width: "100%",
    height: "auto",
    backgroundColor: "#FFF2BD",
  },
  testimonial__header: {
    width: "100%",
    height: "150px",
    textAlign: "center",
    color: "#425168",
  },
  testimonial__cards: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
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
          <Group position="center">
            <Image src={mainImg} />
          </Group>
        </Container>
      </main>
      <section className={classes.pricing}>
        <Container mt={"xl"} mb={"xl"}>
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
                title="Silver Pack"
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
                title="Diamond Pack"
                price="175"
                emphasize={true}
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
                title="Gold Pack"
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
      <section className={classes.testimonial}>
        <Container mt={"xl"} py={"3rem"}>
          <Group
            position="center"
            direction={"column"}
            className={classes.testimonial__header}
          >
            <Title order={2} sx={{ fontSize: "2rem" }}>
              Testimonials
            </Title>
            <Text>What pet lovers say about us</Text>
          </Group>
          <section className={classes.testimonial__cards}>
            <TestimonialCard
              name="Kevin Marks"
              body={`"Thank you keepmypet for taking excellent care of my doggies,
                  The best pet care ever! I recommend"`}
            />
            <TestimonialCard
              name="Kate Henshaw"
              body={`"We make it easy to arrange walks, playtime, overnight stays
                  or holidays. Our aim is to help dog owners when they need it,
                  give dogs more exercise and playtime and to allow people
                  without a dog to spend quality time with one. We call it a
                  win-win (or a woof-­woof) situation for everyone involved."`}
            />
            <TestimonialCard
              name="Charlie Fox"
              body={`"You pay your subscription to BorrowMyDoggy, but the money
                  that you’d actually spend, you would save if you had to pay
                  for a dog walker."`}
            />
          </section>
        </Container>
      </section>
    </>
  );
}
