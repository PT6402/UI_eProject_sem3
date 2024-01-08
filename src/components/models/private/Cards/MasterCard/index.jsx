// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Images
import curved14 from "assets/images/private/curved-images/curved14.jpg";
import masterCardLogo from "assets/images/private/logos/mastercard.png";
import { UIBox, UITypography } from "../../../../common";
import { scale } from "chroma-js";
import { useDispatch } from "react-redux";
import { setStatus, setType } from "../../../../../context/modalSlice";

function MasterCard({ color, number, holder, expires }) {
  const numbers = [...`${number}`];
  const dispatch = useDispatch();
  if (numbers.length < 16 || numbers.length > 16) {
    throw new Error(
      "Invalid value for the prop number, the value for the number prop shouldn't be greater than or less than 16 digits"
    );
  }
  const handleChangeModal = () => {
    dispatch(setStatus(true));
    dispatch(setType());
  };
  const num1 = numbers.slice(0, 4).join("");
  const num2 = numbers.slice(4, 8).join("");
  const num3 = numbers.slice(8, 12).join("");
  const num4 = numbers.slice(12, 16).join("");

  return (
    <Card
      sx={() => ({
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        width: "100%",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
        cursor: "pointer",
      })}>
      <UIBox p={5}>
        <UITypography variant="h5" color="dark" fontWeight="medium">
          Contract-id:
          <UITypography
            variant="h5"
            color="dark"
            fontWeight="medium"
            sx={{
              mb: 5,
              pb: 1,
              pt: 1,
              border: ".2rem solid grey",
              textAlign: "center",
              borderRadius: "1rem",
            }}>
            {num1}&nbsp;&nbsp;&nbsp;{num2}&nbsp;&nbsp;&nbsp;{num3}
            &nbsp;&nbsp;&nbsp;{num4}
          </UITypography>
        </UITypography>
        <UIBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%">
          <UIBox display="flex" alignItems="center">
            <UIBox mr={3} lineHeight={1}>
              <UITypography
                variant="button"
                color="dark"
                fontWeight="regular"
                opacity={0.8}>
                Card Holder
              </UITypography>
              <UITypography
                variant="h6"
                color="dark"
                fontWeight="medium"
                textTransform="capitalize">
                {holder}
              </UITypography>
            </UIBox>
            <UIBox lineHeight={1}>
              <UITypography
                variant="button"
                color="dark"
                fontWeight="regular"
                opacity={0.8}>
                Expires
              </UITypography>
              <UITypography variant="h6" color="dark" fontWeight="medium">
                {expires}
              </UITypography>
            </UIBox>
          </UIBox>
          <UIBox display="flex" justifyContent="flex-end" width="100%"></UIBox>
        </UIBox>
      </UIBox>
    </Card>
  );
}

// Setting default values for the props of MasterCard
MasterCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the MasterCard
MasterCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  number: PropTypes.number.isRequired,
  holder: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
};

export default MasterCard;
