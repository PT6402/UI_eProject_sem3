import { Tab, Tabs } from "@mui/material";
import FrameUI from "helpers/FrameUI";
import { UIBox } from "../../../common";
import { useState } from "react";
export default function SignIn() {
  const [type, setType] = useState(0);
  const handleChange = (event, newType) => {
    setType(newType);
  };
  return (
    <FrameUI>
      <Tabs
        value={type}
        onChange={handleChange}
        sx={() => ({ fontSize: "2rem !important" })}>
        <Tab
          id="phone"
          label={
            <UIBox py={0.5} px={2}>
              Phone
            </UIBox>
          }
        />
        <Tab
          id="services"
          label={
            <UIBox py={0.5} px={2}>
              Serives
            </UIBox>
          }
        />
      </Tabs>
    </FrameUI>
  );
}
