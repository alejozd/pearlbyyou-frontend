import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <>
      <NavBar />
      <main className="min-app">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
