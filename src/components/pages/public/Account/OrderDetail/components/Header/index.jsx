/* eslint-disable react/prop-types */
import { UIBox, UIButton, UITypography } from "../../../../../../common";

function Header({ order_id, createDate, status, handlePayment }) {
  return (
    <UIBox display="flex" justifyContent="space-between" alignItems="center">
      <UIBox>
        <UIBox mb={1}>
          <UITypography variant="h3" fontWeight="medium">
            Order Details
          </UITypography>
        </UIBox>
        <UITypography
          component="p"
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ fontSize: "1.5rem" }}>
          Order no.{" "}
          <span style={{ fontWeight: "bold", padding: ".5rem" }}>
            {order_id}
          </span>{" "}
          from
          <span style={{ fontWeight: "bold", padding: ".5rem" }}>
            {createDate}
          </span>
        </UITypography>
      </UIBox>
      {status != "Payment" ? (
        <UIButton
          variant="outlined"
          color="error"
          sx={{ fontSize: "1.3rem" }}
          disabled>
          {status}
        </UIButton>
      ) : (
        <UIButton
          variant="contained"
          color="error"
          sx={{ fontSize: "1.3rem" }}
          onClick={handlePayment}>
          {status}
        </UIButton>
      )}
    </UIBox>
  );
}

export default Header;
