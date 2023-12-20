/* eslint-disable react/prop-types */
import { useState } from "react";
import Dropdown from "./Dropdown";
import { Container } from "@mui/material";
import UIDrop from "./UIDrop";
import FrameUI from "../../../../helpers/FrameUI";
import SpaceShip from "../../../models/private/Icons/SpaceShip";
import Cube from "../../../models/private/Icons/Cube";
import Document from "../../../models/private/Icons/Document";
import Shop from "../../../models/private/Icons/Shop";

export default function UIDropdown({ name, fontSize }) {
  const routes = [
    {
      name: "Docs",
      key: "docs",
      collapse: [
        {
          name: "Getting Started",
          key: "getting-started",
          href: "https://www.creative-tim.com/learning-lab/react/quick-start/soft-ui-dashboard/",
          description: "All about overview, quick start, license and contents",
          icon: <SpaceShip size="15px" color="secondary" />,
        },
        {
          name: "Foundation",
          key: "foundation",
          href: "https://www.creative-tim.com/learning-lab/react/colors/soft-ui-dashboard/",
          description: "See our colors, icons and typography",
          icon: <Document size="15px" color="secondary" />,
        },
        {
          name: "Components",
          key: "components",
          href: "https://www.creative-tim.com/learning-lab/react/alerts/soft-ui-dashboard/",
          description: "Explore our collection of fully designed components",
          icon: <Cube size="15px" color="secondary" />,
        },
        {
          name: "Plugins",
          key: "plugins",
          href: "https://www.creative-tim.com/learning-lab/react/datepicker/soft-ui-dashboard/",
          description: "Check how you can integrate our plugins",
          icon: <Shop size="15px" color="secondary" />,
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
