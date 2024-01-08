import { UIBox, UITypography } from "../../../../common";
import { Table, TableBody, TableRow } from "@mui/material";
import borders from "../../../../../assets/themes/private/base/borders";
import colors from "../../../../../assets/themes/private/base/colors";

export default function TableServices() {
  const { borderWidth } = borders;
  const { light } = colors;
  const borderBottom = `${borderWidth[1]} solid ${light.main}`;
  return (
    <UIBox p={1}>
      <UIBox width="100%" overflow="auto">
        <Table sx={{ minWidth: "32rem" }}>
          <UIBox component="thead">
            <TableRow>
              <UIBox
                component="th"
                width={{ xs: "45%", md: "30%" }}
                py={1.5}
                px={1}
                textAlign="left"
                borderBottom={borderBottom}>
                <UITypography variant="h4" color="text" fontWeight="medium">
                  Servcie
                </UITypography>
              </UIBox>
              <UIBox
                component="th"
                py={1.5}
                pl={3}
                pr={1}
                textAlign="left"
                borderBottom={borderBottom}>
                <UITypography variant="h4" color="text" fontWeight="medium">
                  Package
                </UITypography>
              </UIBox>
              <UIBox
                component="th"
                py={1.5}
                pl={3}
                pr={1}
                textAlign="left"
                borderBottom={borderBottom}>
                <UITypography variant="h4" color="text" fontWeight="medium">
                  Duration
                </UITypography>
              </UIBox>
              <UIBox
                component="th"
                py={1.5}
                pl={3}
                pr={1}
                textAlign="left"
                borderBottom={borderBottom}>
                <UITypography variant="h4" color="text" fontWeight="medium">
                  Deposit
                </UITypography>
              </UIBox>
              <UIBox
                component="th"
                py={1.5}
                pl={3}
                pr={1}
                textAlign="left"
                borderBottom={borderBottom}>
                <UITypography variant="h4" color="text" fontWeight="medium">
                  Amount
                </UITypography>
              </UIBox>
            </TableRow>
          </UIBox>
          <TableBody>
            <TableRow>
              <UIBox
                component="td"
                textAlign="left"
                p={1}
                borderBottom={borderBottom}>
                <UITypography
                  variant="body2"
                  color="text"
                  sx={{ fontSize: "1.2rem" }}>
                  Premium Support
                </UITypography>
              </UIBox>
              <UIBox
                component="td"
                textAlign="left"
                py={1}
                pr={1}
                pl={3}
                borderBottom={borderBottom}>
                <UITypography
                  variant="body2"
                  color="text"
                  sx={{ fontSize: "1.2rem" }}>
                  1
                </UITypography>
              </UIBox>
              <UIBox
                component="td"
                textAlign="left"
                py={1}
                pr={1}
                pl={3}
                borderBottom={borderBottom}>
                <UITypography
                  variant="body2"
                  color="text"
                  sx={{ fontSize: "1.2rem" }}>
                  $ 9.00
                </UITypography>
              </UIBox>
              <UIBox
                component="td"
                textAlign="left"
                py={1}
                pr={1}
                pl={3}
                borderBottom={borderBottom}>
                <UITypography
                  variant="body2"
                  color="text"
                  sx={{ fontSize: "1.2rem" }}>
                  $ 9.00
                </UITypography>
              </UIBox>
            </TableRow>
          </TableBody>
        </Table>
      </UIBox>
    </UIBox>
  );
}
