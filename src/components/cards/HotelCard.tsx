import {
  Card,
  Group,
  Image,
  Text,
  Badge,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { FaHotel } from "react-icons/fa";
import { Star } from "tabler-icons-react";
import { Hotel } from "../../state/models/hotel.model";

interface HotelCardProps extends Hotel {}
export default function HotelCard(props: HotelCardProps) {
  const theme = useMantineTheme();
  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Image
          src={props.images[0]}
          withPlaceholder={true}
          height={160}
          alt=""
        />
      </Card.Section>

      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <div>
          <Text weight={500}>{props.name}</Text>
          <Text size="xs" color="dimmed">
            <Text size="xs" transform={"uppercase"}>
              rooms:{props.roomsAvailable}
            </Text>
          </Text>
        </div>
        <Badge color="yellow" variant="light">
          <Text size="xs" transform={"uppercase"}>
            rating: {props.ratings}
          </Text>
        </Badge>
      </Group>

      <Text size="sm" style={{ lineHeight: 1.5 }}>
        {props.description}
      </Text>

      <Button
        variant="light"
        color="indigo"
        fullWidth
        style={{ marginTop: 14 }}
      >
        Book now
      </Button>
    </Card>
  );
}
