import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

function AdminRoute({ children, ...rest }) {
  const { user, isAdmin, isLoading } = useAuth();
  const admin = localStorage.getItem("admin");

  if (isLoading) {
    return <Spinner animation='border' className='spinner-color' />;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;
