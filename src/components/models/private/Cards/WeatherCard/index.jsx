// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { UIBox, UITypography } from "../../../../common";

// Soft UI Dashboard PRO React components

function WeatherCard({ color, title, weather, icon }) {
  return (
    <UIBox sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "90%" }}>
        <UIBox
          bgColor={"secondary"}
          p={2}
          display="flex"
          justifyContent="center"
          alignItems="center">
          <UITypography
            variant="h5"
            color={color === "light" ? "dark" : "white"}
            fontWeight="bold">
            Checking Invoice
          </UITypography>
        </UIBox>
      </Card>
    </UIBox>
  );
}

// Setting default values for the props of WeatherCard
WeatherCard.defaultProps = {
  color: "info",
};

// Typechecking props for the WeatherCard
WeatherCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  weather: PropTypes.shape({
    location: PropTypes.string.isRequired,
    degree: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  // icon: PropTypes.shape({
  //   text: PropTypes.string.isRequired,
  //   component: PropTypes.string.isRequired,
  // }).isRequired,
};

export default WeatherCard;
