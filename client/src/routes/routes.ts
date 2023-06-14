import { lazy } from "react";
import config from "~/configs";
const Result = lazy(() => import("@pages/Result"));
const Season = lazy(() => import("@pages/Season"));

const allRoutes = [
  { path: config.routes.result, component: Result },
  { path: config.routes.season, component: Season },
];

export { allRoutes };
