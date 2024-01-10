/* eslint-disable react/prop-types */
import FrameUI from "../../../../helpers/FrameUI";
import { UIBox, UIButton, UITypography } from "../../../common";
import { Card, Grid, Table, TableBody, TableRow } from "@mui/material";
import borders from "../../../../assets/themes/private/base/borders";
import colors from "../../../../assets/themes/private/base/colors";
import { Link } from "react-router-dom";
export default function Invoice({ orderDetail }) {
  const { borderWidth } = borders;
  const { light } = colors;
  const borderBottom = `${borderWidth[1]} solid ${light.main}`;
  const back_page = localStorage.getItem("back_page");
  function formatNgayThangNam(chuoiNgay) {
    let ngayGoc = new Date(chuoiNgay);
    let ngay = ngayGoc.getDate();
    let thang = ngayGoc.getMonth() + 1;
    let nam = ngayGoc.getFullYear();
    let ngayMoiFormat =
      ngay.toString().padStart(2, "0") +
      "/" +
      thang.toString().padStart(2, "0") +
      "/" +
      nam.toString();
    return ngayMoiFormat;
  }
  return (
    <>
      <FrameUI>
        <UIBox mt={{ xs: 4, md: 10 }} mb={{ xs: 4, md: 8 }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
              <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
                {/* Invoice header */}
                <UIBox p={3}>
                  <UIBox>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={12} md={4}>
                        <UITypography
                          variant="h6"
                          color="secondary"
                          fontWeight="medium">
                          Invoice no
                        </UITypography>
                        <UITypography variant="h5" fontWeight="medium">
                          {orderDetail.orderId}
                        </UITypography>
                      </Grid>
                      <Grid item xs={12} md={7} lg={5}>
                        <UIBox
                          width="100%"
                          display="flex"
                          flexDirection={{ xs: "column", md: "row" }}
                          alignItems={{ xs: "flex-start", md: "center" }}
                          textAlign={{ xs: "left", md: "right" }}
                          mt={{ xs: 3, md: 0 }}>
                          <UIBox width="50%">
                            <UITypography
                              variant="h6"
                              color="secondary"
                              fontWeight="medium">
                              Invoice date:
                            </UITypography>
                          </UIBox>
                          <UIBox width="50%">
                            <UITypography variant="h6" fontWeight="medium">
                              {formatNgayThangNam(orderDetail.createdDate)}
                            </UITypography>
                          </UIBox>
                        </UIBox>
                      </Grid>
                    </Grid>
                  </UIBox>
                </UIBox>

                {/* Invoice table */}
                <UIBox p={3}>
                  <UIBox width="100%" overflow="auto">
                    <Table sx={{ minWidth: "32rem" }}>
                      <UIBox component="thead">
                        <TableRow>
                          <UIBox
                            component="th"
                            width={{ xs: "45%", md: "50%" }}
                            py={1.5}
                            px={1}
                            textAlign="left"
                            borderBottom={borderBottom}>
                            <UITypography
                              variant="h6"
                              color="text"
                              fontWeight="medium">
                              Connect Service
                            </UITypography>
                          </UIBox>
                          <UIBox
                            component="th"
                            py={1.5}
                            pl={3}
                            pr={1}
                            textAlign="left"
                            borderBottom={borderBottom}>
                            <UITypography
                              variant="h6"
                              color="text"
                              fontWeight="medium">
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
                            <UITypography variant="body2" color="text">
                              {orderDetail.connectTypeName}
                            </UITypography>
                          </UIBox>

                          <UIBox
                            component="td"
                            textAlign="left"
                            py={1}
                            pr={1}
                            pl={3}
                            borderBottom={borderBottom}>
                            <UITypography variant="body2" color="text">
                              {orderDetail.totalPrice}$
                            </UITypography>
                          </UIBox>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </UIBox>
                </UIBox>

                {/* Invoice footer */}
                <UIBox p={3} mt={7}>
                  <Grid container>
                    <Grid item xs={12} lg={5}>
                      <UITypography variant="h5" fontWeight="medium">
                        Thank you!
                      </UITypography>
                      <UIBox mt={1} mb={2} lineHeight={0}>
                        <UITypography
                          variant="button"
                          fontWeight="regular"
                          color="secondary">
                          If you encounter any issues related to the invoice you
                          can contact us
                        </UITypography>
                      </UIBox>
                    </Grid>
                    <Grid item xs={12} lg={7}>
                      <UIBox
                        width="100%"
                        height={{ xs: "auto", md: "100%" }}
                        display="flex"
                        justifyContent={{ xs: "flex-start", md: "flex-end" }}
                        alignItems="flex-end"
                        mt={{ xs: 2, md: 0 }}>
                        <Link to={back_page}>
                          <UIButton variant="gradient" color="info">
                            Back
                          </UIButton>
                        </Link>
                      </UIBox>
                    </Grid>
                  </Grid>
                </UIBox>
              </Card>
            </Grid>
          </Grid>
        </UIBox>
      </FrameUI>
    </>
  );
}
