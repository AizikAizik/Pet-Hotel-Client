import {
  Group,
  Image,
  Divider,
  Title,
  Text,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles(() => ({
  card: {
    flex: "0 1 285px",
    height: "auto",
    color: "#425168",
  },
  card__image: {},
  card__content: {},
  card__name: {
    textAlign: "center",
    fontWeight: "bold",
  },
  card__body: {
    // width: "min(45ch, 100%)",
    textAlign: "center",
  },
}));

interface TestimonialCardProps {
  name: string;
  body: string;
  url?: string;
}

export default function TestimonialCard(props: TestimonialCardProps) {
  const { classes } = useStyles();
  return (
    <Group position={"center"} className={classes.card}>
      <Image
        className={classes.card__image}
        width={100}
        height={100}
        withPlaceholder={true}
        radius={"xl"}
        src={props.url}
      />

      <Group position={"center"} className={classes.card__content}>
        <Divider
          variant="dashed"
          size={"sm"}
          my="sm"
          color={"teal"}
          labelPosition="center"
          label={
            <Title order={4} className={classes.card__name}>
              {props.name}
            </Title>
          }
        />
        <Text className={classes.card__body}>{props.body}</Text>
        <Divider
          sx={{ width: "50px" }}
          variant="dashed"
          size={"sm"}
          mt="sm"
          color={"teal"}
        />
      </Group>
    </Group>
  );
}
