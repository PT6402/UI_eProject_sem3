import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UIBox, UITypography } from "components/common";
import { NotificationItem } from "components/models";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "./styles";
import { setMiniSidenav, setTransparentNavbar } from "context/privateUISlice";

// Images
import team2 from "assets/images/private/team-2.jpg";
import logoSpotify from "assets/images/private/small-logos/logo-spotify.svg";
import { useAuth } from "../../../../hooks/useAuth";

function DashboardNavbar({ absolute, light, isMini }) {
  const dispatch = useDispatch();
  const privateUI = useSelector((state) => state.privateUI);
  const { fixedNavbar, miniSidenav, transparentNavbar } = privateUI;
  const [openMenu, setOpenMenu] = useState(false);
  const [navbarType, setNavbarType] = useState();
  const { logout } = useAuth();
  const handleMiniSidenav = () =>
    setMiniSidenav(dispatch(setMiniSidenav(!miniSidenav)));
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      dispatch(
        setTransparentNavbar(
          (fixedNavbar && window.scrollY === 0) || !fixedNavbar
        )
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}>
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon
            fontSize="small"
            sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  const handleLogout = async () => {
    await logout();
  };
  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}>
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <UIBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}>
          <Icon
            fontSize="medium"
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}>
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </UIBox>
        {isMini ? null : (
          <UIBox flex_end sx={(theme) => navbarRow(theme, { isMini })}>
            <UIBox color={light ? "white" : "inherit"}>
              {/* <Link to="/authentication/sign-in/basic"> */}
              <IconButton
                sx={navbarIconButton}
                size="small"
                onClick={handleLogout}>
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light ? white.main : dark.main,
                  })}>
                  account_circle
                </Icon>
                <UITypography
                  variant="button"
                  fontWeight="medium"
                  color={light ? "white" : "dark"}>
                  Logout
                </UITypography>
              </IconButton>
              {/* </Link> */}
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}>
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}>
                <Icon className={light ? "text-white" : "text-dark"}>
                  notifications
                </Icon>
              </IconButton>
              {renderMenu()}
            </UIBox>
          </UIBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
