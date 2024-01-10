import Shop from "../components/models/private/Icons/Shop";
import CheckOrder from "../components/pages/private/tech/CheckOrder";
import Product from "../components/pages/private/tech/Product";

const TechRoutes = [
  {
    index: true,
    type: "collapse",
    name: "Check order",
    key: "employee_tech",
    icon: <Shop size="15px" />,
    route: "/employee_tech",
    noCollapse: true,
    component: <CheckOrder />,
  },

  {
    type: "collapse",
    name: "Storage",
    key: "product",
    icon: <Shop size="15px" />,
    route: "/employee_tech/product",
    noCollapse: true,
    component: <Product />,
  },
];

export default TechRoutes;
