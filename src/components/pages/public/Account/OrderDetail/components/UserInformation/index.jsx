/* eslint-disable react/prop-types */
import { UIBox, UITypography } from "../../../../../../common";

function UserInformation({
  fullName,
  phone,
  connect_type_name,
  packages,
  time,
  validate,
}) {
  return (
    <>
      <UIBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor="grey-100"
        borderRadius="lg"
        p={3}>
        <UIBox
          width="100%"
          display="flex"
          flexDirection="column"
          lineHeight={1}>
          <UIBox mb={2}>
            <UITypography
              variant="h4"
              fontWeight="medium"
              textTransform="capitalize">
              Customer
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.3rem" }}>
              Fullname:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize"
                sx={{ fontSize: "1.1rem" }}>
                {fullName}
              </UITypography>
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.3rem" }}>
              Phone:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                sx={{ fontSize: "1.1rem" }}>
                {phone}
              </UITypography>
            </UITypography>
          </UIBox>
        </UIBox>
      </UIBox>
      <UIBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor="grey-100"
        borderRadius="lg"
        p={3}
        mt={2}>
        <UIBox
          width="100%"
          display="flex"
          flexDirection="column"
          lineHeight={1}>
          <UIBox mb={2}>
            <UITypography
              variant="h4"
              fontWeight="medium"
              textTransform="capitalize">
              Service
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.3rem" }}>
              Connect type:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize"
                sx={{ fontSize: "1.1rem" }}>
                {connect_type_name}
              </UITypography>
            </UITypography>
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
                sx={{ fontSize: "1.1rem" }}>
                {packages}
              </UITypography>
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.3rem" }}>
              Duration:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                sx={{ fontSize: "1.1rem" }}>
                {time}
              </UITypography>
            </UITypography>
          </UIBox>
          <UITypography
            variant="caption"
            color="text"
            sx={{ fontSize: "1.3rem" }}>
            Validate:&nbsp;&nbsp;&nbsp;
            <UITypography
              variant="caption"
              fontWeight="medium"
              sx={{ fontSize: "1.1rem" }}>
              {validate}
            </UITypography>
          </UITypography>
        </UIBox>
      </UIBox>
    </>
  );
}

export default UserInformation;
