import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/authProvider";

function RequireAuth({ children }) {
  const { authed } = useAuth();

  return authed ? children : <Navigate to="/login" />;
}
export default RequireAuth;