import {
  Container,
  Title,
  Text,
  Group,
  Grid,
  Image,
  Box,
  Stack,
  Space,
  Button,
  useMantineTheme,
  createStyles,
  Card,
  Paper,
} from "@mantine/core";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowNarrowLeft } from "tabler-icons-react";
import { Hotel } from "../state/models/hotel.model";

// interface HotelDetailsProps {}
const useStyles = createStyles((theme) => ({
  detail__wrapper: {
    width: "100%",
  },
  detail__hero: {
    width: "100%",
    minHeight: 500,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: 8,
    position: "relative",
    color: theme.white,
    "&>*": {
      zIndex: "2",
    },
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: 8,
      backgroundImage: "linear-gradient(#0000006a,#000000)",
    },
  },
}));

export default function HotelDetails() {
  let params = useParams();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [hotel, setHotel] = useState<Hotel>();
  const navigate = useNavigate();

  const fetchHotelById = async (id: string) => {
    try {
      let config: AxiosRequestConfig<any> = {
        method: "get",
        url: `https://peaceful-garden-90498.herokuapp.com/api/hotel/${id}`,
        headers: {},
      };
      let response = await axios(config);
      return response;
    } catch (error: any) {
      return error;
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchHotelById(params.id).then((res) => {
        setHotel(res.data);
      });
    }
  }, [params.id]);

  const createImageGrid = (hotel: Hotel) => {
    return (
      <Group>
        {hotel.images.map((url, idx) => {
          return (
            <Image
              key={idx}
              src={url}
              width={100}
              height={100}
              withPlaceholder={true}
              radius={8}
              sx={{}}
            />
          );
        })}
      </Group>
    );
  };

  return (
    <Container my="xl">
      <Button
        component={Link}
        to="/hotels"
        variant="subtle"
        leftIcon={<ArrowNarrowLeft />}
        color="gray"
      >
        Back
      </Button>
      {hotel ? (
        <Box py="xl" className={classes.detail__wrapper}>
          <Stack
            align="flex-start"
            justify={"center"}
            px={"xl"}
            spacing="sm"
            className={classes.detail__hero}
            style={{ backgroundImage: `url(${hotel.images[0]})` }}
          >
            <Title
              order={1}
              sx={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: "600",
                fontSize: "2rem",
              }}
            >
              {hotel.name}
            </Title>
            <Text style={{ maxWidth: "min(45ch,100%)" }}>
              {hotel.description}
            </Text>
            <Text>{`${hotel.address.city}, ${hotel.address.state} - ${hotel.address.country}`}</Text>
            <Group>
              <Text>rating: {hotel.ratings}</Text>
              <Text>rooms available: {hotel.roomsAvailable}</Text>
            </Group>
            {createImageGrid(hotel)}
            <Button
              color={"teal"}
              size={"md"}
              onClick={() => navigate(`/hotel-checkout`)}
            >
              Book Now
            </Button>
          </Stack>
          <Space my={50} />
          <Grid>
            <Grid.Col span={6}>
              <Text color="dimmed" size={"lg"} mb={"xl"}>
                Packages
              </Text>
              <Group>
                {hotel.hotelPackages.map((pack, idx) => {
                  return (
                    <Card
                      key={idx}
                      shadow={"md"}
                      p="lg"
                      radius={8}
                      withBorder={true}
                    >
                      <Group>
                        <Text color={"indigo"} size={"xl"}>
                          ${pack.price}
                        </Text>
                        <Text transform={"uppercase"} size={"sm"}>
                          {pack.package}
                        </Text>
                      </Group>
                      <Text size={"sm"} style={{ width: "min(30ch,100%)" }}>
                        {pack.description}
                      </Text>
                    </Card>
                  );
                })}
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack align="flex-end" justify="flex-start" spacing="xs">
                <Text color="dimmed" size={"lg"} mb={"xl"}>
                  Comments
                </Text>
                {hotel.comments && hotel.comments.length !== 0 ? (
                  hotel.comments.map((comment, idx) => {
                    return (
                      <Paper
                        withBorder
                        radius="md"
                        key={idx}
                        sx={(theme) => ({
                          width: "min(280px,100%)",
                          padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
                        })}
                      >
                        <Group>
                          <Text size="sm">{comment.user?.fullName}</Text>
                          <Text size="xs" color="dimmed">
                            rating:{comment.rating}
                          </Text>
                        </Group>
                        <Text
                          sx={(theme) => ({
                            paddingTop: theme.spacing.sm,
                          })}
                          size="sm"
                        >
                          {comment.comment}
                        </Text>
                      </Paper>
                    );
                  })
                ) : (
                  <Text
                    sx={(theme) => ({
                      paddingTop: theme.spacing.xl,
                    })}
                    size="sm"
                    color="dimmed"
                  >
                    No Comments Available
                  </Text>
                )}
              </Stack>
            </Grid.Col>
          </Grid>
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
}
