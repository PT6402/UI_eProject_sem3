import { useDispatch, useSelector } from "react-redux";

import { setStatus, setType, setValue } from "../../../../context/modalSlice";
import UIModalCenter from "../../../common/private/UIModalCenter";

export default function ModalType() {
  const dispatch = useDispatch();
  const modal_type = useSelector((state) => state.modalType);
  return (
    <UIModalCenter
      close={() => {
        dispatch(setStatus(false));
        dispatch(setType(null));
        dispatch(setValue(null));
      }}
      modalClassName={{ padding: "3rem 0" }}>
      {modal_type.status && <modal_type.type />}
    </UIModalCenter>
  );
}
