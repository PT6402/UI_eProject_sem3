import { Card } from "@mui/material";
import { UIBox, UITypography } from "../../../../common";
import ItemPayment from "./ItemService";

export default function Services() {
  return (
    <Card id="delete-account">
      <UIBox pt={3} px={2}>
        <UITypography
          variant="h3"
          fontWeight="medium"
          sx={{ fontSize: "2.5rem" }}>
          Services Information
        </UITypography>
      </UIBox>
      <UIBox pt={1} pb={2} px={2}>
        <UIBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <ItemPayment
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
          <ItemPayment
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            vat="FRB1235476"
          />
          <ItemPayment
            name="ethan james"
            company="fiber notion"
            email="ethan@fiber.com"
            vat="FRB1235476"
            noGutter
          />
        </UIBox>
      </UIBox>
    </Card>
  );
}
