import { Card, Button, List, Center, Text, createStyles } from "@mantine/core";
import React from "react";

interface PricingCardProps {
  title: string;
  price: string;
  items: string[];
}

const useStyles = createStyles((theme) => ({
  card__title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "600",
  },
  card: {
    height: "auto",
    display: "flex",
    flex: "0 1 300px",
    flexDirection: "column",
    justifyContent: "space-between",
    border: `1px solid ${theme.colors.teal[6]}`,
    ":nth-child(2)": {
      backgroundColor: theme.colors.teal[5],
      color: theme.white,
    },
    [theme.fn.smallerThan("md")]: {
      margin: "20px 15px",
      flex: "1 1 300px",
    },
  },
  card__value: {
    height: "60px",
    marginBottom: "1rem",
  },
  card__items: {
    textAlign: "center",
  },
  card__item: {},
  item__text: {},
  num: {
    fontSize: "3rem",
    color: theme.colors.green[3],
  },
  symbol: {},
  slash: {
    fontSize: "3rem",
    fontWeight: "300",
    color: theme.colors.gray[2],
  },
}));

export default function PricingCard({ title, price, items }: PricingCardProps) {
  const { classes } = useStyles();
  return (
    <Card p="lg" shadow={"md"} className={classes.card}>
      <Text align="center" className={classes.card__title}>
        {title}
      </Text>
      <Center className={classes.card__value}>
        <Text size={"sm"} className={classes.symbol}>
          &#36;
        </Text>
        <Text className={classes.num} size={"xl"}>
          {price}
        </Text>
        <Text className={classes.slash}>/</Text>
        <Text size={"sm"}>stay</Text>
      </Center>
      <List mb="md" size={"sm"} spacing={"xs"} listStyleType={"none"}>
        {items.map((item, index) => {
          return (
            <List.Item key={index} className={classes.card__items}>
              <Text key={index} size="md" className={classes.item__text}>
                {item}
              </Text>
            </List.Item>
          );
        })}
      </List>
      <Button color="teal" size="md">
        Book Now
      </Button>
    </Card>
  );
}
