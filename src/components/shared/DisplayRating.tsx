import React from "react";
import { Rating } from "react-simple-star-rating";
interface DisplayRatingProps {
  value: number;
  size?: number;
}
export default function DisplayRating(props: DisplayRatingProps) {
  return (
    <Rating
      initialValue={0}
      size={props.size ? props.size : 22}
      readonly={true}
      ratingValue={props.value}
    />
  );
}
