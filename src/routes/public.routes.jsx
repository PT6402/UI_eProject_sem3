import Home from "components/pages/public/Home";
import Account from "../components/pages/public/Account";
import CheckingInvoice from "../components/pages/public/CheckingInvoice";
import SearchingStore from "../components/pages/public/SearchingStore";
import OnlinePayment from "../components/pages/public/PaymentOnline";
import PageService from "../components/pages/public/PageServices";
import CreateOrder from "../components/pages/public/Order";
import AbountUs from "../components/pages/public/AbountUs";
import Payment from "../components/pages/public/Payment";

const PublicRoutes = [
  {
    name: "Home",
    key: "home",
    route: "/",
    component: <Home />,
  },
  {
    name: "Home",
    key: "home",
    route: "/account/login",
    component: <Home />,
  },
  {
    auth: true,
    key: "auth",
    collapse: [
      {
        name: "Account",
        key: "account",
        route: "/account",
        component: <Account />,
      },
      {
        name: "check-invoice",
        key: "account",
        route: "/checking-invoice",
        component: <CheckingInvoice />,
      },
    ],
  },
  {
    name: "searching-store",
    key: "searching-store",
    route: "/searching-store",
    component: <SearchingStore />,
  },
  {
    name: "online-payment",
    key: "online-payment",
    route: "/online-payment",
    component: <OnlinePayment />,
  },
  {
    name: "page-services",
    key: "page-services",
    route: "/page-services/:id",
    component: <PageService />,
  },
  {
    name: "order",
    key: "order",
    route: "/order/:id",
    component: <CreateOrder />,
  },
  {
    name: "about-us",
    key: "about-us",
    route: "/about-us/",
    component: <AbountUs />,
  },
  {
    name: "payment",
    key: "payment",
    route: "/payment/:orderId/:session",
    component: <Payment />,
  },
];
export default PublicRoutes;
