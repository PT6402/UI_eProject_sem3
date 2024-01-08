import "./index.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { Public, Private } from "components/layouts";
import { GetRoutes } from "helpers";
import {
  PublicRoutes,
  ProtectedRoutes,
  AdminRouters,
  TechRoutes,
  SaleRoutes,
} from "routes";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { Loader } from "./components/common";

function App() {
  const [status, setStatus] = useState(false);
  const { checkReloadPage, isLoading } = useAuth();
  useEffect(() => {
    checkReloadPage().then(() => setStatus(true));
  }, []);
  if (status) {
    return (
      <>
        {!isLoading && (
          <Routes>
            {/* USER */}
            <Route path="/" element={<Public />}>
              {GetRoutes(PublicRoutes)}
            </Route>

            {/* ADMIN */}
            <Route element={<ProtectedRoutes needStaff="admin" />}>
              <Route path="/admin" element={<Private routes={AdminRouters} />}>
                {GetRoutes(AdminRouters)}
              </Route>
            </Route>

            {/* EMPLOYEE tech */}
            <Route element={<ProtectedRoutes needStaff="Emp_Technician" />}>
              <Route
                path="/employee_tech"
                element={<Private routes={TechRoutes} />}>
                {GetRoutes(TechRoutes)}
              </Route>
            </Route>

            {/* EMPLOYEE sale */}
            <Route element={<ProtectedRoutes needStaff="Emp_Sale" />}>
              <Route
                path="/employee_sale"
                element={<Private routes={SaleRoutes} />}>
                {GetRoutes(SaleRoutes)}
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </>
    );
  } else {
    return <>{isLoading && <Loader />}</>;
  }
}

export default App;
