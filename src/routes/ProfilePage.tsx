import {
  Button,
  Container,
  createStyles,
  Dialog,
  Grid,
  Loader,
  NativeSelect,
  SimpleGrid,
  Skeleton,
  Space,
  Text,
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
  const profileInfoState = useStoreState((state) => state.profile.userProfile);
  const profileInfo = useStoreState((state) => state.profile);
  const userInfoState = useStoreState((state) => state.userSession.userInfo);

  const { isLoading, error } = profileInfo;

  // profiles data state
  const [fullNameValue, setFullNameValue] = useInputState("");
  const [emailValue, setEmailValue] = useInputState("");

  const [countryNames] = useState(
    Country.getAllCountries().map((country) => country.name)
  );
  const [countryValue, setCountryValue] = useInputState(countryNames[0]);
  const [statesValue, setStatesValue] = useInputState("");
  const [cityValue, setCityValue] = useInputState("");
  const [streetNameValue, setStreetNameValue] = useInputState("");
  const [zipCodeValue, setZipCodeValue] = useInputState("");

  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  const getProfileAction = useStoreActions(
    (action) => action.profile.getProfile
  );
  const updateProfileAction = useStoreActions(
    (action) => action.profile.updateProfile
  );

  const updateProfileHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    updateProfileAction({
      fullName: fullNameValue,
      email: emailValue,
      address: {
        country: countryValue,
        state: statesValue,
        city: cityValue,
        zipCode: zipCodeValue && zipCodeValue,
        street: streetNameValue && streetNameValue,
      },
    });
    console.log("updated successfully");
    setOpened(true);
    getProfileAction();
  };

  useEffect(() => {
    getProfileAction();
    if (!userInfoState?.token) {
      navigate("/login");
    } else if (profileInfoState) {
      setFullNameValue(profileInfoState.fullName);
      setEmailValue(profileInfoState.email);
      if (profileInfoState.address) {
        setCountryValue(profileInfoState.address.country);
        setStatesValue(profileInfoState.address.state);
        setCityValue(profileInfoState.address.city);
        if (profileInfoState.address.street)
          setStreetNameValue(profileInfoState.address.street);
        if (profileInfoState.address.zipCode)
          setZipCodeValue(profileInfoState.address.zipCode);
      }
    } else {
      setFullNameValue(userInfoState.fullName);
      setEmailValue(userInfoState.email);
    }
  }, []);

  return (
    <>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <DashBoard />
        <Container>
          <Grid gutter="md">
            {isLoading ? (
              <Grid.Col span={12}>
                <Space h="xl" />
                <Space h="xl" />
                <Loader />
              </Grid.Col>
            ) : (
              <>
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
                    onChange={(event) =>
                      setCountryValue(event.currentTarget.value)
                    }
                    required
                  />
                  <Space h="lg" />
                  <TextInput
                    label="State"
                    value={statesValue}
                    onChange={(event) =>
                      setStatesValue(event.currentTarget.value)
                    }
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
                    value={zipCodeValue}
                    onChange={setZipCodeValue}
                  />
                  <Space h="xl" />
                  <Space h="xl" />
                  <Button
                    // variant="gradient"
                    // gradient={{ from: "teal", to: "lime", deg: 105 }}
                    onClick={updateProfileHandler}
                    className={classes.btnStyle}
                  >
                    Update Profile
                  </Button>
                </Grid.Col>
              </>
            )}
          </Grid>
        </Container>
        <Dialog
          opened={opened}
          withCloseButton
          onClose={() => setOpened(false)}
          size="lg"
          radius="md"
        >
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Profile Updated Successfully
          </Text>
        </Dialog>
      </SimpleGrid>
    </>
  );
}
