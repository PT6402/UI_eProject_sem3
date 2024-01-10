import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FormProduct from "./FormProduct";
import { axiosAuthentication } from "../../../../../../../http";
import { useEffect, useState } from "react";
import { useProduct } from "../../../../../../hooks/useProduct";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";
import Swal from "sweetalert2";

export default function Detail_Product() {
  const info_user = useSelector((state) => state.user.info_user);
  const dispatch = useDispatch();
  const [listProduct, setListProduct] = useState(null);
  const { gets_AddressStore, update } = useProduct();
  const modalType = useSelector((state) => state.modalType);

  const handleCallApi = async () => {
    await gets_AddressStore().then((res) => setListProduct(res));
  };
  useEffect(() => {
    handleCallApi();
  }, [modalType.statusModal]);

  const handleGetById = (Id) => {
    if (Id != null && listProduct != null) {
      const item = listProduct.find(({ id }) => id == Id);
      return item;
    }
  };
  let getData;
  const handleGetData = ({ quantityPlus }) => {
    getData = {
      id: modalType.value,
      quantityPlus,
    };
  };
  const showAlert = async () =>
    Swal.fire("Success!", "Import success!", "success");
  const handleSubmit = async () => {
    const data = {
      product_id: getData.id,
      quantity_product: getData.quantityPlus,
      status: "Done_Import",
      addressStore_id: info_user.address_store_id,
    };

    await axiosAuthentication
      .put("http://localhost:8000/api/ImportReceipt", data)
      .then(async (res) => {
        if (res.status == 200) {
          dispatch(setStatusModal());
          dispatch(setStatus(false));
          dispatch(setType(null));
          dispatch(setValue(null));
          await showAlert();
        }
      });
  };
  return (
    <>
      {/* {isLoading && <Loader />} */}
      {listProduct != null && (
        <UIBox mt={1} sx={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Card sx={{ overflow: "visible" }}>
                <UIBox p={2}>
                  <UIBox>
                    <FormProduct
                      data={handleGetById(modalType.value)}
                      handleGetData={handleGetData}
                    />
                    <UIBox
                      mt={3}
                      width="100%"
                      display="flex"
                      justifyContent="flex-end">
                      <UIButton
                        variant="gradient"
                        color="dark"
                        onClick={handleSubmit}>
                        Import
                      </UIButton>
                    </UIBox>
                  </UIBox>
                </UIBox>
              </Card>
            </Grid>
          </Grid>
        </UIBox>
      )}
    </>
  );
}
