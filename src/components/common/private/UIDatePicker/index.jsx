import PropTypes from "prop-types";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import UIInput from "components/common/private/UIInput";

function UIDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <UIInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

UIDatePicker.defaultProps = {
  input: {},
};

UIDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default UIDatePicker;
