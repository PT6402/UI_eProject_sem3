/* eslint-disable react/prop-types */
import { UIBox, UITypography } from "../../../../../../common";

function OrderSummary({ packagePrice, deposit, coupon, tax, totalPrice }) {
  return (
    <>
      <UIBox mb={2}>
        <UITypography variant="h3" fontWeight="medium">
          Order Summary
        </UITypography>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mb={0.5}>
        <UITypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ fontSize: "1.3rem" }}>
          Package Price:
        </UITypography>
        <UIBox ml={1}>
          <UITypography
            variant="body2"
            fontWeight="medium"
            sx={{ fontSize: "1.3rem" }}>
            ${packagePrice}
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mb={0.5}>
        <UITypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ fontSize: "1.3rem" }}>
          Deposit Connect:
        </UITypography>
        <UIBox ml={1}>
          <UITypography
            variant="body2"
            fontWeight="medium"
            sx={{ fontSize: "1.3rem" }}>
            ${deposit}
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mb={0.5}>
        <UITypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ fontSize: "1.3rem" }}>
          Coupon:
        </UITypography>
        <UIBox ml={1}>
          <UITypography
            variant="body2"
            fontWeight="medium"
            sx={{ fontSize: "1.3rem" }}>
            - ${(deposit * coupon) / 100}
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mb={0.5}>
        <UITypography
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ fontSize: "1.3rem" }}>
          Taxes:
        </UITypography>
        <UIBox ml={1}>
          <UITypography
            variant="body2"
            fontWeight="medium"
            sx={{ fontSize: "1.3rem" }}>
            12.24%
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox display="flex" justifyContent="space-between" mt={3}>
        <UITypography
          variant="body1"
          fontWeight="light"
          color="text"
          sx={{ fontSize: "1.3rem" }}>
          Total:
        </UITypography>
        <UIBox ml={1}>
          <UITypography
            variant="body1"
            fontWeight="medium"
            sx={{ fontSize: "1.3rem" }}>
            ${totalPrice}
          </UITypography>
        </UIBox>
      </UIBox>
    </>
  );
}

export default OrderSummary;
