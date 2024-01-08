/* eslint-disable react/prop-types */
import { UIBox, UITypography } from "../../../../common";
import { Icon } from "@mui/material";

export default function ItemService({ name, company, email, vat, noGutter }) {
  return (
    <UIBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}>
      <UIBox width="100%" display="flex" flexDirection="column">
        <UIBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}>
          <UITypography
            variant="h3"
            fontWeight="medium"
            textTransform="capitalize">
            {name}
          </UITypography>

          {/* <UIBox
            display="flex"
            alignItems="center"
            lineHeight={1}
            ml={3}
            sx={{ cursor: "pointer" }}>
            <Icon fontSize="small">picture_as_pdf</Icon>
            <UITypography variant="button" fontWeight="bold">
              &nbsp;PDF
            </UITypography>
          </UIBox> */}
        </UIBox>
        <UIBox mb={1} lineHeight={0}>
          <UITypography
            variant="caption"
            color="text"
            sx={{ fontSize: "1.3rem" }}>
            Package:&nbsp;&nbsp;&nbsp;
            <UITypography
              variant="caption"
              fontWeight="medium"
              textTransform="capitalize">
              {company}
            </UITypography>
          </UITypography>
        </UIBox>
        <UIBox mb={1} lineHeight={0}>
          <UITypography
            variant="caption"
            color="text"
            sx={{ fontSize: "1.3rem" }}>
            Time:&nbsp;&nbsp;&nbsp;
            <UITypography variant="caption" fontWeight="medium">
              {email}
            </UITypography>
          </UITypography>
        </UIBox>
        <UIBox mb={1} lineHeight={0}>
          <UITypography
            variant="caption"
            color="text"
            sx={{ fontSize: "1.3rem" }}>
            Price:&nbsp;&nbsp;&nbsp;
            <UITypography variant="caption" fontWeight="medium">
              {email}
            </UITypography>
          </UITypography>
        </UIBox>
        <UITypography
          variant="caption"
          color="text"
          sx={{ fontSize: "1.3rem" }}>
          Validate:&nbsp;&nbsp;&nbsp;
          <UITypography variant="caption" fontWeight="medium">
            {vat}
          </UITypography>
        </UITypography>
      </UIBox>
    </UIBox>
  );
}
