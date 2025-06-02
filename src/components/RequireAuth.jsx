import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && userRole !== role) {
    // Redirect to home if role mismatch (instead of login)
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAuth;
