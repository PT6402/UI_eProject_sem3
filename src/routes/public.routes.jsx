import Home from "components/pages/public/Home";
import SignIn from "../components/pages/public/Sign_in";

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
        component: <SignIn />,
      },
      {
        name: "Home",
        key: "home",
        route: "/home",
        component: <Home />,
      },
    ],
  },
];
export default PublicRoutes;
