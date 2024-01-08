import { useEffect, useState } from "react";
import { UIBox, UIButton } from "../../../../../../common";
import { Card, Step, StepLabel, Stepper } from "@mui/material";
import Info from "./componentStep/Info";
import EmployeeType from "./componentStep/EmployeeType";
import AddressStore from "./componentStep/AddressStore";
import Confirm from "./componentStep/Confirm";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../../../../../../context/dataFormStep";
import { useNavigate } from "react-router-dom";
import { axiosAuthentication } from "../../../../../../../../http";
import { useEmployee } from "../../../../../../../hooks/useEmployee";
import { useAddressStore } from "../../../../../../../hooks/useAddressStore";

export default function CreateEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { create } = useEmployee();
  const { gets: getAddressStores } = useAddressStore();
  const [employeeType, setEmployeeType] = useState();
  const [addresses, setAddress] = useState();

  const dataFormStep = useSelector((state) => state.dataFormStep);
  useEffect(() => {
    dispatch(setValue({}));
  }, []);

  const handleCallApi = async () => {
    const url = "http://localhost:8000/api/EmployeeType";
    const { data: employee_types } = await axiosAuthentication.get(url);
    setEmployeeType(employee_types);
    await getAddressStores().then((res) => setAddress(res));
  };

  useEffect(() => {
    handleCallApi();
  }, []);

  function getSteps() {
    return ["Info Employee", "Type Employee", "Address store", "Confirm"];
  }
  let dataStep;
  const getInfo = ({ email, phone, fullName }) => {
    dataStep = { ...dataFormStep.value, email, phone, fullName };
    // setData((prev) => ({...prev,email,phone,fullName}))
  };
  const getEmployeeType = ({ employee_type }) => {
    dataStep = { ...dataFormStep.value, employee_type };
    // setData((prev) => ({...prev,employee_type_id}))
  };

  const getAddressStore = ({ address_store, region_selected }) => {
    dataStep = {
      ...dataFormStep.value,
      address_store,
      region_selected,
    };
    // setData((prev) => ({...prev,address_store_id}))
  };
  const handleSubmit = async () => {
    const data = {
      fullName: dataFormStep.value.fullName,
      phone: dataFormStep.value.phone,
      email: dataFormStep.value.email,
      employee_type_id: dataFormStep.value.employee_type.id,
      address_store_id: dataFormStep.value.address_store.value,
    };

    await create({ data });
    navigate("/admin/users/employees/list");
    dispatch(setValue({}));
  };
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Info getInfo={getInfo} />;
      case 1:
        return (
          <EmployeeType
            getEmployeeType={getEmployeeType}
            employeeType={employeeType}
          />
        );
      case 2:
        return (
          <AddressStore
            getAddressStore={getAddressStore}
            addresses={addresses}
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
    dispatch(setValue(dataStep));
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => setActiveStep(activeStep - 1);
  return (
    <UIBox pb={2} sx={() => ({ width: "100%" })}>
      {/* <Grid container>
        <Grid item xl={12}> */}

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Card sx={() => ({ overflow: "visible" })}>
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
                <UIButton variant="gradient" color="light" onClick={handleBack}>
                  back
                </UIButton>
              )}
              <UIButton
                variant="gradient"
                color="dark"
                onClick={!isLastStep ? handleNext : handleSubmit}>
                {isLastStep ? "send" : "next"}
              </UIButton>
            </UIBox>
          </UIBox>
        </UIBox>
      </Card>
      {/* </Grid>
      </Grid> */}
    </UIBox>
  );
}
