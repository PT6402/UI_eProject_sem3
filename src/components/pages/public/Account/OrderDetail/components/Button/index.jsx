/* eslint-disable react/prop-types */
import { UIButton } from "../../../../../../common";
import { useDispatch } from "react-redux";
import {
  setStatus,
  setType,
  setValue,
} from "../../../../../../../context/modalSlice";
import FormSendFeedBack from "../FormSendFeedBack";

export default function ButtonSend({ item }) {
  const dispatch = useDispatch();

  const handleChangeModal = () => {
    dispatch(setStatus(true));
    dispatch(setType(FormSendFeedBack));
    dispatch(setValue(item));
  };

  return (
    <UIButton
      color={"success"}
      variant={"contained"}
      sx={{
        margin: "1rem 0",
        padding: "1rem 5rem",
        whiteSpace: "nowrap",
        width: "100%",
      }}
      onClick={() => handleChangeModal()}>
      Feed back
    </UIButton>
  );
}
