import { Navigate } from "react-router-dom";
import { getToken, isTokenValid, logout } from "../src/utils/auth";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!isTokenValid(token)) {
    logout(); // clear token + redirect
    return <Navigate to="/login" replace />;
  }

  return children;
}
