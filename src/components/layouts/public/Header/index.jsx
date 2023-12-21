/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { DrawerModal } from "components/common";
//
import Nav from "./Nav";
import NavDrawerContent from "./NavDrawerContent";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  const isBigScreen = useMediaQuery({
    query: "(min-width: 900px)",
  });

  useEffect(() => {
    if (isBigScreen && isOpen) {
      setIsOpen(false);
    }
  }, [isBigScreen]);

  return (
    <header>
      <DrawerModal motionKey="nav-drawer" close={() => setIsOpen(false)}>
        {isOpen && <NavDrawerContent toggleSideNav={toggleSideNav} />}
      </DrawerModal>
      <Nav toggleSideNav={toggleSideNav} />
    </header>
  );
};

export default Header;
