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
  },
  card: {
    display: "flex",
    flex: "0 1 300px",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default function PricingCard({ title, price, items }: PricingCardProps) {
  const { classes } = useStyles();
  return (
    <Card p="lg" shadow={"sm"} className={classes.card}>
      <Text align="center" className={classes.card__title}>
        {title}
      </Text>
      <Center sx={{ height: "60px" }} className="card__value">
        <span className="symbol">&#36;</span>
        <span className="num">{price}</span>
        <span className="slash">/</span>
        <span>stay</span>
      </Center>
      <List
        mb="md"
        size={"sm"}
        spacing={"xs"}
        listStyleType={"none"}
        sx={{ textAlign: "center" }}
        className="card__items"
      >
        {items.map((item, index) => {
          return (
            <List.Item key={index} className="card__item">
              <Text key={index} size="md">
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
