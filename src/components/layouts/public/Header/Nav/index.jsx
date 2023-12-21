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
export default function Navbar({ toggleSideNav }) {
  const info_user = useSelector((state) => state.user.info_user);
  const dispatch = useDispatch();
  const [hasScrolled, setHasSrolled] = useState(false);
  const resizeHeaderOnScroll = () => {
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
  };

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);

    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  }, []);

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
        {/* {isAdmin && (
          <Link to="/admin" className={`${styles.link} ${styles.login_link}`}>
            Admin
          </Link>
        )} */}
      </div>
      <div className={styles.container_bottom}>
        <Link to="/">
          {/* <img className={styles.logo} src={LogoNav} alt="Logo Nav" /> */}
        </Link>
        <ul className={styles.links}>
          <li>
            <NavLink
              className={styles.link}
              to="/collections/hoodies-sweatshirts">
              Dial-up
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/collections/accessories">
              BroadBand
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/collections/t-shirts">
              LandLine
            </NavLink>
          </li>
        </ul>
        <ul className={`${styles.icons_menu}`}>
          <li className={styles.li_link_support}>
            <UIDropdown name={"Support Service"} fontSize={18} />
          </li>
          <li className={styles.mobile_icon}>
            <RiMenuLine onClick={toggleSideNav} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
