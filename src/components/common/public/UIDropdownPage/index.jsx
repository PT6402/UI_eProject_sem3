/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { Container } from "@mui/material";
import UIDrop from "./UIDrop";
import FrameUI from "../../../../helpers/FrameUI";
import SpaceShip from "../../../models/private/Icons/SpaceShip";
import Cube from "../../../models/private/Icons/Cube";
import Document from "../../../models/private/Icons/Document";

export default function UIDropdownPage({ name, fontSize }) {
  // const [listConnect, setListConnect] = useState(routes);
  const [docsMenu, setDocsMenu] = useState(false);
  const closeDocsMenu = () => setDocsMenu(false);
  const openDocsMenu = ({ currentTarget }) => setDocsMenu(currentTarget);
  // const handleListNavConnect = () => {
  //   if (data != null) {
  //     const itemConnect = data.map((item) => {
  //       return {
  //         name: item.name,
  //         key: item.id,
  //         // href: "/searching-store",
  //         // icon: <SpaceShip size="15px" color="secondary" />,
  //       };
  //     });
  //     routes[0].collapse = itemConnect;
  //     // setListConnect(routes);
  //   }
  // };
  // useEffect(() => {
  //   handleListNavConnect();
  // }, [data]);
  // console.log(data);
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

        {/* {routes[0].collapse.length > 0 && ( */}
        <Dropdown open={docsMenu} close={closeDocsMenu} fontSize={fontSize} />
        {/* )} */}
      </Container>
    </FrameUI>
  );
}
