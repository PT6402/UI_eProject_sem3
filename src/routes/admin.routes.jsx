import Shop from "../components/models/private/Icons/Shop";
import AddressStores from "../components/pages/private/admin/Address_store";
import CreateAddressStore from "../components/pages/private/admin/Address_store/Create";
import DetailAddressStore from "../components/pages/private/admin/Address_store/Detail";
import Connects from "../components/pages/private/admin/Connects";
import Detail_Connect from "../components/pages/private/admin/Connects/Detail";
import { Employees } from "../components/pages/private/admin/Users";
import Customers from "../components/pages/private/admin/Users/Customers";
import Detail_customer from "../components/pages/private/admin/Users/Customers/Detail";
import Detail_employee from "../components/pages/private/admin/Users/Employees/Detail";
const AdminRoutes = [
  {
    index: true,
    type: "collapse",
    name: "Dashboards",
    key: "admin",
    icon: <Shop size="15px" />,
    route: "/admin",
    noCollapse: true,
    component: (
      <div
        style={{
          width: "100%",
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        Home Admin
      </div>
    ),
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Shop size="15px" />,
    collapse: [
      {
        name: "Customer",
        key: "customers",
        route: "/admin/users/customers",
        component: <Customers />,
        link: true,
        collapse: [
          {
            name: "detail",
            key: "detail",
            route: "/admin/users/customers/:id",
            component: <Detail_customer />,
          },
        ],
      },
      {
        name: "Employee",
        key: "employees",
        route: "/admin/users/employees/list",
        component: <Employees />,
        link: true,
        collapse: [
          //employee
          {
            name: "detail",
            key: "detail",
            route: "/admin/users/employees/:id",
            component: <Detail_employee />,
          },
        ],
      },
    ],
  },
  //[connect]
  {
    type: "collapse",
    name: "Connects",
    key: "connects",
    icon: <Shop size="15px" />,
    route: "/admin/connects",
    component: <Connects />,
    noCollapse: true,
  },
  {
    name: "Connects",
    key: "connects",
    icon: <Shop size="15px" />,
    route: "/admin/connects/:id",
    component: <Detail_Connect />,
    noCollapse: true,
  },

  //[address-store]
  {
    type: "collapse",
    name: "Address Store",
    key: "address-stores",
    icon: <Shop size="15px" />,
    route: "/admin/address-stores",
    noCollapse: true,
    component: <AddressStores />,
  },
  {
    name: "Address Store",
    key: "address-stores",
    route: "/admin/address-stores/:id",
    noCollapse: true,
    component: <DetailAddressStore />,
  },
  {
    name: "Create",
    key: "create",
    route: "/admin/address-stores/create",
    noCollapse: true,
    component: <CreateAddressStore />,
  },
];
export default AdminRoutes;
