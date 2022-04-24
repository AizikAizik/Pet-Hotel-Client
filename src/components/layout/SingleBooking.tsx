import React, { useEffect, useState } from "react";
import {
  createStyles,
  Text,
  SimpleGrid,
  Container,
  Center,
  Loader,
  Group,
  Avatar,
  Tooltip,
} from "@mantine/core";
import { Check, X } from "tabler-icons-react";
import {
  FaDog,
  FaCat,
  FaHotel,
  FaBook,
  FaMoneyBill,
  FaCalendarDay,
} from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

export default function SingleBooking(props: { bookingId: string }) {
  const { classes, cx } = useStyles();
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>({});

  const fetchBookingById = async (id: string) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("token")!);
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `https://peaceful-garden-90498.herokuapp.com/api/bookings/${props.bookingId}`,
        options
      );
      setLoading(false);
      return data;
    } catch (error: any) {
      return error;
    }
  };

  useEffect(() => {
    fetchBookingById(props.bookingId).then((res) => {
      setBookingDetails(res);
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          bookingDetails && (
            <>
              {/* first section */}
              <div className={cx(classes.feature)}>
                <div className={classes.overlay} />

                <div className={classes.content}>
                  {/* <Icon size={38} className={classes.icon} /> */}
                  {bookingDetails?.petDetails?.pet === "Dog" ? (
                    <FaDog size={20} />
                  ) : (
                    <FaCat size={20} />
                  )}
                  <Text
                    weight={700}
                    size="lg"
                    mb="xs"
                    mt={5}
                    className={classes.title}
                  >
                    Pet Details
                  </Text>
                  <Group spacing="sm" mt={25} direction="column">
                    <Avatar
                      size={40}
                      src={bookingDetails?.petDetails?.image || null}
                      radius={40}
                    />
                    {/* <div> */}
                    <Text size="sm" weight={500} color="dimmed">
                      Name: {bookingDetails?.petDetails?.name}
                    </Text>
                    <Text size="xs" color="dimmed">
                      Breed: {bookingDetails?.petDetails?.breed}
                    </Text>
                    {/* </div> */}
                  </Group>
                </div>
              </div>

              {/* second section */}
              <div className={cx(classes.feature)}>
                <div className={classes.overlay} />
                <div className={classes.content}>
                  <FaHotel size={20} />
                  <Text
                    weight={700}
                    size="lg"
                    mb="xs"
                    mt={5}
                    className={classes.title}
                  >
                    Hotel Details
                  </Text>
                  <Group spacing="sm" mt={25} direction="column">
                    <Text size="sm" weight={500}>
                      {bookingDetails?.singleBooking?.hotel.name}
                    </Text>
                    <Text size="xs" color="dimmed">
                      {bookingDetails?.singleBooking?.hotel.address.country}
                    </Text>
                    <Text size="xs" color="dimmed">
                      {bookingDetails?.singleBooking?.hotel.address.state}
                    </Text>
                  </Group>
                </div>
              </div>
              {/* end of second section */}

              {/* third section */}
              <div className={cx(classes.feature)}>
                <div className={classes.overlay} />
                <div className={classes.content}>
                  <FaBook size={20} />
                  <Text
                    weight={700}
                    size="lg"
                    mb="xs"
                    mt={5}
                    className={classes.title}
                  >
                    Booking Details
                  </Text>
                  <Group spacing="sm" mt={25}>
                    <Text size="sm" weight={500}>
                      Package:{" "}
                      {
                        bookingDetails?.singleBooking?.bookingDetails
                          .hotelPackage
                      }
                    </Text>
                    <Text size="xs" color="dimmed">
                      Method:{" "}
                      {
                        bookingDetails?.singleBooking?.bookingDetails
                          .bookingMethod
                      }
                    </Text>
                    <Text size="xs" color="dimmed">
                      No of Days:{" "}
                      {
                        bookingDetails?.singleBooking?.bookingDetails
                          .no_of_booking_days
                      }
                    </Text>
                  </Group>
                </div>
              </div>
              {/* end of third section */}

              {/* fourth section */}
              <div className={cx(classes.feature)}>
                <div className={classes.overlay} />
                <div className={classes.content}>
                  <FaMoneyBill size={20} />
                  <Text
                    weight={700}
                    size="lg"
                    mb="xs"
                    mt={5}
                    className={classes.title}
                  >
                    Payment Details
                  </Text>
                  <Group spacing="lg" mt={25} direction="column">
                    <Text size="sm" weight={500}>
                      Price:{"$"}
                      {bookingDetails?.singleBooking?.totalPrice}
                    </Text>
                    <Text size="xs" color="dimmed">
                      Paid:{" "}
                      {bookingDetails?.singleBooking?.isPaid ? (
                        <Tooltip
                          withArrow
                          transition="fade"
                          label="booking paid for"
                          wrapLines
                          transitionDuration={200}
                        >
                          <Check style={{ color: "green" }} />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          withArrow
                          transition="fade"
                          label="booking not paid"
                          wrapLines
                          transitionDuration={200}
                        >
                          <X style={{ color: "red" }} />
                        </Tooltip>
                      )}
                    </Text>
                    <Text size="xs" color="dimmed">
                      Medium: {bookingDetails?.singleBooking?.paymentMethod}
                    </Text>
                  </Group>
                </div>
              </div>
              {/* end of fourth section */}

              {/* fifth section */}
              <div className={cx(classes.feature)}>
                <div className={classes.overlay} />
                <div className={classes.content}>
                  <FaCalendarDay size={20} />
                  <Text
                    weight={700}
                    size="lg"
                    mb="xs"
                    mt={5}
                    className={classes.title}
                  >
                    Date Details
                  </Text>
                  <Group spacing="lg" mt={25} direction="column">
                    <Text size="sm" color="dimmed">
                      Check In Date:{" "}
                      {
                        bookingDetails?.singleBooking?.bookingDetails.checkInDate.split(
                          ":"
                        )[0]
                      }
                    </Text>
                    <Text size="sm" color="dimmed">
                      Check Out Date:{" "}
                      {
                        bookingDetails?.singleBooking?.bookingDetails.checkOutDate.split(
                          ":"
                        )[0]
                      }
                    </Text>
                  </Group>
                </div>
              </div>
              {/* end of fifth section */}

              {/* sixth section */}
              <div className={cx(classes.feature)}>
                <div className={classes.overlay} />
                <div className={classes.content}>
                  <GiProgression size={20} />
                  <Text
                    weight={700}
                    size="lg"
                    mb="xs"
                    mt={5}
                    className={classes.title}
                  >
                    Progress Details
                  </Text>
                  <Group spacing="lg" mt={25} direction="column">
                    <Text size="sm" weight="500">
                      Progress:
                      {bookingDetails?.singleBooking?.bookingStaus ===
                      "InProgress" ? (
                        <Tooltip
                          withArrow
                          transition="fade"
                          label="In progress"
                          wrapLines
                          transitionDuration={200}
                        >
                          <AiOutlineLoading3Quarters />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          withArrow
                          transition="fade"
                          label="booking complete"
                          wrapLines
                          transitionDuration={200}
                        >
                          <TiTick style={{ color: "green" }} />
                        </Tooltip>
                      )}
                    </Text>
                  </Group>
                </div>
              </div>
              {/* end of sixth section */}
            </>
          )
        )}
      </SimpleGrid>
    </Container>
  );
}
