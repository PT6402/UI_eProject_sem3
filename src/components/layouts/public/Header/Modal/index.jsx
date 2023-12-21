import { useDispatch, useSelector } from "react-redux";
import { CenterModal } from "../../../../common";
import { setStatus } from "../../../../../context/modalSlice";

export default function ModalType() {
  const dispatch = useDispatch();
  const modal_type = useSelector((state) => state.modalType);
  return (
    <CenterModal
      close={() => dispatch(setStatus(false))}
      modalClassName={{ padding: "3rem 0" }}>
      {modal_type.status && <modal_type.type />}
    </CenterModal>
  );
}
