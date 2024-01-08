import { UIBox, UIButton, UITypography } from "../../../../../../common";

function Header() {
  return (
    <UIBox display="flex" justifyContent="space-between" alignItems="center">
      <UIBox>
        <UIBox mb={1}>
          <UITypography variant="h6" fontWeight="medium">
            Order Details
          </UITypography>
        </UIBox>
        <UITypography
          component="p"
          variant="button"
          fontWeight="regular"
          color="text">
          Order no.{" "}
          <span style={{ fontWeight: "bold", padding: ".5rem" }}>241342</span>{" "}
          from
          <span style={{ fontWeight: "bold", padding: ".5rem" }}>
            23.02.2021
          </span>
        </UITypography>
      </UIBox>
      <UIButton variant="gradient" color="secondary">
        invoice
      </UIButton>
    </UIBox>
  );
}

export default Header;
