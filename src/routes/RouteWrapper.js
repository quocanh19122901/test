import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routeConfig } from "./routes.config";

export default function RouteWrapper() {
  return (
    <Router>
      <Routes>
        {routeConfig.map((item, index) => {
          return (
            <Route key={index} path={item.path} element={<item.component />} />
          );
        })}
      </Routes>
    </Router>
  );
}
