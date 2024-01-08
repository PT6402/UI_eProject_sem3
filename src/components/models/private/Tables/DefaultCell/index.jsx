/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { UITypography } from "../../../../common";

function DefaultCell({ value, suffix, fontSize }) {
  return (
    <UITypography
      variant="caption"
      fontWeight="medium"
      color="text"
      fontSize={fontSize}>
      {value}
      {suffix && (
        <UITypography variant="caption" fontWeight="medium" color="secondary">
          &nbsp;&nbsp;{suffix}
        </UITypography>
      )}
    </UITypography>
  );
}

DefaultCell.defaultProps = {
  suffix: "",
};

DefaultCell.propTypes = {
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default DefaultCell;
