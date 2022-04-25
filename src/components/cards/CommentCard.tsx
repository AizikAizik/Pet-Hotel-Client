import { Paper, Group, Text } from "@mantine/core";
import { HotelComment } from "../../state/models/hotel.model";

interface CommentCardProps extends HotelComment {}

export default function CommentCard(props: CommentCardProps) {
  return (
    <Paper
      withBorder
      radius="md"
      sx={(theme) => ({
        width: "min(280px,100%)",
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
      })}
    >
      <Group>
        <Text size="sm">{props.user?.fullName}</Text>
        <Text size="xs" color="dimmed">
          rating:{props.rating}
        </Text>
      </Group>
      <Text
        sx={(theme) => ({
          paddingTop: theme.spacing.sm,
        })}
        size="sm"
      >
        {props.comment}
      </Text>
    </Paper>
  );
}
