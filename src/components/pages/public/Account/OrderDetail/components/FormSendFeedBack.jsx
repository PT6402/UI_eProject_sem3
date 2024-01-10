import { useState } from "react";
import FrameUI from "../../../../../../helpers/FrameUI";
import { UIBox, UIButton } from "../../../../../common";
import { axiosAuthentication } from "../../../../../../../http";
import { useDispatch, useSelector } from "react-redux";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";

export default function FormSendFeedBack() {
  const dispatch = useDispatch();
  const dataValue = useSelector((state) => state.modalType.value);
  const info_user = useSelector((state) => state.user.info_user);
  const [contentFeed, setContentFeed] = useState(null);
  const handleSendFeedback = async (data) => {
    const url = "http://localhost:8000/api/Employee/sendfeedback";
    await axiosAuthentication
      .post(url, data)
      .then((res) => {
        if (res.status == 200) {
          return true;
        } else {
          false;
        }
      })
      .catch(() => {
        return false;
      });
  };
  const handleChangeModal = () => {
    dispatch(setStatus(false));
    dispatch(setType(null));
    dispatch(setValue(null));
    dispatch(setStatusModal());
  };
  const handleSend = async () => {
    if (dataValue != null) {
      const data = {
        user_Id: info_user.userId,
        duration_Id: dataValue.duration_Id,
        address_Store_Id: dataValue.address_Store_Id,
        content: contentFeed,
        order_Id: dataValue.orderId,
      };
      await handleSendFeedback(data);
      handleChangeModal();
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}>
      <p style={{ padding: "2rem" }}>Feedback</p>
      <textarea
        style={{
          width: "100%",
          height: "50%",
          borderRadius: "1rem",
          padding: "1rem",
          outline: "none",
          border: "none",
          resize: "block",
        }}
        onChange={(e) => setContentFeed(e.target.value)}
        value={contentFeed}
        placeholder="enter feedback..."></textarea>
      <FrameUI>
        <UIBox
          ml="auto"
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <UIButton
            color="black"
            sx={{
              fontSize: "1.5rem",
              fontFamily: " Monument Extended, sans-serif",
              padding: "1rem 2rem",
              borderRadius: "1rem",
              color: "#fff",
              transition: " all 0.1s ease-in",
              "&:active": {
                transform: " scale(0.9)",
              },
              "&:hover": {
                background: "#000",
                color: "#fff",
                borderColor: "#000",
              },
            }}
            onClick={handleSend}>
            Send
          </UIButton>
        </UIBox>
      </FrameUI>
    </div>
  );
}
