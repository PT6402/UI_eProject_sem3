import { useEffect, useState } from "react";
import { UIBox, UIButton } from "../../../common";
import { Card, Step, StepLabel, Stepper } from "@mui/material";
import Info from "./componentStep/Info";

import AddressStore from "./componentStep/AddressStore";
import Confirm from "./componentStep/Confirm";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../../../context/dataFormStep";
import { useNavigate, useParams } from "react-router-dom";
import FrameUI from "../../../../helpers/FrameUI";
import styles from "./index.module.scss";
import { usePackage } from "../../../../hooks/usePackage";
import { useConnect } from "../../../../hooks/useConnect";
import {
  convertCodeToRegion,
  handleGetRowAddresUser,
} from "../../private/admin/Address_store/data";
import { useAddressStore } from "../../../../hooks/useAddressStore";
import { CompareAddress } from "../../../../helpers/Matrix Distance/Api";
import InfoService from "./componentStep/InfoService";
import { useOrder } from "../../../../hooks/useOrder";
export default function CreateOrder() {
  const navigate = useNavigate();
  const { id: Id } = useParams();
  const { gets } = usePackage();
  const { gets: connectType } = useConnect();
  const { create: orderCall } = useOrder();
  const { gets: addressStore } = useAddressStore();
  const dispatch = useDispatch();
  const [addressFind, setAddressFind] = useState(null);
  const [addressShort, setAddressShort] = useState(null);
  const [duration, setDuration] = useState();
  const [addressStores, setAddressStore] = useState(null);
  const info_user = useSelector((state) => state.user.info_user);
  const dataFormStep = useSelector((state) => state.dataFormStep);
  const handleGetDuration = async () => {
    const connect = await connectType();
    await gets().then((res) => {
      let info_duration;
      const pack_id = res.durations.find(({ id }) => id == Id).package_id;
      const pack = res.packages.find(({ package_id }) => package_id == pack_id);
      const nameConnect = connect.find(({ id }) => id == pack.connect_type_id);
      info_duration = {
        duration: res.durations.find(({ id }) => id == Id),
        name_package: pack.namePackage,
        name_connect: nameConnect.name,
        id_connect: nameConnect.id,
        deposit_connect: nameConnect.deposit,
      };
      setDuration(info_duration);
    });
  };
  useEffect(() => {
    dispatch(setValue({}));
  }, []);
  useEffect(() => {
    handleGetDuration();
  }, []);
  let dataStep;

  function getSteps() {
    return ["Info", "Address", "Info Service", "Confirm"];
  }

  const getInfo = ({ email, phone, fullName }) => {
    dataStep = {
      ...dataFormStep.value,
      email,
      phone,
      fullName,
      duration: duration,
    };
  };
  const getInfoServices = ({ totalPrice, numbConnect, couponCheck }) => {
    dataStep = {
      ...dataFormStep.value,
      totalPrice,
      numbConnect,
      couponCheck,
    };
  };

  const getAddressStore = ({
    address,
    province_code,
    district_code,
    ward_code,
    phone_code,
    p_d_w,
  }) => {
    dataStep = {
      ...dataFormStep.value,
      address,
      province_code,
      district_code,
      ward_code,
      phone_code,
      p_d_w,
      duration: duration,
    };
  };
  const handleSubmit = async () => {
    const data = {
      total_Price: dataFormStep.value?.totalPrice,
      numb_Connect: dataFormStep.value?.numbConnect,
      coupon_Id: dataFormStep.value?.couponCheck?.id,
      duration_Id: dataFormStep.value?.duration.duration?.id,
      user_Id: info_user?.userId,
      address_store_Id: dataFormStep.value?.addressShort.id,
      address_full: dataFormStep.value?.address,
      phone_code: `${dataFormStep.value?.p_d_w.provice.value.phone_code}`,
      province_code: `${dataFormStep.value?.p_d_w.provice.value.code}`,
      district_code: `${dataFormStep.value?.p_d_w.district.value}`,
      ward_code: `${dataFormStep.value?.p_d_w.ward.value}`,
    };
    console.log(data);
    await orderCall({ data });
    navigate(`/page-services/${dataFormStep.value?.duration?.id_connect}`);
    dispatch(setValue({}));
  };
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Info getInfo={getInfo} />;
      case 1:
        return (
          <AddressStore
            getAddressStore={getAddressStore}
            // addresses={addresses}
          />
        );
      case 2:
        return (
          <InfoService
            getInfoServices={getInfoServices}
            // addresses={addresses}
          />
        );
      case 3:
        return <Confirm setActiveStep={setActiveStep} />;
      default:
        return null;
    }
  }
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (dataStep == undefined) {
      dataStep = {
        email: info_user.email,
        phone: info_user.phone,
        fullName: info_user.fullName,
        duration: duration,
      };
      dispatch(setValue(dataStep));
      setActiveStep(activeStep + 1);
    } else {
      dispatch(setValue(dataStep));
      setActiveStep(activeStep + 1);
    }
  };
  const handleCallAddressStore = async () => {
    await addressStore().then((res) => setAddressStore(res));
  };
  useEffect(() => {
    handleCallAddressStore();
  }, []);
  const handleBack = () => setActiveStep(activeStep - 1);
  const handleFindAddressStore = async () => {
    if (
      dataFormStep.value?.phone_code &&
      addressStores &&
      dataFormStep.value?.address
    ) {
      const phoneCodeUser = dataFormStep.value.phone_code;
      const addressUser = dataFormStep.value.address;
      const region = convertCodeToRegion(phoneCodeUser);
      const listAddressCompare = addressStores
        .filter(({ region_id }) => region_id == region.id)
        .map((item) => ({ address: item.address_full, id: item.id }));
      console.log("check before compare", listAddressCompare);
      return await CompareAddress(addressUser, listAddressCompare).then((res) =>
        setAddressFind(res)
      );
    }
  };

  useEffect(() => {
    console.log("check top");
    if (addressFind != null) {
      console.log("check first");
      const phoneCodeUser = dataFormStep.value.phone_code;
      const region = convertCodeToRegion(phoneCodeUser);
      const listAddressCompare = addressStores
        .filter(({ region_id }) => region_id == region.id)
        .map((item) => ({
          address: item.address_full,
          id: item.id,
          origin_address: { ...item },
        }));
      const arrChenk = [];

      addressFind.data.map((x) => arrChenk.push(x.distance.value));
      console.log(arrChenk, addressFind, listAddressCompare);
      if (arrChenk.length != 1) {
        console.log("result:!=1");
        const valueShortest = Math.min(...arrChenk);
        const addressShortest = arrChenk.findIndex(
          (value) => value == valueShortest
        );
        setAddressShort(
          // listAddressCompare.find(({ id }) => id == addressShortest)
          listAddressCompare[addressShortest]
        );
        dispatch(
          setValue({
            ...dataFormStep.value,
            addressShort: listAddressCompare[addressShortest],
          })
        );
        console.log(listAddressCompare[addressShortest], addressShortest);
        return;
      } else {
        console.log("result:==1");
        // addressFind.listOrigin[1].id;
        const addSort = listAddressCompare.find(
          ({ id }) => id == addressFind.listOrigin[1].id
        );
        console.log("==1", addSort, listAddressCompare, addressFind);
        dispatch(setValue({ ...dataFormStep.value, addressShort: addSort }));
        setAddressShort(addSort);
        return;
      }
    }
  }, [addressFind]);
  const handleGetNameAddressStore = async () => {
    if (addressShort != null) {
      console.log("test get name ");
      const data = {
        province_code: addressShort.origin_address.province_code,
        district_code: addressShort.origin_address.district_code,
        ward_code: addressShort.origin_address.ward_code,
      };
      await handleGetRowAddresUser(data).then((res) => {
        dispatch(setValue({ ...dataFormStep.value, info_address_store: res }));
      });
    }
  };
  useEffect(() => {
    handleGetNameAddressStore();
  }, [addressShort, addressFind]);
  console.log(addressShort);
  return (
    <>
      <section className={styles.section} style={{ zIndex: "-1 !important" }}>
        <div
          className={`${styles.container} main-container`}
          style={{ zindex: "-1 !important" }}>
          <FrameUI>
            <UIBox pb={2} sx={() => ({ width: "100%" })}>
              <UIBox sx={{ zIndex: "-1 !important" }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </UIBox>
              <Card
                sx={() => ({
                  overflow: "visible",
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                })}>
                <UIBox p={2}>
                  <UIBox>
                    {getStepContent(activeStep)}
                    <UIBox
                      mt={3}
                      width="100%"
                      display="flex"
                      justifyContent="space-between">
                      {activeStep === 0 ? (
                        <UIBox />
                      ) : (
                        <UIButton
                          variant="gradient"
                          color="light"
                          onClick={handleBack}>
                          back
                        </UIButton>
                      )}
                      {!dataFormStep.value?.addressShort?.id ? (
                        <UIButton
                          variant="gradient"
                          color="dark"
                          onClick={
                            !isLastStep ? handleNext : handleFindAddressStore
                          }>
                          {isLastStep ? "find address store" : "next"}
                        </UIButton>
                      ) : (
                        <UIButton
                          variant="gradient"
                          color="dark"
                          onClick={handleSubmit}>
                          Submit
                        </UIButton>
                      )}
                    </UIBox>
                  </UIBox>
                </UIBox>
              </Card>
            </UIBox>
          </FrameUI>
        </div>
      </section>
    </>
  );
}
