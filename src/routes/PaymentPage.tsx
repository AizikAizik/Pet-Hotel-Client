import React, { useEffect, useState } from "react";
import { createStyles, Text, Card, Group, Loader } from "@mantine/core";
import { BookingInfo } from "../state/models/booking.model";
import { PayPalButton } from "react-paypal-button-v2";
import { useStoreActions, useStoreState } from "../state/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

export default function PaymentPage({
  hotel,
  _id,
  bookingDetails,
  deliveryCharge,
  totalPrice,
}: BookingInfo) {
  const { classes } = useStyles();
  const [sdkReady, setSdkReady] = useState(false);

  const bookingInfoState = useStoreState((state) => state.booking);
  const { isLoading, successMessage } = bookingInfoState;

  const makePaymentAction = useStoreActions(
    (action) => action.booking.makePayment
  );

  const fetchBookingAction = useStoreActions(
    (action) => action.booking.fetchBooking
  );

  const navigate = useNavigate();

  const setMessageAction = useStoreActions(
    (action) => action.booking.setSuccessMessage
  );

  //const dispatch = useStoreDispatch();

  const successPaymentHandler = (paymentResult: any) => {
    setMessageAction(paymentResult);
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get(
        "https://peaceful-garden-90498.herokuapp.com/api/config/paypal"
      );
      console.log(data);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data.paypalId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    addPayPalScript();
  }, []);

  if (successMessage) {
    makePaymentAction({
      id: successMessage.id,
      email_address: successMessage.payer.email_address,
      bookingId: _id,
      updateTime: successMessage.payer.update_time,
      status: successMessage.status,
    });
    navigate("/dashboard/bookings");
    fetchBookingAction();
    setMessageAction(null);
  }

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text size="xl" className={classes.label}>
            {hotel.name}
          </Text>
          <Text size="xs" color="dimmed">
            {hotel.address.country}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              Package
            </Text>
            <Text size="xs" color="dimmed">
              {bookingDetails.hotelPackage}
            </Text>
          </div>
          <Group mt="lg">
            <div>
              <Text className={classes.label}>Delivery Charge</Text>
              <Text size="xs" color="dimmed">
                {deliveryCharge}
              </Text>
            </div>
            <div>
              <Text className={classes.label}>Total Price</Text>
              <Text size="xs" color="dimmed">
                {totalPrice}
              </Text>
            </div>
          </Group>
        </div>

        <div className={classes.ring}>
          {isLoading && <Loader />}
          {!sdkReady ? (
            <Loader />
          ) : (
            <PayPalButton
              amount={totalPrice}
              onSuccess={successPaymentHandler}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
