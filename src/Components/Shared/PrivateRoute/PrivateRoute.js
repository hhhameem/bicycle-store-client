import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

function PrivateRoute({ children, ...rest }) {
  let { user, isLoading } = useAuth();
  if (isLoading) {
    return <Spinner animation='border' className='spinner-color' />;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.email ? (
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

export default PrivateRoute;
