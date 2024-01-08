import { UIBox, UITypography } from "../../../../../../common";

function UserInformation() {
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
              variant="button"
              fontWeight="medium"
              textTransform="capitalize">
              Customer
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Fullname:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                Viking Burrito
              </UITypography>
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Phone:&nbsp;&nbsp;&nbsp;
              <UITypography variant="caption" fontWeight="medium">
                oliver@burrito.com
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
              variant="button"
              fontWeight="medium"
              textTransform="capitalize">
              Service
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Connect type:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                Viking Burrito
              </UITypography>
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Package:&nbsp;&nbsp;&nbsp;
              <UITypography variant="caption" fontWeight="medium">
                oliver@burrito.com
              </UITypography>
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Duration:&nbsp;&nbsp;&nbsp;
              <UITypography variant="caption" fontWeight="medium">
                oliver@burrito.com
              </UITypography>
            </UITypography>
          </UIBox>
          <UITypography variant="caption" color="text">
            Validate:&nbsp;&nbsp;&nbsp;
            <UITypography variant="caption" fontWeight="medium">
              FRB1235476
            </UITypography>
          </UITypography>
        </UIBox>
      </UIBox>
    </>
  );
}

export default UserInformation;
