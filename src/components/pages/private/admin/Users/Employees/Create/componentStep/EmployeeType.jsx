/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UIBox, UIButton, UITypography } from "../../../../../../../common";
import { Grid } from "@mui/material";
import Cube from "../../../../../../../models/private/Icons/Cube";
import { useSelector } from "react-redux";

export default function EmployeeType({
  getEmployeeType,
  employeeType: employee_types,
}) {
  const dataFormStep = useSelector((state) => state.dataFormStep);
  const [employeeType, setEmployeeType] = useState({
    id: dataFormStep.value?.employee_type?.id || null,
    name: dataFormStep.value?.employee_type?.name,
  });
  useEffect(() => {
    getEmployeeType({ employee_type: employeeType });
  }, [employeeType]);
  const customButtonStyles = ({
    functions: { pxToRem, rgba },
    borders: { borderWidth },
    palette: { transparent, dark, secondary },
  }) => ({
    width: pxToRem(150),
    height: pxToRem(120),
    borderWidth: borderWidth[2],
    mb: 1,
    ml: 0.5,

    "&.MuiButton-contained, &.MuiButton-contained:hover": {
      boxShadow: "none",
      border: `${borderWidth[2]} solid ${transparent.main}`,
    },

    "&:hover": {
      backgroundColor: `${transparent.main} !important`,
      border: `${borderWidth[2]} solid ${secondary.main} !important`,

      "& svg g": {
        fill: rgba(dark.main, 0.75),
      },
    },
  });
  return (
    <UIBox>
      <UIBox width="80%" textAlign="center" mx="auto" mb={4}>
        <UIBox mb={1}>
          <UITypography variant="h5" fontWeight="regular">
            What are type employee ?
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox mt={2}>
        <Grid container spacing={2} justifyContent="center">
          {employee_types.map((item) => {
            return (
              <Grid key={item.id} item md={3} xs={12}>
                <UIBox textAlign="center">
                  <UIButton
                    color="secondary"
                    variant={
                      employeeType.id == item.id ? "contained" : "outlined"
                    }
                    onClick={() =>
                      setEmployeeType({ id: item.id, name: item.name })
                    }
                    sx={customButtonStyles}>
                    <Cube
                      size="24px"
                      color={employeeType.id == item.id ? "white" : "dark"}
                    />
                  </UIButton>
                  <UITypography variant="h6">{item.name}</UITypography>
                </UIBox>
              </Grid>
            );
          })}
        </Grid>
      </UIBox>
    </UIBox>
  );
}
