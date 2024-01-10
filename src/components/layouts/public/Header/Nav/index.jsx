/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { RiMenuLine } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import { Button } from "components/common";
import { useDispatch, useSelector } from "react-redux";
import UIDropdown from "../../../../common/public/UIDropdown";
import { setStatus, setType } from "../../../../../context/modalSlice";
import SignIn from "../../../../pages/public/Sign_in";
import Sign_up from "../../../../pages/public/Sign_up";
import { UITypography } from "../../../../common";
import FrameUI from "../../../../../helpers/FrameUI";
import { useConnect } from "../../../../../hooks/useConnect";
import UIDropdownPage from "../../../../common/public/UIDropdownPage";
export default function Navbar({ toggleSideNav }) {
  const { pathname } = useLocation();
  const info_user = useSelector((state) => state.user.info_user);
  const dispatch = useDispatch();
  const [hasScrolled, setHasSrolled] = useState(false);
  const resizeHeaderOnScroll = () => {
    // if (pathname != "/account") {
    setHasSrolled((hasScrolled) => {
      if (
        !hasScrolled &&
        (document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20)
      ) {
        return true;
      }

      if (
        hasScrolled &&
        document.body.scrollTop < 4 &&
        document.documentElement.scrollTop < 4
      ) {
        return false;
      }

      return hasScrolled;
    });
    // }
  };

  useEffect(() => {
    // if (pathname != "/account") {
    window.addEventListener("scroll", resizeHeaderOnScroll);
    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
    // }
  }, [pathname]);

  const handleOpenLoginModal = (type) => {
    if (type == "sign-up") {
      dispatch(setStatus(true));
      dispatch(setType(Sign_up));
    } else {
      dispatch(setStatus(true));
      dispatch(setType(SignIn));
    }
  };
  const navStyles = hasScrolled
    ? `${styles.nav} ${styles.hasScrolled}`
    : styles.nav;
  return (
    <nav className={navStyles}>
      {/* {pathname != "/account" && ( */}
      <div className={styles.container_top}>
        {!info_user.isVerified && (
          <>
            <Button
              className={`${styles.button_outline}`}
              onClick={() => handleOpenLoginModal("login")}>
              Login
            </Button>
            <Button
              className={`${styles.button_full}`}
              onClick={() => handleOpenLoginModal("sign-up")}>
              Sign Up
            </Button>
          </>
        )}
        {info_user.isVerified && (
          <Link to="/account" className={`${styles.link} ${styles.login_link}`}>
            My Account
          </Link>
        )}
        {info_user.isVerified && info_user.role == "admin" && (
          <Link to="/admin" className={`${styles.link} ${styles.login_link}`}>
            Admin
          </Link>
        )}
        {info_user.isVerified && info_user.role == "Emp_Sale" && (
          <Link
            to="/employee_sale"
            className={`${styles.link} ${styles.login_link}`}>
            Employee Sale
          </Link>
        )}
        {info_user.isVerified && info_user.role == "Emp_Technician" && (
          <Link
            to="/employee_tech"
            className={`${styles.link} ${styles.login_link}`}>
            Technician
          </Link>
        )}
      </div>
      {/* )} */}
      <div className={styles.container_bottom}>
        <Link to="/">
          {/* <img className={styles.logo} src={LogoNav} alt="Logo Nav" /> */}
          <span className={styles.logo}>Nexus</span>
        </Link>
        <ul className={styles.links}>
          <li className={styles.link}>
            <UIDropdownPage name={"Services"} fontSize={18} />
          </li>
          <li className={styles.link}>
            <UIDropdown name={"Support"} fontSize={18} />
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              lineHeight: "0",
              cursor: "pointer",
            }}
            className={styles.link}>
            <Link to={"/about-us"}>
              <FrameUI>
                <UITypography
                  variant="button"
                  fontWeight="regular"
                  textTransform="capitalize"
                  color="dark"
                  sx={{
                    fontWeight: "900",
                    width: "100%",
                    whiteSpace: "nowrap",
                    marginLeft: ".5rem",
                  }}
                  fontSize={18}>
                  About us
                </UITypography>
              </FrameUI>
            </Link>
          </li>
        </ul>
        <ul className={`${styles.icons_menu}`}>
          <li className={styles.mobile_icon}>
            <RiMenuLine onClick={toggleSideNav} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
