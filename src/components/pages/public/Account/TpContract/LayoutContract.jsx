/* eslint-disable react/prop-types */
// @mui material components
import Card from "@mui/material/Card";
import { UIBox, UITypography } from "../../../../common";
import TableServices from "./TableServices";

function LayoutContract({ title, info }) {
  const labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(
        uppercaseLetter,
        ` ${uppercaseLetter.toLowerCase()}`
      );

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <UIBox key={label} display="flex" py={1} pr={2}>
      <UITypography
        variant="caption"
        fontWeight="bold"
        textTransform="capitalize"
        sx={{ fontSize: "1.3rem" }}>
        {label}: &nbsp;
      </UITypography>
      <UITypography
        variant="caption"
        fontWeight="regular"
        color="text"
        sx={{ fontSize: "1.1rem" }}>
        &nbsp;{values[key]}
      </UITypography>
    </UIBox>
  ));

  return (
    <Card sx={{ height: "100%", padding: "1rem" }}>
      <UIBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}>
        <UITypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
          sx={{ fontSize: "1.9rem" }}>
          {title}
        </UITypography>
      </UIBox>
      <UIBox p={2}>
        <UIBox>{renderItems}</UIBox>
      </UIBox>
      <TableServices />
    </Card>
  );
}

export default LayoutContract;
