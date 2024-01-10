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
import Swal from "sweetalert2";

export default function CreateProduct() {
  const modalType = useSelector((state) => state.modalType);
  const info_user = useSelector((state) => state.user.info_user);
  const dispatch = useDispatch();
  const { create } = useProduct();
  const [listProduct, setListProduct] = useState(null);
  const [listSupplier, setlListSupplier] = useState(null);
  const [listConnect, setListConnect] = useState(null);
  const handleListConnect = async () => {
    const urlC = "http://localhost:8000/api/ConnectType";
    let dataConnectType;
    await axiosAuthentication.get(urlC).then(async (res) => {
      if (res.status == 200) {
        dataConnectType = res.data.map((item) => {
          const { brandName, ...rest } = item;
          const newItem = rest;
          newItem.brand_name = brandName;
          return newItem;
        });
      }
    });
    return dataConnectType.map((item) => {
      return { label: item.name, value: item.id };
    });
  };
  const handleListSupplier = async () => {
    const urlS = "http://localhost:8000/api/Supplier";
    let dataSuplier;
    await axiosAuthentication.get(urlS).then(async (res) => {
      if (res.status == 200) {
        dataSuplier = res.data.map((item) => {
          const { brandName, ...rest } = item;
          const newItem = rest;
          newItem.brand_name = brandName;
          return newItem;
        });
      }
    });
    return dataSuplier.map((item) => {
      return { label: item.brand_name, value: item.id };
    });
  };
  useEffect(() => {
    handleListConnect().then((res) => setListConnect(res));
    handleListSupplier().then((res) => setlListSupplier(res));
    setListProduct(modalType.value);
  }, []);

  let getData;
  const handleGetData = ({ quantity, productSelected }) => {
    getData = {
      quantity,
      productSelected,
    };
  };
  const showAlert = async () =>
    Swal.fire("Success!", "Import success!", "success");
  const handleSubmit = async () => {
    const data = {
      product_id: getData.productSelected.value,
      quantity_product: getData.quantity,
      addressStore_id: info_user.address_store_id,
      status: "Import New",
    };
    await axiosAuthentication
      .post("http://localhost:8000/api/ImportReceipt", data)
      .then((res) => {
        if (res.status == 200) {
          dispatch(setStatusModal());
          dispatch(setStatus(false));
          dispatch(setType(null));
          dispatch(setValue(null));
        }
      });
    await showAlert();
  };
  return (
    <>
      {listSupplier != null && listProduct != null && listConnect != null && (
        <UIBox mt={1} sx={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Card sx={{ overflow: "visible" }}>
                <UIBox p={2}>
                  <UIBox>
                    <FormCreateConnect
                      handleGetData={handleGetData}
                      listProduct={listProduct}
                      listSupplier={listSupplier}
                      listConnect={listConnect}
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
