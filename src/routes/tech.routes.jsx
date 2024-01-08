import Shop from "../components/models/private/Icons/Shop";

const TechRoutes = [
  { type: "title", title: "Order", key: "title-pages" },
  {
    index: true,
    type: "collapse",
    name: "Check",
    key: "employee_tech",
    icon: <Shop size="15px" />,
    route: "/employee_tech",
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
        Check Order
      </div>
    ),
  },
  { type: "title", title: "Storage", key: "title-pages" },
  {
    type: "collapse",
    name: "Storage",
    key: "storages",
    icon: <Shop size="15px" />,
    collapse: [
      {
        name: "Products",
        key: "product",
        route: "/employee_tech/storages/product",
        component: <>list product va quantity product</>,
        link: true,
        collapse: [
          // {
          //   name: "detail",
          //   key: "detail",
          //   route: "/employee_tech/storages/product/:id",
          //   component: <Detail_Product />,
          // },
        ],
      },
      {
        name: "Import",
        key: "import",
        route: "/employee_tech/storages/import",
        component: <>import storage</>,
        link: true,
        collapse: [
          // {
          //   name: "detail",
          //   key: "detail",
          //   route: "/employee_tech/storages/supplier/:id",
          //   component: <Detail_Package />,
          // },
        ],
      },
    ],
  },
];

export default TechRoutes;
