import { UIBox, UITypography } from "../../../../../../common";

function OrderSummary() {
  return (
    <>
      <UIBox mb={2}>
        <UITypography variant="h6" fontWeight="medium">
          Order Summary
        </UITypography>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mb={0.5}>
        <UITypography variant="button" fontWeight="regular" color="text">
          Package Price:
        </UITypography>
        <UIBox ml={1}>
          <UITypography variant="body2" fontWeight="medium">
            $90
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mb={0.5}>
        <UITypography variant="button" fontWeight="regular" color="text">
          Deposit Connect:
        </UITypography>
        <UIBox ml={1}>
          <UITypography variant="body2" fontWeight="medium">
            $14
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mb={0.5}>
        <UITypography variant="button" fontWeight="regular" color="text">
          Coupon:
        </UITypography>
        <UIBox ml={1}>
          <UITypography variant="body2" fontWeight="medium">
            $1.95
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mb={0.5}>
        <UITypography variant="button" fontWeight="regular" color="text">
          Taxes:
        </UITypography>
        <UIBox ml={1}>
          <UITypography variant="body2" fontWeight="medium">
            $1.95
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mt={3}>
        <UITypography variant="body1" fontWeight="light" color="text">
          Total:
        </UITypography>
        <UIBox ml={1}>
          <UITypography variant="body1" fontWeight="medium">
            $1.95
          </UITypography>
        </UIBox>
      </UIBox>
    </>
  );
}

export default OrderSummary;
