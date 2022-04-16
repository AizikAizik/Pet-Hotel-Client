import { Card, Button } from "@mantine/core";
import React from "react";

interface PricingCardProps {
  title: string;
  price: string;
  items: string[];
}

export default function PricingCard({ title, price, items }: PricingCardProps) {
  return (
    <Card shadow={"sm"} p="lg">
      <h5 className="card__title">{title}</h5>
      <div className="card__value">
        <span className="symbol">&#36;</span>
        <span className="num">{price}</span>
        <span className="slash">/</span>
        <span>stay</span>
      </div>
      <ul className="card__items">
        {items.map((item) => {
          return <li className="card__item">{item}</li>;
        })}
      </ul>
      <Button color="teal" size="md">
        Book Now
      </Button>
    </Card>
  );
}
