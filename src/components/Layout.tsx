import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ContactFloat from "./ContactFloat";

const Layout = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 pt-13 ">
        <Outlet />
      </main>
      <Footer />
      <ContactFloat />
    </div>
  );
};

export default Layout;
