/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import { axiosAuthentication } from "../../../../../../../../http";
import { UIBox, UIButton, UITypography } from "../../../../../../common";
import { useDispatch } from "react-redux";
import { setStatusModal } from "../../../../../../../context/modalSlice";

function Header({ order_id, createDate, status, handlePayment }) {
  const dispatch = useDispatch();
  const showSurvey = async () => {
    const newSwal = Swal.mixin({
      customClass: {
        confirmButton: "button button-success",
        cancelButton: "button button-error",
      },
      buttonsStyling: false,
    });

    newSwal
      .fire({
        title: "You want delete order?",
        // text: "Success click check product",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await handleDeleteOrder();
          dispatch(setStatusModal());
          Swal.fire("Success!", "Your order has been deleted.", "success");
          return;
        }
      });
  };
  const handleDeleteOrder = async () => {
    await axiosAuthentication.delete(
      `http://localhost:8000/api/Order?id=${order_id}`
    );
    return;
  };
  return (
    <UIBox display="flex" justifyContent="space-between" alignItems="center">
      <UIBox>
        <UIBox mb={1}>
          <UITypography variant="h3" fontWeight="medium">
            Order Details
          </UITypography>
        </UIBox>
        <UITypography
          component="p"
          variant="button"
          fontWeight="regular"
          color="text"
          sx={{ fontSize: "1.5rem" }}>
          Order no.{" "}
          <span style={{ fontWeight: "bold", padding: ".5rem" }}>
            {order_id}
          </span>{" "}
          from
          <span style={{ fontWeight: "bold", padding: ".5rem" }}>
            {createDate}
          </span>
        </UITypography>
      </UIBox>
      {status == "Payment" && (
        <UIButton
          variant="contained"
          color="error"
          sx={{ fontSize: "1.3rem" }}
          onClick={() => handlePayment(order_id)}>
          {status}
        </UIButton>
      )}
      {status == "Processing" && (
        <UIButton variant="outlined" color="error" sx={{ fontSize: "1.3rem" }}>
          {status}
        </UIButton>
      )}
      {status == "Paid" && (
        <UIButton variant="outlined" color="error" sx={{ fontSize: "1.3rem" }}>
          Installing..
        </UIButton>
      )}
      {status == "Finish" && (
        <UIButton variant="outlined" color="error" sx={{ fontSize: "1.3rem" }}>
          {status}
        </UIButton>
      )}
      {status == "StopOrder" && (
        <>
          <UIBox sx={{ display: "flex", flexDirection: "column" }}>
            <UITypography
              component="p"
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ fontSize: "1.5rem" }}>
              Order has been stopped
            </UITypography>
            <UIButton
              color="error"
              sx={{ fontSize: "1.3rem" }}
              onClick={showSurvey}>
              Delete order
            </UIButton>
          </UIBox>
        </>
      )}

      {/* <UIButton
        variant="outlined"
        color="error"
        sx={{ fontSize: "1.3rem" }}
        disabled>
        {status}
      </UIButton> */}
    </UIBox>
  );
}

export default Header;
