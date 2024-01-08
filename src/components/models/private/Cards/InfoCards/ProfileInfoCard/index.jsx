// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components

// Soft UI Dashboard PRO React base styles

import { UIBox, UITypography } from "../../../../../common";
import colors from "../../../../../../assets/themes/private/base/colors";
import typography from "../../../../../../assets/themes/private/base/typography";

function ProfileInfoCard({ title, description, info, social, action }) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(
        uppercaseLetter,
        ` ${uppercaseLetter.toLowerCase()}`
      );

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <UIBox key={label} display="flex" py={1} pr={2}>
      <UITypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize">
        {label}: &nbsp;
      </UITypography>
      <UITypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </UITypography>
    </UIBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <UIBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}>
      {icon}
    </UIBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <UIBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}>
        <UITypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize">
          {title}
        </UITypography>
        <UITypography
          component={Link}
          to={action.route}
          variant="body2"
          color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </UITypography>
      </UIBox>
      <UIBox p={2}>
        <UIBox mb={2} lineHeight={1}>
          <UITypography variant="button" color="text" fontWeight="regular">
            {description}
          </UITypography>
        </UIBox>
        <UIBox opacity={0.3}>
          <Divider />
        </UIBox>
        <UIBox>
          {renderItems}
          <UIBox display="flex" py={1} pr={2}>
            <UITypography
              variant="button"
              fontWeight="bold"
              textTransform="capitalize">
              social: &nbsp;
            </UITypography>
            {renderSocial}
          </UIBox>
        </UIBox>
      </UIBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;
