import { useState } from "react";

import { Outlet } from "react-router-dom";

import Toast from "./Toast";
import Header from "./Header";
import Footer from "./Footer";
import { CenterModal } from "components/common";
import SignIn from "../../pages/public/Sign_in";

const PublicLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Toast />
      <div id="layout">
        <CenterModal
          close={() => setIsOpen(false)}
          modalClassName={{ padding: "3rem 0" }}>
          {isOpen && <SignIn />}
        </CenterModal>
        <Header openLoginModal={() => setIsOpen(true)} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
