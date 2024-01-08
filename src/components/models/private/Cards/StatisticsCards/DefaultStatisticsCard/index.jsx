// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { UIBox, UITypography } from "../../../../../common";

function DefaultStatisticsCard({ title, count, percentage, dropdown }) {
  return (
    <Card>
      <UIBox p={2}>
        <Grid container>
          <Grid item xs={7}>
            <UIBox mb={0.5} lineHeight={1}>
              <UITypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize">
                {title}
              </UITypography>
            </UIBox>
            <UIBox lineHeight={1}>
              <UITypography variant="h5" fontWeight="bold">
                {count}
              </UITypography>
              <UITypography
                variant="button"
                fontWeight="bold"
                color={percentage.color}>
                {percentage.value}&nbsp;
                <UITypography
                  variant="button"
                  fontWeight="regular"
                  color="secondary">
                  {percentage.label}
                </UITypography>
              </UITypography>
            </UIBox>
          </Grid>
          <Grid item xs={5}>
            {dropdown && (
              <UIBox width="100%" textAlign="right" lineHeight={1}>
                <UITypography
                  variant="caption"
                  color="secondary"
                  sx={{ cursor: "pointer" }}
                  onClick={dropdown.action}>
                  {dropdown.value}
                </UITypography>
                {dropdown.menu}
              </UIBox>
            )}
          </Grid>
        </Grid>
      </UIBox>
    </Card>
  );
}

// Setting default values for the props of DefaultStatisticsCard
DefaultStatisticsCard.defaultProps = {
  percentage: {
    color: "success",
    value: "",
    label: "",
  },
  dropdown: false,
};

// Typechecking props for the DefaultStatisticsCard
DefaultStatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
      value: PropTypes.string,
    }),
  ]),
};

export default DefaultStatisticsCard;
