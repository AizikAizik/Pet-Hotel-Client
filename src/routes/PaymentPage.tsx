import React, { useEffect, useState } from "react";
import { createStyles, Text, Card, Group, Loader } from "@mantine/core";
import { BookingInfo } from "../state/models/booking.model";
import { PayPalButton } from "react-paypal-button-v2";
import {
  useStoreActions,
  useStoreDispatch,
  useStoreState,
} from "../state/store";
import axios from "axios";

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

  const setMessageAction = useStoreActions(
    (action) => action.booking.setSuccessMessage
  );

  //const dispatch = useStoreDispatch();

  const successPaymentHandler = (paymentResult: any) => {
    setMessageAction("success payment");
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

  //   useEffect(() => {
  //       makePaymentAction({
  //         id: paymentResult.id,
  //         emailAddress: paymentResult.payer_id.email_address,
  //         update_time: paymentResult.update_time,
  //         status: paymentResult.status,
  //         bookingId: _id,
  //       });
  //   })

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
