import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <main style={{ position: 'relative' }}>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default Layout;
