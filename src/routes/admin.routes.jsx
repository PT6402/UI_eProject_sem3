import Shop from "../components/models/private/Icons/Shop";
import AddressStores from "../components/pages/private/admin/Address_store";
import CreateAddressStore from "../components/pages/private/admin/Address_store/Create";
import DetailAddressStore from "../components/pages/private/admin/Address_store/Detail";
import Connects from "../components/pages/private/admin/Connects";
import Detail_Connect from "../components/pages/private/admin/Connects/Detail";
import Coupon from "../components/pages/private/admin/Coupon";
import FeedBack from "../components/pages/private/admin/Feedback";
import Packages from "../components/pages/private/admin/Package";
import Detail_Package from "../components/pages/private/admin/Package/Detail";
import Product from "../components/pages/private/admin/Product";
import Detail_Product from "../components/pages/private/admin/Product/Detail";
import Supplier from "../components/pages/private/admin/Supplier";
import { Employees } from "../components/pages/private/admin/Users";
import Customers from "../components/pages/private/admin/Users/Customers";
import Detail_customer from "../components/pages/private/admin/Users/Customers/Detail";
import CreateEmployee from "../components/pages/private/admin/Users/Employees/Create";
import Detail_employee from "../components/pages/private/admin/Users/Employees/Detail";
import EditEmployee from "../components/pages/private/admin/Users/Employees/Edit";
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
            name: "create",
            key: "create",
            route: "/admin/users/employees/create/",
            component: <CreateEmployee />,
          },
          {
            name: "create",
            key: "create",
            route: "/admin/users/employees/edit/:id",
            component: <EditEmployee />,
          },
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

  {
    type: "collapse",
    name: "Services",
    key: "services",
    icon: <Shop size="15px" />,
    collapse: [
      {
        name: "Connect Type",
        key: "connect_type",
        route: "/admin/services/connect_type",
        component: <Connects />,
        link: true,
        collapse: [
          {
            name: "detail",
            key: "detail",
            route: "/admin/services/connect_type/:id",
            component: <Detail_Connect />,
          },
        ],
      },
      {
        name: "Package",
        key: "package",
        route: "/admin/services/package",
        component: <Packages />,
        link: true,
        collapse: [
          {
            name: "detail",
            key: "detail",
            route: "/admin/services/package/:id",
            component: <Detail_Package />,
          },
        ],
      },
    ],
  },
  {
    type: "collapse",
    name: "Storage",
    key: "storages",
    icon: <Shop size="15px" />,
    collapse: [
      {
        name: "Products",
        key: "product",
        route: "/admin/storages/product",
        component: <Product />,
        link: true,
        collapse: [
          {
            name: "detail",
            key: "detail",
            route: "/admin/storages/product/:id",
            component: <Detail_Product />,
          },
        ],
      },
      {
        name: "Supplier",
        key: "supplier",
        route: "/admin/storages/supplier",
        component: <Supplier />,
        link: true,
        collapse: [
          {
            name: "detail",
            key: "detail",
            route: "/admin/storages/supplier/:id",
            component: <Detail_Package />,
          },
        ],
      },
    ],
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

  //[coupon]
  {
    type: "collapse",
    name: "Coupon",
    key: "coupon",
    icon: <Shop size="15px" />,
    route: "/admin/coupon",
    noCollapse: true,
    component: <Coupon />,
  },
  {
    type: "collapse",
    name: "Feedback",
    key: "feedback",
    icon: <Shop size="15px" />,
    route: "/admin/feedback",
    noCollapse: true,
    component: <FeedBack />,
  },
];
export default AdminRoutes;
