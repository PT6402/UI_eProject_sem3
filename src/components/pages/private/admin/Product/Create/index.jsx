import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormCreateConnect from "./FormCreateProduct";
import { useEffect, useState } from "react";
import { axiosAuthentication } from "../../../../../../../http";
import { useDispatch } from "react-redux";
import { useProduct } from "../../../../../../hooks/useProduct";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const { create } = useProduct();
  const [listConnect, setListConnect] = useState(null);
  const [listSupplier, setlListSupplier] = useState(null);
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
  }, []);
  let getData;
  const handleGetData = ({ name, numbConnect, connectType, supplier }) => {
    getData = { name, numbConnect, connectType, supplier };
  };
  const handleSubmit = async () => {
    const data = {
      name: `${getData.name}`,
      numb_connect: `${getData.numbConnect}`,
      connect_type_id: `${getData.connectType.value}`,
      supplier_id: `${getData.supplier.value}`,
    };
    await create({ data });
    dispatch(setStatusModal());
    dispatch(setStatus(false));
    dispatch(setType(null));
    dispatch(setValue(null));
  };
  return (
    <>
      {listSupplier != null && listConnect != null && (
        <UIBox mt={1}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Card sx={{ overflow: "visible" }}>
                <UIBox p={2}>
                  <UIBox>
                    <FormCreateConnect
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
                        Create
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
