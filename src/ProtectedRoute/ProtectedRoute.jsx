import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((state) => state.auth);
  const location = useLocation();
  if (auth?.token) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};


export default ProtectedRoute;
