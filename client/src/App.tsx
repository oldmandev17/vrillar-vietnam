import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { allRoutes } from "./routes/routes";

const Layout = lazy(() => import("~/layouts/Layout"));

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    pathname === "/" && navigate("/season");
  }, [pathname, navigate]);

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<Layout />}>
          {allRoutes.map((item) => {
            const Page = item.component;
            return (
              <Route key={item.path} path={item.path} element={<Page />} />
            );
          })}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
