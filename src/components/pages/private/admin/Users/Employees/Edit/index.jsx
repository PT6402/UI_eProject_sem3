import { useEffect, useState } from "react";
import { UIBox, UIButton } from "../../../../../../common";
import { Card, Step, StepLabel, Stepper } from "@mui/material";
import Info from "./componentStep/Info";
import EmployeeType from "./componentStep/EmployeeType";
import AddressStore from "./componentStep/AddressStore";
import Confirm from "./componentStep/Confirm";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../../../../../../context/dataFormStep";
import { useNavigate, useParams } from "react-router-dom";
import { setDefaultRole } from "../../data";
import { convertCodeToRegion } from "../../../Address_store/data";
import { axiosAuthentication } from "../../../../../../../../http";
import { useEmployee } from "../../../../../../../hooks/useEmployee";
import { useAddressStore } from "../../../../../../../hooks/useAddressStore";
import Swal from "sweetalert2";

export default function EditEmployee() {
  useEffect(() => {
    dispatch(setValue({}));
  }, []);
  const { id: Id } = useParams();
  const { gets, isLoading, update } = useEmployee();
  const { gets: getAddressStores } = useAddressStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataEmployee, setDataEmployee] = useState(null);
  const dataFormStep = useSelector((state) => state.dataFormStep);

  const [employeeType, setEmployeeType] = useState();
  const [addresses, setAddress] = useState();
  const [employees, setEmployee] = useState();

  const handleCallApi = async () => {
    const url = "http://localhost:8000/api/EmployeeType";
    const { data: employee_types } = await axiosAuthentication.get(url);
    setEmployeeType(employee_types);
    await getAddressStores().then((res) => setAddress(res));
    await gets().then((res) => setEmployee(res));
  };

  useEffect(() => {
    handleCallApi();
  }, []);

  const handleGetDateEmploye = () => {
    if (employees != null) {
      const employee = employees.find(({ id }) => id == Id);
      const role = setDefaultRole({
        idType: employee.employee_type_id,
        employee_types: employeeType,
      });
      const employee_type = { id: role?.id, name: role?.name };
      const addressStore = addresses.find(
        ({ id }) => id == employee.address_store_id
      );
      const region = convertCodeToRegion(addressStore.phone_code);
      const region_selected = { label: region.name, value: region.id };
      const address_store = {
        label: addressStore.address_full,
        value: addressStore.id,
      };
      const dataGetEmploye = {
        phone: employee.phone,
        email: employee.email,
        fullName: employee.fullName,
        employee_type: employee_type,
        region_selected: region_selected,
        address_store: address_store,
      };
      // dispatch(
      //   setValue(dataGetEmploye)
      // );

      setDataEmployee(dataGetEmploye);
    }
  };
  useEffect(() => {
    handleGetDateEmploye();
  }, [employees]);
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
  const showAlert = async () =>
    Swal.fire("Good job!", "You updated this employee!", "success");
  const handleSubmit = async () => {
    const data = {
      id: Id,
      address_store_id: dataFormStep.value.address_store.value,
      email: dataFormStep.value.email,
      phone: dataFormStep.value.phone,
      fullName: dataFormStep.value.fullName,
      employee_type_id: dataFormStep.value.employee_type.id,
    };
    await update({ data }).then(async () => await showAlert());
    navigate("/admin/users/employees/list");
    dispatch(setValue({}));
  };
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Info getInfo={getInfo} getData={dataEmployee} />;
      case 1:
        return (
          <EmployeeType
            getEmployeeType={getEmployeeType}
            getData={dataEmployee}
            employeeType={employeeType}
          />
        );
      case 2:
        return (
          <AddressStore
            getAddressStore={getAddressStore}
            getData={dataEmployee}
            addresses={addresses}
          />
        );
      case 3:
        return <Confirm setActiveStep={setActiveStep} getData={dataEmployee} />;
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
    <>
      {!isLoading && dataEmployee != null && (
        <UIBox pb={2} sx={() => ({ width: "100%" })}>
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
                    <UIButton
                      variant="gradient"
                      color="light"
                      onClick={handleBack}>
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
        </UIBox>
      )}
    </>
  );
}
