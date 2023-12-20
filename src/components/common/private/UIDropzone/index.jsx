import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import UIBox from "components/common/private/UIBox";
import UIDropzoneRoot from "components/common/private/UIDropzone/UIDropzoneRoot";

function UIDropzone({ options }) {
  const dropzoneRef = useRef();

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      return new Dropzone(dropzoneRef.current, { ...options });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0)
        Dropzone.instances.forEach((dz) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <UIDropzoneRoot
      component="form"
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone">
      <UIBox className="fallback">
        <UIBox component="input" name="file" type="file" multiple />
      </UIBox>
    </UIDropzoneRoot>
  );
}

// Typechecking props for the UIDropzone
UIDropzone.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UIDropzone;
