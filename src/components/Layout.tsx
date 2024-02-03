import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
