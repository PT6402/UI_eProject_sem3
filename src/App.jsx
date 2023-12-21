import "./index.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { Public, Private } from "components/layouts";
import { GetRoutes } from "helpers";
import {
  PublicRoutes,
  ProtectedRoutes,
  AdminRouters,
  EmployeeRoutes,
} from "routes";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function App() {
  return (
    <>
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

        {/* EMPLOYEE */}
        <Route element={<ProtectedRoutes needStaff="employee" />}>
          <Route path="/employee" element={<Private routes={EmployeeRoutes} />}>
            {GetRoutes(EmployeeRoutes)}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
