import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import Logo from "../logo/Logo";
import AppNav from "../appNav/AppNav";
import Footer from "../footer/Footer";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
