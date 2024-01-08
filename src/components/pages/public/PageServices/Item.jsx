/* eslint-disable react/prop-types */
import ReactDOM from "react-dom/client";
import { Card, Divider } from "@mui/material";
import {
  Button,
  UIBadge,
  UIBadgeDot,
  UIBox,
  UITypography,
} from "../../../common";
import colors from "../../../../assets/themes/private/base/colors";
import styles from "./index.module.scss";
import { convertToHTML } from "draft-convert";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setType } from "../../../../context/modalSlice";
import SignIn from "../Sign_in";
export default function Item({ title, description, name, time, price, id }) {
  const info_user = useSelector((state) => state.user.info_user);
  const dispatch = useDispatch();
  const [htmlparse, setHtmlParse] = useState();
  const handelConvertStringToHtml = () => {
    const parser = new DOMParser();
    const html = parser.parseFromString(description, "text/html");
    setHtmlParse(html.body.firstChild.textContent);
  };
  useEffect(() => {
    handelConvertStringToHtml();
  }, []);
  console.log(htmlparse);
  const handleChangeModal = () => {
    dispatch(setStatus(true));
    dispatch(setType(SignIn));
  };

  return (
    <Card
      sx={{
        maxWidth: "300px",
        minHeight: "300px",
        height: "100%",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}>
      <UIBox
        p={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}>
        <UIBox>
          <UIBox display="flex" alignItems="center" justifyContent="center">
            <UIBox lineHeight={0}>
              <UIBox mb={1} lineHeight={0}>
                <UITypography
                  variant="h6"
                  textTransform="capitalize"
                  fontWeight="bold"
                  sx={{ fontSize: "2rem" }}>
                  {title}
                </UITypography>
              </UIBox>
            </UIBox>
          </UIBox>
          <UIBox
            my={2}
            lineHeight={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <UIBox>
              <UIBadgeDot
                color={"error"}
                size="lg"
                badgeContent={`package:${name}`}
                font={{
                  color: "text",
                  weight: "medium",
                }}
                fontSizeCus={"1.4rem"}
                px={0}
                sx={{ whiteSpace: "wrap" }}
              />
              <UIBadgeDot
                color={"error"}
                size="lg"
                badgeContent={`duration:${time}`}
                font={{
                  color: "text",
                  weight: "medium",
                }}
                fontSizeCus={"1.4rem"}
                px={0}
              />

              {htmlparse == null && (
                <>
                  <UIBadgeDot
                    color={"error"}
                    size="lg"
                    badgeContent={`callcharge:`}
                    font={{
                      color: "text",
                      weight: "medium",
                    }}
                    fontSizeCus={"1.4rem"}
                    px={0}
                  />
                  <UITypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ fontSize: "1.3rem" }}>
                    {htmlparse}
                  </UITypography>
                </>
              )}
            </UIBox>
          </UIBox>
        </UIBox>
        <UIBox>
          <Divider />
          <UIBox sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
            <UIBadge
              variant="contained"
              color="success"
              size="1rem"
              colorCus="#000"
              badgeContent={`price:${price}$`}
              container
              paddingCus="1rem 2.5rem"
            />
          </UIBox>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <div className={styles.button_wrapper}>
              {info_user.isVerified ? (
                <Link to={`/order/${id}`}>
                  <Button form="form" className={styles.button} type="submit">
                    Add
                  </Button>
                </Link>
              ) : (
                <Button
                  form="form"
                  className={styles.button}
                  type="submit"
                  onClick={() => handleChangeModal()}>
                  Add
                </Button>
              )}
            </div>
          </UIBox>
        </UIBox>
      </UIBox>
    </Card>
  );
}
