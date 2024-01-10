import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormCreateConnect from "./FormCreateProduct";
import { useEffect, useState } from "react";
import { axiosAuthentication } from "../../../../../../../http";
import { useDispatch, useSelector } from "react-redux";
import { useProduct } from "../../../../../../hooks/useProduct";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";

export default function ExportProduct() {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modalType);
  const info_user = useSelector((state) => state.user.info_user);
  const [listProduct, setListProduct] = useState(null);

  const handleListProduct = async () => {
    const urlC =
      "http://localhost:8000/api/ImportReceipt/check-pro-by-addressStore";

    const dataReq = {
      order_Id: modalType.value,
      address_Store_Id: info_user.address_store_id,
    };
    return await axiosAuthentication.post(urlC, dataReq).then(async (res) => {
      if (res.status == 200) {
        return res.data.map((item) => {
          return { label: item.name_product, value: item.product_id };
        });
      }
    });
  };

  useEffect(() => {
    handleListProduct().then((res) => setListProduct(res));
  }, []);

  let getData;
  const handleGetData = ({ productId }) => {
    getData = {
      productId,
    };
  };
  const handleSubmit = async () => {
    const data = {
      product_id: getData.productId,
      addressStore_id: info_user.address_store_id,
    };
    const status = await axiosAuthentication
      .put("http://localhost:8000/api/ImportReceipt/export_product", data)
      .then((res) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      });
    if (status) {
      await axiosAuthentication
        .put(
          `http://localhost:8000/api/Order/order-finish?OrderId=${modalType.value}`,
          data
        )
        .then((res) => {
          if (res.status == 200) {
            dispatch(setStatusModal());
            dispatch(setStatus(false));
            dispatch(setType(null));
            dispatch(setValue(null));
          }
        });
    }
  };
  return (
    <>
      {listProduct != null && (
        <UIBox mt={1} sx={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Card sx={{ overflow: "visible" }}>
                <UIBox p={2}>
                  <UIBox>
                    <FormCreateConnect
                      handleGetData={handleGetData}
                      listProduct={listProduct}
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
                        Export
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
