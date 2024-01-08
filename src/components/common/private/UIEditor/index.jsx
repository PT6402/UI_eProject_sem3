/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

// draft-js
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Custom styles for the MDEditor
import UIEditorRoot from "./UIEditorRoot";

// Material Dashboard 2 PRO React context

function MDEditor({
  value,
  edit,
  input,
  readOnly,
  toolbarHidden,
  placeholder,
}) {
  const darkMode = false;
  const [convertedContent, setConvertedContent] = React.useState(null);
  const [editorState, setEditorState] = React.useState(() => {
    if (edit) {
      return EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(input))
      );
    }
    return EditorState.createEmpty();
  });

  React.useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  return (
    <UIEditorRoot ownerState={{ darkMode }}>
      {value && typeof value === "function" && value(convertedContent)}
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        readOnly={readOnly}
        toolbarHidden={toolbarHidden}
        placeholder={placeholder}
      />
    </UIEditorRoot>
  );
}

// Setting default values for the props of MDEditor
MDEditor.defaultProps = {
  value: () => {},
};

// Typechecking props for the MDEditor
MDEditor.propTypes = {
  value: PropTypes.func,
};

export default MDEditor;
