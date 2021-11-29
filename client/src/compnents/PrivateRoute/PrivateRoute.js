import React from "react";
import { Navigate, useLocation } from "react-router";
import CheckToken from "../Hooks/CheckToken";

function PrivateRoute({ children }) {
  const { CheckJwtToken } = CheckToken();
  const location = useLocation();

  if (CheckJwtToken()) {
    return children;
  } else {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
}

export default PrivateRoute;
