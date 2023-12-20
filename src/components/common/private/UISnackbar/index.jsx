import PropTypes from "prop-types";

// @mui material components/common
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";

// Soft UI Dashboard PRO React components/common
import UIBox from "components/common/private/UIBox";
import UITypography from "components/common/private/UITypography";

// Soft UI Dashboard PRO React base styles
import typography from "assets/themes/private/base/typography";

// Custom styles for the SoftSnackbar
import UISnackbarIconRoot from "components/common/private/UISnackbar/UISnackbarIconRoot";

function UISnackbar({
  color,
  icon,
  title,
  dateTime,
  content,
  close,
  bgWhite,
  ...rest
}) {
  const { size } = typography;
  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = "dark";
    dateTimeColor = "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      {...rest}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }>
      <UIBox
        variant={bgWhite ? "contained" : "gradient"}
        bgColor={bgWhite ? "white" : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}>
        <UIBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}>
          <UIBox display="flex" alignItems="center" lineHeight={0}>
            <UISnackbarIconRoot
              fontSize="small"
              ownerState={{ color, bgWhite }}>
              {icon}
            </UISnackbarIconRoot>
            <UITypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}>
              {title}
            </UITypography>
          </UIBox>
          <UIBox display="flex" alignItems="center" lineHeight={0}>
            <UITypography variant="caption" color={dateTimeColor}>
              {dateTime}
            </UITypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) =>
                  bgWhite || color === "light" ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }) =>
                  fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}>
              close
            </Icon>
          </UIBox>
        </UIBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <UIBox
          p={1.5}
          color={bgWhite || color === "light" ? "text" : "white"}
          fontSize={size.sm}>
          {content}
        </UIBox>
      </UIBox>
    </Snackbar>
  );
}

// Setting default values for the props of SoftSnackbar
UISnackbar.defaultProps = {
  bgWhite: false,
  color: "info",
};

// Typechecking props for UISnackbar
UISnackbar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
};

export default UISnackbar;
