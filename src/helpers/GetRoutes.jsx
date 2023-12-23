import { Route } from "react-router-dom";
import ProtectedRoutes from "../routes/protected.routes";

const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.link && route.component && route.route) {
      return (
        <>
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}></Route>
          {getRoutes(route.collapse)}
        </>
      );
    }

    if (route.noCollapse) {
      return (
        <Route
          exact
          path={route.route}
          element={route.component}
          key={route.key}
        />
      );
    }
    if (route.auth) {
      const authRoute = (
        <Route element={<ProtectedRoutes needAuth={true} />} key={route.key}>
          {getRoutes(route.collapse)}
        </Route>
      );
      return authRoute;
    }
    if (route.collapse) {
      return getRoutes(route.collapse);
    }
    if (route.route) {
      return (
        <Route
          exact
          path={route.route}
          element={route.component}
          key={route.key}
        />
      );
    }

    return null;
  });

export default getRoutes;
