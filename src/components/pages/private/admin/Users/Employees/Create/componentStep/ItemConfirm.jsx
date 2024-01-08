/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { UIBox, UIButton, UITypography } from "../../../../../../../common";
import { Icon } from "@mui/material";

export default function ItemConfirm({ noGutter, handleEditStep, ...rest }) {
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
            <UIButton
              variant="text"
              color="dark"
              onClick={() => handleEditStep(rest.id)}>
              <Icon>edit</Icon>&nbsp;edit
            </UIButton>
          </UIBox>
        </UIBox>
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
        {rest?.type && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Type:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.type}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
        {rest?.region && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Region:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.region}
              </UITypography>
            </UITypography>
          </UIBox>
        )}

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
        {rest?.addressStore && (
          <UIBox mb={1} lineHeight={0}>
            <UITypography variant="caption" color="text">
              Address:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                textTransform="capitalize">
                {rest.addressStore}
              </UITypography>
            </UITypography>
          </UIBox>
        )}
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
      </UIBox>
    </UIBox>
  );
}
