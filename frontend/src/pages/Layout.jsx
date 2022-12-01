import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";

const Layout = () => {
  return (
    <>
      <Header />

      <br />
      <br />
      <br />

      <Outlet />
    </>
  );
};

export default Layout;
