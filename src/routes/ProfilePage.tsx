import {
  Button,
  Container,
  Grid,
  NativeSelect,
  NumberInput,
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

//const child = <Skeleton height={140} radius="md" animate={false} />;
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export default function ProfilePage() {
  const [countryNames] = useState(
    Country.getAllCountries().map((country) => country.name)
  );
  const [countryValue, setCountryValue] = useState(countryNames[0]);
  const [countryCode, setCountryCode] = useState(
    countries.getAlpha2Code(countryValue, "en")
  );
  const [statesData, setStatesData] = useState(
    State.getStatesOfCountry(countryCode).map((state) => state.name)
  );
  const [statesValue, setStatesValue] = useState(statesData[0]);
  const [cityValue, setCityValue] = useInputState("");
  const [streetNameValue, setStreetNameValue] = useInputState("");
  const [zipCodeValue, setZipCodeValue] = useInputState("");

  // profile state and actions
  const userProfileState = useStoreState((state) => state.profile);
  const { isLoading, userProfile, error } = userProfileState;

  const getProfileAction = useStoreActions(
    (action) => action.profile.getProfile
  );
  const dispatch = useStoreDispatch();

  // profiles data state
  const [fullName, setFullName] = useInputState("");
  const [email, setEmail] = useInputState("");

  //   useEffect(() => {
  //     dispatch(getProfileAction());
  //     // async function fetchData() {
  //     //   if (userProfile && userProfile.address) {
  //     //     setFullName(userProfile.fullName);
  //     //     setEmail(userProfile.email);
  //     //     setCountryValue(userProfile.address.country);
  //     //     setStatesValue(userProfile.address.state);
  //     //     setCityValue(userProfile.address.city);
  //     //     if (userProfile.address.street)
  //     //       setStreetNameValue(userProfile.address.street);
  //     //     if (userProfile.address.zipCode)
  //     //       setZipCodeValue(String(userProfile.address.zipCode));
  //     //   } else {
  //     //     setFullName(userProfile!.fullName);
  //     //     setEmail(userProfile!.email);
  //     //   }
  //     // }
  //     // fetchData();
  //   }, [
  //     dispatch,
  //     getProfileAction,
  //     // setCityValue,
  //     // setEmail,
  //     // setFullName,
  //     // setStreetNameValue,
  //     // setZipCodeValue,
  //     // userProfile,
  //   ]);

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
                value={fullName}
                onChange={setFullName}
                description="You can Update your Full Name"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Space h="xl" />
              <TextInput
                placeholder="Email"
                label="Email"
                value={email}
                onChange={setEmail}
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
              />
              <Space h="lg" />
              <TextInput
                label="Street"
                value={streetNameValue}
                onChange={setStreetNameValue}
              />
              <Space h="lg" />
              <NumberInput
                label="Zip Code"
                description="please enter a valid zip code"
                placeholder="Your Zip Code"
                min={1}
                value={+zipCodeValue}
                //onChange={setZipCodeValue}
              />
              <Space h="xl" />
              <Space h="xl" />
              <Button
                variant="gradient"
                gradient={{ from: "teal", to: "lime", deg: 105 }}
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
