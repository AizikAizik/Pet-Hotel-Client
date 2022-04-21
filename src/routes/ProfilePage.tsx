import {
  Button,
  Container,
  createStyles,
  Grid,
  NativeSelect,
  SimpleGrid,
  Space,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import countries from "i18n-iso-countries";
import DashBoard from "../components/layout/DashBoard";
import { useInputState } from "@mantine/hooks";
import {
  useStoreActions,
  useStoreDispatch,
  useStoreState,
} from "../state/store";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const useStyles = createStyles((theme) => ({
  btnStyle: {
    backgroundColor: theme.colors.teal[6],
    color: theme.colors.teal[0],
  },
}));

export default function ProfilePage() {
  const { classes, cx } = useStyles();
  // profile state and actions
  const userInfoState = useStoreState((state) => state.userSession.userInfo);
  const fullName = userInfoState!.fullName;
  const email = userInfoState!.email;
  const address = userInfoState!.address;

  // profiles data state
  const [fullNameValue, setFullNameValue] = useInputState(fullName);
  const [emailValue, setEmailValue] = useInputState(email);

  const [countryNames] = useState(
    Country.getAllCountries().map((country) => country.name)
  );
  const [countryValue, setCountryValue] = useState(address.country);
  const [countryCode, setCountryCode] = useState(
    countries.getAlpha2Code(countryValue, "en")
  );
  const [statesData, setStatesData] = useState(
    State.getStatesOfCountry(countryCode).map((state) => state.name)
  );
  const [statesValue, setStatesValue] = useState(address.state);
  const [cityValue, setCityValue] = useInputState(address.city);
  const [streetNameValue, setStreetNameValue] = useInputState(address.street);
  const [zipCodeValue, setZipCodeValue] = useInputState(address.zipCode);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate, userInfoState]);

  useEffect(() => {
    setCountryCode(countries.getAlpha2Code(countryValue, "en"));
    setStatesData(
      State.getStatesOfCountry(countryCode).map((state) => state.name)
    );
  }, [countryValue, countryCode]);

  return (
    <>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <DashBoard />
        <Container>
          <Grid gutter="md">
            <Grid.Col span={6}>
              <Space h="xl" />
              <TextInput
                placeholder="Your FullName"
                label="Full name"
                value={fullNameValue}
                onChange={setFullNameValue}
                description="You can Update your Full Name"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Space h="xl" />
              <TextInput
                placeholder="Email"
                label="Email"
                value={emailValue}
                onChange={setEmailValue}
                description="You can Update your Email Address"
              />
            </Grid.Col>
            <Grid.Col>
              <Space h="xl" />
              <p>Address Details</p>
              <Space h="xl" />
              <NativeSelect
                data={countryNames}
                label="Country"
                value={countryValue}
                onChange={(event) => setCountryValue(event.currentTarget.value)}
                required
              />
              <Space h="lg" />
              <NativeSelect
                data={statesData}
                label="State"
                value={statesValue}
                onChange={(event) => setStatesValue(event.currentTarget.value)}
                required
              />
              <Space h="lg" />
              <TextInput
                placeholder="City"
                label="City"
                value={cityValue}
                onChange={setCityValue}
                required
              />
              <Space h="lg" />
              <TextInput
                label="Street"
                value={streetNameValue}
                onChange={setStreetNameValue}
              />
              <Space h="lg" />
              <TextInput
                label="Zip Code"
                value={zipCodeValue ? zipCodeValue : ""}
                onChange={setZipCodeValue}
              />
              <Space h="xl" />
              <Space h="xl" />
              <Button
                // variant="gradient"
                // gradient={{ from: "teal", to: "lime", deg: 105 }}
                className={classes.btnStyle}
              >
                Update Profile
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </SimpleGrid>
    </>
  );
}
