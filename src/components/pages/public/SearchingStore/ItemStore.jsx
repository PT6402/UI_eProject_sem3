/* eslint-disable react/prop-types */
import { UIBox, UITypography } from "../../../common";
import { Card } from "@mui/material";

export default function ItemStore({ address_store, phone }) {
  return (
    <Card
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        transition: "transform 0.2s ease-in-out",
        backgroundColor: "grey-100",
        minWidth: "50rem",
        marginBottom: "1rem",
      }}>
      <UIBox
        component="div"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        borderRadius="lg"
        p={3}
        sx={{ width: "100%", height: "100%" }}>
        <UIBox
          width="100%"
          display="flex"
          flexDirection="column"
          height={"100%"}>
          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.4rem" }}
              fontWeight={"bold"}>
              Address store:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                textTransform="capitalize"
                sx={{ fontSize: "1.4rem" }}
                fontWeight={"bold"}>
                {address_store}
              </UITypography>
            </UITypography>
          </UIBox>

          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.4rem" }}>
              Phone:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                sx={{ fontSize: "1.4rem" }}>
                {phone}
              </UITypography>
            </UITypography>
          </UIBox>
        </UIBox>
      </UIBox>
    </Card>
  );
}
