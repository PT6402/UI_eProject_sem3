/* eslint-disable react/prop-types */
import { UIBox, UIButton, UITypography } from "../../../common";
import { Card, Grid } from "@mui/material";
import ItemService from "./ItemService";

export default function ItemContract({
  contract_id,
  fullname,
  phone,
  email,
  serviceDtos,
}) {
  return (
    <Card
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",

        overflow: "visible",
        // minWidth: "50rem",
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
              Contract ID:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                textTransform="capitalize"
                sx={{ fontSize: "1.4rem" }}
                fontWeight={"bold"}>
                {contract_id}
              </UITypography>
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.4rem" }}>
              Fullname:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                sx={{ fontSize: "1.4rem" }}>
                {fullname}
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
          {email && (
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.4rem" }}>
              Email:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                sx={{ fontSize: "1.4rem" }}>
                {email}
              </UITypography>
            </UITypography>
          )}

          <UIBox mt={3}>
            <UITypography sx={{ fontSize: "1.4rem" }} fontWeight={"bold"}>
              Select Serivce:
            </UITypography>
            <Grid container spacing={2}>
              {serviceDtos != null &&
                serviceDtos.map((item, index) => {
                  return (
                    <Grid item key={index} xs={12}>
                      <ItemService
                        name_service={item.connect_type}
                        packages={item.package}
                        duration={item.duration}
                        price={item.price}
                      />
                    </Grid>
                  );
                })}
            </Grid>
            <UIBox sx={{ display: "flex", justifyContent: "flex-end" }}>
              <UIButton
                sx={{
                  marginTop: "1rem",
                  padding: "1rem 2rem",
                  fontSize: "1.2rem",
                }}
                variant={"contained"}
                color={"error"}>
                Payment
              </UIButton>
            </UIBox>
          </UIBox>
        </UIBox>
      </UIBox>
    </Card>
  );
}
