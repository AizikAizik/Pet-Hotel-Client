import { useMantineTheme } from "@mantine/core";
import { Rating } from "react-simple-star-rating";
interface DisplayRatingProps {
  value: number;
  size?: number;
}
export default function DisplayRating(props: DisplayRatingProps) {
  const theme = useMantineTheme();
  return (
    <Rating
      size={props.size ? props.size : 22}
      readonly
      initialValue={props.value}
      ratingValue={0}
      fillColor={`${theme.colors.yellow[6]}`}
      allowHalfIcon
    />
  );
}
