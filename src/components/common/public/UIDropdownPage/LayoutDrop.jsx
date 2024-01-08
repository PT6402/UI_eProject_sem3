/* eslint-disable react/prop-types */
import { Grow, Popper } from "@mui/material";
import { useState } from "react";
import UIBox from "../../private/UIBox";

export default function LayoutDrop({
  open,
  close,
  placement,
  children,
  style,
}) {
  const [anchor, setAnchor] = useState(false);

  const openMenu = () => setAnchor(open);
  const closeMenu = () => setAnchor(false);
  return (
    <Popper
      anchorEl={anchor || open}
      popperRef={null}
      open={Boolean(anchor) || Boolean(open)}
      placement={placement}
      transition
      style={{ zIndex: 99, ...style }}>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} sx={{ transformOrigin: "left top" }}>
          <UIBox
            bgColor="white"
            shadow="lg"
            borderRadius="xl"
            p={2}
            onMouseEnter={openMenu}
            onMouseLeave={(close, closeMenu)}>
            {children}
          </UIBox>
        </Grow>
      )}
    </Popper>
  );
}
