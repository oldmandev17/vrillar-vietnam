import { Outlet } from "react-router-dom";

import Header from "~/modules/partials/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
