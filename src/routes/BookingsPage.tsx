import React, { useEffect, useState } from "react";
import DashBoard from "../components/layout/DashBoard";
//import { useInputState } from "@mantine/hooks";
import { useStoreActions, useStoreState } from "../state/store";
import { useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Loader,
  Menu,
  Modal,
  ScrollArea,
  SimpleGrid,
  Space,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { Pencil, Trash, Eye } from "tabler-icons-react";
import SingleBooking from "../components/layout/SingleBooking";
import noBookingImage from "../assets/gifs/nobooking.gif";
// import axios from "axios";

export default function BookingsPage() {
  const [opened, setOpened] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const userInfoState = useStoreState((state) => state.userSession.userInfo);
  const navigate = useNavigate();

  const bookingInfoState = useStoreState((state) => state.booking);
  const { bookingInfo, isLoading } = bookingInfoState;

  const fetchBookingAction = useStoreActions(
    (action) => action.booking.fetchBooking
  );

  useEffect(() => {
    if (!userInfoState) {
      navigate("/login");
    } else {
      fetchBookingAction();
    }
  }, [navigate, userInfoState, fetchBookingAction]);

  const rows = bookingInfo.map((item) => (
    <tr key={item._id}>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={40} src={item.avatar} radius={40} /> */}
          <div>
            <Text size="sm" weight={500}>
              {item.hotel.name}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Group spacing="sm">
          {/* <Avatar size={40} src={item.avatar} radius={40} /> */}
          <div>
            <Text size="sm" weight={500}>
              {item.hotel.address.country}
            </Text>
            <Text size="xs" color="dimmed">
              {item.hotel.address.state}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.paymentMethod}
        </Text>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.bookingStaus}
        </Text>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.bookingDetails.checkInDate.split(":")[0]}
        </Text>
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.bookingDetails.checkOutDate.split(":")[0]}
        </Text>
      </td>
      <td>
        {!item.isPaid ? (
          <Group spacing={0} position="right">
            <ActionIcon>
              <Tooltip
                withArrow
                transition="fade"
                label="View more booking info..."
                wrapLines
                transitionDuration={200}
              >
                <Eye
                  size={16}
                  onClick={() => {
                    setOpened(true);
                    setBookingId(item._id);
                  }}
                />
              </Tooltip>
            </ActionIcon>
            <Menu transition="pop" withArrow placement="end">
              <Menu.Item icon={<Trash size={16} />} color="red">
                Cancel Booking
              </Menu.Item>
            </Menu>
          </Group>
        ) : (
          <Group spacing={0} position="right">
            <ActionIcon disabled>
              <Pencil size={16} />
            </ActionIcon>
          </Group>
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <DashBoard />
        <Container>
          <Grid gutter="md" mt="xl">
            <Grid.Col span={12}>
              <Center>
                <Text color="gray" size="xl">
                  Your Bookings
                </Text>
              </Center>
              <Space h="xl" />
              <Space h="xl" />
              {isLoading && (
                <Center>
                  <Loader />
                </Center>
              )}
              {!bookingInfo.length ? (
                <div
                  style={{
                    width: 340,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 40,
                  }}
                >
                  <Image
                    radius="md"
                    src={noBookingImage}
                    alt="No booking state"
                    fit="contain"
                  />
                  <Center>
                    <Text color="dimmed" weight="500" mt="xl">
                      No Bookings Yet ☹️
                    </Text>
                  </Center>
                </div>
              ) : (
                <ScrollArea
                  style={{ width: 800, height: 400 }}
                  scrollbarSize={4}
                >
                  <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                    <thead>
                      <tr>
                        <th>Hotel</th>
                        <th>Address</th>
                        <th>Payment Method</th>
                        <th>Booking Status</th>
                        <th>CheckIn Date</th>
                        <th>CheckOut Date</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </Table>
                </ScrollArea>
              )}
            </Grid.Col>
          </Grid>
          <Center>
            <Group position="center" grow>
              <Button
                color="teal"
                mt="xl"
                onClick={() => navigate("/hotel-checkout")}
              >
                New Booking
              </Button>
            </Group>
          </Center>
        </Container>
      </SimpleGrid>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Center inline>Booking Details</Center>}
        size={700}
        radius="lg"
      >
        <SingleBooking bookingId={bookingId} />
      </Modal>
    </>
  );
}
