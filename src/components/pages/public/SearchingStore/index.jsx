import { Card, Grid } from "@mui/material";
import FrameUI from "../../../../helpers/FrameUI";
import HeaderSearching from "./HeaderSearching";
import styles from "./index.module.scss";
import { UIBox, UISelect, UITypography } from "../../../common";
import ItemStore from "./ItemStore";
import { useEffect, useState } from "react";
import { useAddressStore } from "../../../../hooks/useAddressStore";
import {
  convertCodeToRegion,
  listPhoneCode,
} from "../../private/admin/Address_store/data";
export default function SearchingStore() {
  const [selectRegion, setSelectRegion] = useState({
    value: null,
    label: null,
  });
  const { gets } = useAddressStore();
  const [addressStore, setAddressStore] = useState(null);
  const [addressShow, setAddressShow] = useState(null);
  const handleGetAddress = async () => {
    await gets().then((res) => setAddressStore(res));
  };
  const handleListRegion = () => {
    if (addressStore != null) {
      const listRegion = [];
      listPhoneCode.map((item) => {
        if (
          addressStore.filter(
            ({ phone_code }) => convertCodeToRegion(phone_code).id == item.id
          ).length > 0
        ) {
          return listRegion.push({ label: item.name, value: item.id });
        }
      });
      return listRegion;
    }
    return [];
  };
  useEffect(() => {
    handleGetAddress();
  }, []);
  const handleFilterRegion = () => {
    if (addressStore != null) {
      if (selectRegion.value == null) {
        setAddressShow(addressStore);
      } else {
        const dataFilter = addressStore.filter(
          ({ region_id }) => region_id == selectRegion.value
        );
        setAddressShow(dataFilter);
      }
    }
  };

  useEffect(() => {
    handleFilterRegion();
  }, [selectRegion.value, addressStore]);
  console.log(addressShow);
  return (
    <>
      {addressShow != null && (
        <FrameUI>
          <section>
            <div className={`${styles.container} main-container`}>
              <div className={styles.welcome_wrapper}>
                <HeaderSearching />
              </div>
              <UIBox
                width={"100%"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}>
                <UIBox sx={{ display: "flex", justifyContent: "center" }}>
                  <Grid container spacing={2} justifyContent={"center"}>
                    <Grid item xs={12} sm={6} lg={3}>
                      <Card
                        sx={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          overflow: "visible",
                        }}>
                        <UIBox
                          p={2}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "1rem",
                          }}>
                          <UITypography sx={{ fontWeight: "bold" }}>
                            Region:
                          </UITypography>
                          <UISelect
                            custom
                            size={"large"}
                            options={handleListRegion()}
                            onChange={(choice) => {
                              return setSelectRegion(choice);
                            }}
                          />
                        </UIBox>
                      </Card>
                    </Grid>
                  </Grid>
                </UIBox>

                <UIBox pt={3} width={"100%"}>
                  <Grid
                    container
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={1}>
                    {addressShow.map((item) => {
                      return (
                        <div key={item.id}>
                          <Grid
                            item
                            xs={12}
                            md={12}
                            lg={9}
                            xl={7}
                            width={"100%"}>
                            <ItemStore
                              address_store={item.address_full}
                              phone={"123112341234"}
                            />
                          </Grid>
                        </div>
                      );
                    })}
                  </Grid>
                </UIBox>
              </UIBox>
            </div>
          </section>
        </FrameUI>
      )}
    </>
  );
}
