import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelCheckOut from "../../routes/HotelCheckOut";
import { useStoreState } from "../../state/store";

export default function CheckOutSteps() {
  const [activeTab, setActiveTab] = useState(1);
  //const [disable1, setDisable1] = useState(false);

  const navigate = useNavigate();

  // store state variables
  const userInfoState = useStoreState((state) => state.userSession.userInfo);

  useEffect(() => {
    if (!userInfoState) {
      navigate("/login?redirect=hotel-checkout");
    }
  }, []);

  return (
    <Tabs mt="lg" active={activeTab} onTabChange={setActiveTab}>
      <Tabs.Tab
        label="Step1"
        title="Reveal hidden truth on long mouse over"
        disabled
      ></Tabs.Tab>
      <Tabs.Tab label="Step2" title="select your hotel of choice">
        <HotelCheckOut />
      </Tabs.Tab>
    </Tabs>
  );
}
