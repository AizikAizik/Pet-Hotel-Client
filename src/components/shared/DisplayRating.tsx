import { Rating } from "react-simple-star-rating";
interface DisplayRatingProps {
  value: number;
  size?: number;
}
export default function DisplayRating(props: DisplayRatingProps) {
  return (
    <Rating
      size={props.size ? props.size : 22}
      readonly
      initialValue={props.value}
      ratingValue={0}
      allowHalfIcon
    />
  );
}
