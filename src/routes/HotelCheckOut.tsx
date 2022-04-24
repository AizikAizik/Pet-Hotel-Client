import {
  Button,
  Center,
  Container,
  Dialog,
  Group,
  Loader,
  NativeSelect,
  Space,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import CheckOutSteps from "../components/layout/CheckOutSteps";
import { Hotel } from "../state/models/hotel.model";
import axios from "axios";
import dayjs from "dayjs";
import { useInputState } from "@mantine/hooks";
import { useStoreActions, useStoreState } from "../state/store";
import { DateRangePicker } from "@mantine/dates";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export function convertDateToIsoStringFormat(date: string | Date): string {
  return moment(new Date(date).toISOString()).format("YYYY-MM-DD");
}

export default function HotelCheckOut() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(true);

  const profileInfoState = useStoreState((state) => state.profile.userProfile);
  const bookingInfoState = useStoreState((state) => state.booking);
  const { pets } = profileInfoState;

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelData, setHotelData] = useState<Array<{ value: string }>>([]);
  const [hotelValue, setHotelValue] = useInputState(hotels[0].name);
  const [hotelPackageValue, setHotelPackageValue] = useInputState("Gold  $20");
  const [hotelDeliveryValue, setHotelDeliveryValue] = useInputState("Home  $0");
  const [petNameValue, setPetNameValue] = useInputState(pets[0].name);
  const [paymentMethodValue, setPaymentMethodValue] =
    useInputState<"PayPal">("PayPal");
  const [loading, setLoading] = useState(false);

  const { isLoading, error } = bookingInfoState;

  const addBookingAction = useStoreActions(
    (action) => action.booking.addBooking
  );

  const navigate = useNavigate();

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://peaceful-garden-90498.herokuapp.com/api/hotel`
      );
      setLoading(false);
      const newData = data.map((hotel: any) => hotel.name);
      setHotelData(newData);
      return data;
    } catch (error: any) {
      setLoading(false);
      return error;
    }
  };

  useEffect(() => {
    fetchHotels().then((res) => {
      setHotels(res);
    });
  }, []);

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value && hotelValue) {
      const hotelID = hotels.find((hotel) => hotel.name === hotelValue);
      const petID = pets.find((pet) => pet.name === petNameValue);
      const hotelPackage = hotelPackageValue.split("$")[0].trim();
      const hotelDelivery = hotelDeliveryValue.split("$")[0].trim();
      const paymentMethod = paymentMethodValue;
      const checkInDate = value[0];
      const checkOutDate = value[1];
      console.log(hotelDelivery);

      addBookingAction({
        pet: petID!._id,
        hotel: hotelID!._id,
        hotelPackage,
        bookingMethod: hotelDelivery,
        checkInDate: convertDateToIsoStringFormat(checkInDate!),
        checkOutDate: convertDateToIsoStringFormat(checkOutDate!),
      });

      setOpened(true);
      navigate(`/dashboard/bookings`);
    } else {
    }
  };

  return (
    <Container>
      <Text weight="bold" color="dimmed" mt={10} align="center">
        Hotel CheckOut
      </Text>
      <Container size="xs">
        {loading && (
          <Center>
            <Loader size="lg" />
          </Center>
        )}
        {hotels.length && (
          <>
            <Space />
            <NativeSelect
              data={hotelData}
              value={hotelValue}
              onChange={setHotelValue}
              label="Choose Hotel for Booking"
              mb="xl"
              mt="xl"
              required
            />

            <NativeSelect
              data={pets.map((pet) => pet.name)}
              value={petNameValue}
              onChange={setPetNameValue}
              label="Choose Pet for Booking"
              mb="xl"
              mt="xl"
              required
            />

            <NativeSelect
              data={["Gold  $20", "Silver  $15"]}
              value={hotelPackageValue}
              onChange={setHotelPackageValue}
              label="Choose Hotel Package"
              mb="xl"
              mt="xl"
              required
            />

            <NativeSelect
              data={["Home  $0", "Pick Up  $5"]}
              value={hotelDeliveryValue}
              onChange={setHotelDeliveryValue}
              label="Choose Delivery Method"
              mb="xl"
              mt="xl"
              required
            />

            <NativeSelect
              data={["PayPal"]}
              value={paymentMethodValue}
              onChange={setPaymentMethodValue}
              label="Choose Payment Method"
              mb="xl"
              mt="xl"
            />

            <DateRangePicker
              label="Booking Date"
              placeholder="Pick dates range"
              value={value}
              onChange={setValue}
              minDate={dayjs(new Date()).toDate()}
              mb="xl"
              required
            />
            <Group grow mb="xl">
              <Button
                variant="outline"
                onClick={submitHandler}
                loading={isLoading}
              >
                Book Accommodation
              </Button>
            </Group>
          </>
        )}
        <Dialog
          opened={opened}
          withCloseButton
          onClose={() => setOpened(false)}
          size="lg"
          radius="md"
        >
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Booking Added Successfully
          </Text>
        </Dialog>
        {error && (
          <Dialog
            opened={opened2}
            withCloseButton
            onClose={() => setOpened2(false)}
            size="lg"
            radius="md"
          >
            <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
              {error}
            </Text>
          </Dialog>
        )}
      </Container>
    </Container>
  );
}
