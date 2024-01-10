/* eslint-disable react/prop-types */

import { UIBadge, UIBadgeDot, UIBox, UITypography } from "../../../common";
import { Card, Grid } from "@mui/material";

export default function ItemService({
  name_service,
  duration,
  packages,
  price,
  id,
  handleGetIdService,
  selectService,
  orderId,
}) {
  return (
    <Card
      sx={{
        boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        transition: "transform 0.2s ease-in-out",
        // "&:hover": {
        //   transform: "scale(1.05)",
        // },
        transform: selectService == id ? "scale(1.05)" : "",
        border: selectService == id ? ".2rem solid grey" : "",
        cursor: "pointer",
      }}>
      <UIBox variant="gradient" onClick={() => handleGetIdService(id, orderId)}>
        <UIBox p={2}>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <UIBox sx={{ display: "flex", justifyContent: "space-between" }}>
                <UIBox
                  lineHeight={1}
                  sx={{
                    borderRight: ".1rem solid #000",
                    marginRight: "1rem",
                  }}>
                  <UIBox mr={1}>
                    <UITypography
                      variant="button"
                      color="#000"
                      textTransform="capitalize"
                      fontWeight={"bold"}
                      sx={{ fontSize: "1.8rem", whiteSpace: "nowrap" }}>
                      {name_service}
                    </UITypography>
                    <UIBadgeDot
                      variant="gradient"
                      color={"info"}
                      size="lg"
                      badgeContent={packages}
                      font={{
                        color: "text",
                        weight: "medium",
                      }}
                      fontSizeCus={"1.4rem"}
                      sx={{ width: "100%" }}
                      px={0}
                    />
                    <UIBadgeDot
                      variant="gradient"
                      color={"info"}
                      size="lg"
                      badgeContent={duration}
                      font={{
                        color: "text",
                        weight: "medium",
                      }}
                      fontSizeCus={"1.4rem"}
                      px={0}
                    />
                  </UIBox>
                </UIBox>
                <UIBox
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}>
                  <UIBadge
                    variant="contained"
                    color="success"
                    badgeContent="total"
                    container
                  />
                  <UITypography
                    variant="button"
                    fontWeight="bold"
                    color={"error"}
                    sx={{
                      fontSize: "1.6rem",
                      whiteSpace: "nowrap",
                      paddingTop: "1rem",
                    }}>
                    {price}$
                  </UITypography>
                </UIBox>
              </UIBox>
            </Grid>
          </Grid>
        </UIBox>
      </UIBox>
    </Card>
  );
}
