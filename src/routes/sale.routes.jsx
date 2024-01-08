import Shop from "../components/models/private/Icons/Shop";
import CheckOrder from "../components/pages/private/sale/CheckOrder";
import CreateOrder from "../components/pages/private/sale/CreateOrder";
import OrderDetail from "../components/pages/private/sale/OrderDetail";

const SaleRoutes = [
  { type: "title", title: "Order", key: "title-pages" },
  {
    index: true,
    type: "collapse",
    name: "Check",
    key: "employee_sale",
    icon: <Shop size="15px" />,
    route: "/employee_sale",
    noCollapse: true,
    component: <CheckOrder />,
  },
  {
    name: "OrderDetail",
    key: "order-detail",
    route: "/employee_sale/:id",
    noCollapse: true,
    component: <OrderDetail />,
  },

  // {
  //   type: "collapse",
  //   name: "Create",
  //   key: "create-order",
  //   icon: <Shop size="15px" />,
  //   route: "/employee_sale/create-order",
  //   noCollapse: true,
  //   component: <CreateOrder />,
  // },
];
export default SaleRoutes;
