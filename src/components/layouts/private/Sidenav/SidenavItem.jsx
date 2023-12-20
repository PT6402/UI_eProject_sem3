import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

import { UIBox } from "components/common";
import { item, itemContent, itemArrow } from "./styles/sidenavItem";

function SidenavItem({ name, active, nested, children, open, ...rest }) {
  const privateUI = useSelector((state) => state.privateUI);
  const { miniSidenav } = privateUI;

  return (
    <>
      <ListItem {...rest} component="li" sx={item}>
        <UIBox
          sx={(theme) =>
            itemContent(theme, { active, miniSidenav, name, nested })
          }>
          <ListItemText primary={name} />
          {children && (
            <Icon
              component="i"
              sx={(theme) => itemArrow(theme, { open, miniSidenav })}>
              expand_less
            </Icon>
          )}
        </UIBox>
      </ListItem>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}
SidenavItem.defaultProps = {
  active: false,
  nested: false,
  children: false,
  open: false,
};

SidenavItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  nested: PropTypes.bool,
  children: PropTypes.node,
  open: PropTypes.bool,
};

export default SidenavItem;
