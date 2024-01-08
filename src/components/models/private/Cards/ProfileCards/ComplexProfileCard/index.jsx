// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Soft UI Dashboard PRO React components

// Soft UI Dashboard PRO React base styles
import colors from "assets/themes/private/base/colors";
import { UIBox, UITypography } from "../../../../../common";

function ComplexProfileCard({ image, name, position, description, social }) {
  const { socialMediaColors } = colors;

  // Render the social media icons
  const renderSocial = social.map(({ link, icon, color }, key) => (
    <UIBox
      key={color}
      component={Link}
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize="1.375rem"
      color={socialMediaColors[color].main}
      py={1.5}
      pr={1.5}
      pl={key === 0 ? 0 : 1.5}
      lineHeight={1}>
      {icon}
    </UIBox>
  ));

  return (
    <UIBox width="100%" height="100%" display="flex" alignItems="center">
      <UIBox width="40%" height="100%">
        <UIBox
          component="img"
          src={image}
          alt={name}
          shadow="lg"
          borderRadius="lg"
          width="100%"
          height="100%"
          sx={{ objectFit: "cover" }}
        />
      </UIBox>
      <UIBox width="60%" py={2.5} px={4}>
        <UIBox mb={1} lineHeight={1}>
          <UITypography variant="h5" fontWeight="bold">
            {name}
          </UITypography>
          <UITypography
            variant="button"
            color="text"
            textTransform="uppercase"
            fontWeight="medium">
            {position}
          </UITypography>
        </UIBox>
        <UIBox mb={3}>
          <UITypography variant="body2" color="text">
            {description}
          </UITypography>
        </UIBox>
        <UIBox display="flex">{renderSocial}</UIBox>
      </UIBox>
    </UIBox>
  );
}

// Setting default props for the ComplexProfileCard
ComplexProfileCard.defaultProps = {
  description: "",
  social: [{}],
};

// Typechecking props for the ComplexProfileCard
ComplexProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string,
  social: PropTypes.arrayOf(PropTypes.object),
};

export default ComplexProfileCard;
