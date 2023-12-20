import Shop from "../components/models/private/Icons/Shop";
import Home from "../components/pages/public/Home";

const AdminRoutes = [
  {
    type: "collapse",
    name: "Dashboards",
    key: "admin",
    icon: <Shop size="15px" />,
    collapse: [
      {
        name: "Default",
        key: "default",
        route: "/admin/default",
        component: <Home />,
      },
    ],
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Pages",
    key: "pages",
    icon: "",
  },
  {
    type: "collapse",
    name: "Applications",
    key: "applications",
    icon: "",
  },
  {
    type: "collapse",
    name: "Ecommerce",
    key: "ecommerce",
    icon: "",
  },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: "",
  },
  { type: "divider", key: "divider-1" },
  { type: "title", title: "Docs", key: "title-docs" },
  {
    type: "collapse",
    name: "Basic",
    key: "basic",
    icon: "",
  },
  {
    type: "collapse",
    name: "Components",
    key: "components",
    icon: "",
  },
  {
    type: "collapse",
    name: "Change Log",
    key: "changelog",
    href: "https://github.com/creativetimofficial/ct-soft-ui-dashboard-pro-react/blob/main/CHANGELOG.md",
    icon: "",
    noCollapse: true,
  },
];
export default AdminRoutes;
