/* eslint-disable react/prop-types */
import { useState } from "react";
import Dropdown from "./Dropdown";
import { Container } from "@mui/material";
import UIDrop from "./UIDrop";
import FrameUI from "../../../../helpers/FrameUI";
import SpaceShip from "../../../models/private/Icons/SpaceShip";
import Cube from "../../../models/private/Icons/Cube";
import Document from "../../../models/private/Icons/Document";

export default function UIDropdown({ name, fontSize }) {
  const routes = [
    {
      name: "Docs",
      key: "docs",
      collapse: [
        {
          name: "Searching Store",
          key: "searching-store",
          href: "/searching-store",
          icon: <SpaceShip size="15px" color="secondary" />,
        },
        {
          name: "Checking invoice",
          key: "checking-invoice",
          href: "/checking-invoice",
          icon: <Document size="15px" color="secondary" />,
        },
        {
          name: "Online Payment",
          key: "online-payment",
          href: "/online-payment",
          icon: <Cube size="15px" color="secondary" />,
        },
      ],
    },
  ];
  const [docsMenu, setDocsMenu] = useState(false);
  const closeDocsMenu = () => setDocsMenu(false);
  const openDocsMenu = ({ currentTarget }) => setDocsMenu(currentTarget);
  return (
    <FrameUI>
      <Container>
        <UIDrop
          name={name}
          openHandler={openDocsMenu}
          closeHandler={closeDocsMenu}
          light={"white"}
          fontSize={fontSize}
        />
        <Dropdown
          routes={routes}
          open={docsMenu}
          close={closeDocsMenu}
          fontSize={fontSize}
        />
      </Container>
    </FrameUI>
  );
}
