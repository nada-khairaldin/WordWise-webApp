import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // we use useEffect because navigate has a sideEffect which is changing the url so it should be call after rendering the component

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null; // this is to prevent rendering user component which is inside the AppLayout (user -> not exist -> error) user component without conditional chaining was rendered even that the user is not authenticated because this return is executed before useEffect
}

export default ProtectedRoute;
