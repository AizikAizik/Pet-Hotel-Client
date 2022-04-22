import { Container, Title, Text, Group, Grid, Image, Box } from "@mantine/core";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Hotel } from "../state/models/hotel.model";

// interface HotelDetailsProps {}

export default function HotelDetails() {
  let params = useParams();
  const [hotel, setHotel] = useState<any>();

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
            />
          );
        })}
      </Group>
    );
  };

  return (
    <Container my="xl">
      {hotel ? (
        <Box>
          <Title>{hotel.name}</Title>
          <Text>{hotel.description}</Text>
          <Group>
            <Text>rating:{hotel.ratings}</Text>
            <Text>Rooms Available{hotel.roomsAvailable}</Text>
          </Group>
          {createImageGrid(hotel)}
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
}
