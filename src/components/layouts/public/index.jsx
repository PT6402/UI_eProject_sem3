import { useState } from "react";

import { Outlet } from "react-router-dom";

import Toast from "./Toast";
import Header from "./Header";
import Footer from "./Footer";
import ModalType from "./Header/Modal";

const PublicLayout = () => {
  return (
    <>
      <Toast />
      <ModalType />
      <div id="layout">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
