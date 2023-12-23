/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import {
  setStatus,
  setType,
  setValue,
} from "../../../../../context/modalSlice";
import { UIButton } from "../../../../common";

export default function ButtonCell({ modal, content, value }) {
  const dispatch = useDispatch();
  const handleSetTypeModal = () => {
    dispatch(setStatus(true));
    dispatch(setType(modal));
    if (value != null) {
      dispatch(setValue(value));
    }
  };
  return (
    <UIButton color="info" size="small" onClick={() => handleSetTypeModal()}>
      {content}
    </UIButton>
  );
}
