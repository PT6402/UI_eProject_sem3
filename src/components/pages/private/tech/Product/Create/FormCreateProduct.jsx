/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UIBox, UISelect, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "../Detail/FormField";

export default function FormCreateProduct({
  handleGetData,
  listProduct,
  listSupplier,
  listConnect,
}) {
  const [quantity, setQuantity] = useState(0);
  const [productSelected, setProductSelected] = useState(null);
  const [dataByProduct, setDataByProduct] = useState(null);
  const [listProductSelect, setListProductSelect] = useState();
  useEffect(() => {
    if (productSelected?.value != null) {
      handleGetData({
        quantity,
        productSelected,
      });
    }
  }, [quantity, productSelected]);

  useEffect(() => {
    if (
      listSupplier != null &&
      listProduct != null &&
      listConnect != null &&
      productSelected != null
    ) {
      const nameSupplier = listSupplier.find(
        ({ value }) => value == productSelected.other.supplier_id
      );
      const nameConnect = listConnect.find(
        ({ value }) => value == productSelected.other.connect_type_id
      );

      setDataByProduct({
        nameConnect,
        nameSupplier,
        numbConnect: productSelected?.other.numb_connect,
      });
    }
  }, [productSelected]);
  useEffect(() => {
    setListProductSelect(() => {
      return listProduct.map((item) => ({
        value: item.id,
        label: item.name,
        other: item,
      }));
    });
  }, []);

  return (
    <UIBox>
      <UITypography variant="h5">Import</UITypography>
      <UIBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <UIBox
              mb={1}
              ml={0.5}
              lineHeight={0}
              display="inline-block"
              sx={{ width: "100%" }}>
              <UITypography
                component="label"
                variant="caption"
                fontWeight="bold">
                Product
              </UITypography>
            </UIBox>
            <UISelect
              placeholder={"select product"}
              options={listProductSelect}
              onChange={(choice) => setProductSelected(choice)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Quantity"
              placeholder={"enter quantity"}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              type="text"
              label="Supplier"
              disabled
              value={dataByProduct?.nameSupplier?.label}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              type="text"
              label="number connect"
              value={dataByProduct?.numbConnect}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              type="text"
              label="connect type"
              value={dataByProduct?.nameConnect?.label}
              disabled
            />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
