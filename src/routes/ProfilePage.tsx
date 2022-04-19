import {
  Autocomplete,
  Button,
  Container,
  Grid,
  NumberInput,
  SimpleGrid,
  Space,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import DashBoard from "../components/layout/DashBoard";

//const child = <Skeleton height={140} radius="md" animate={false} />;
console.log(Country.getAllCountries());

interface CountryMap {
  value: string;
  flag: string;
  countryCode: string;
}

export default function ProfilePage() {
  const countries = Country.getAllCountries();
  const [countryValue, setCountryValue] = useState(countries[0].name);

  const countryMap = countries.map((country) => ({
    value: country.name,
    flag: country.flag,
    countryCode: country.isoCode,
  })) as CountryMap[];

  useEffect(() => {});
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
                description="You can Update your Full Name"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Space h="xl" />
              <TextInput
                placeholder="Email"
                label="Email"
                description="You can Update your Email Address"
              />
            </Grid.Col>
            <Grid.Col>
              <Space h="xl" />
              <p>Address Details</p>
              <Space h="xl" />
              <Autocomplete
                label="Country"
                value={countryValue}
                onChange={setCountryValue}
                limit={6}
                data={countryMap}
              />
              <Space h="lg" />
              <TextInput placeholder="State" label="State" />
              <Space h="lg" />
              <TextInput placeholder="City" label="City" />
              <Space h="lg" />
              <NumberInput
                label="Zip Code"
                description="please enter a valid zip code"
                placeholder="Your Zip Code"
                min={1}
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
