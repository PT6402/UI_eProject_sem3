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

export default function Detail_Product() {
  const dispatch = useDispatch();
  const [listConnect, setListConnect] = useState(null);
  const [listSupplier, setlListSupplier] = useState(null);
  const [listProduct, setListProduct] = useState(null);
  const { gets, update } = useProduct();
  const modalType = useSelector((state) => state.modalType);
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
  const handleCallApi = async () => {
    await gets().then((res) => setListProduct(res));
  };
  useEffect(() => {
    handleCallApi();
    handleListConnect().then((res) => setListConnect(res));
    handleListSupplier().then((res) => setlListSupplier(res));
  }, []);

  const handleGetById = (Id) => {
    if (Id != null && listSupplier != null && listConnect != null) {
      const item = listProduct.find(({ id }) => id == Id);
      const supl = listSupplier.find(({ value }) => value == item.supplier_id);
      const contc = listConnect.find(
        ({ value }) => value == item.connect_type_id
      );
      item.supplier = supl;
      item.connect_type = contc;
      return item;
    }
  };
  let getData;
  const handleGetData = ({ name, numbConnect, connectType, supplier }) => {
    getData = {
      id: modalType.value,
      name,
      numbConnect,
      connectType,
      supplier,
    };
  };
  const handleSubmit = async () => {
    const data = {
      id: getData.id,
      name: getData.name,
      numb_connect: getData.numbConnect,
      connect_type_id: getData.connectType.value,
      supplier_id: getData.supplier.value,
    };
    await update({ data });
    dispatch(setStatusModal());
    dispatch(setStatus(false));
    dispatch(setType(null));
    dispatch(setValue(null));
  };
  return (
    <>
      {/* {isLoading && <Loader />} */}
      {listProduct != null && listSupplier != null && listConnect != null && (
        <UIBox mt={1}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Card sx={{ overflow: "visible" }}>
                <UIBox p={2}>
                  <UIBox>
                    <FormProduct
                      data={handleGetById(modalType.value)}
                      handleGetData={handleGetData}
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
                        Update
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
