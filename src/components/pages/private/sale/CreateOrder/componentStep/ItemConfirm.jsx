/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Icon } from "@mui/material";
import { UIBox, UIButton, UITypography } from "../../../../../common";

export default function ItemConfirm({
  noGutter,
  handleEditStep,
  noEdit,
  ...rest
}) {
  return (
    <UIBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={1}>
      <UIBox width="100%" display="flex" flexDirection="column">
        <UIBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}>
          <UITypography
            variant="button"
            fontWeight="medium"
            textTransform="capitalize">
            {rest?.name}
          </UITypography>

          <UIBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}>
            {!noEdit && (
              <UIButton
                variant="text"
                color="dark"
                onClick={() => handleEditStep(rest.id)}>
                <Icon>edit</Icon>&nbsp;edit
              </UIButton>
            )}
          </UIBox>
        </UIBox>
        {/* 1 */}
        {rest?.fullName && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              FullName:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.fullName}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {rest?.address && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Address:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.address}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {rest?.typeConnect && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Type connect:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.typeConnect}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {/* 2 */}
        {rest?.email && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Email:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.email}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {rest?.province && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Province:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.province}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {rest?.package && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Package:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.package}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {/* 3 */}
        {rest?.phone && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Phone:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.phone}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {rest?.district && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              District:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.district}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {rest?.time && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              District:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.time}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {/* 4 */}
        {rest?.ward && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Ward:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.ward}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {rest?.price && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Price:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.price}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
      </UIBox>
    </UIBox>
  );
}
