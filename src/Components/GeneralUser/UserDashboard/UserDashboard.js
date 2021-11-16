import React from "react";
import UserNavbar from "../UserNavbar/UserNavbar";
import { Route, Switch, useRouteMatch } from "react-router";
import Payment from "../Payment/Payment";
import UserDashBoardHome from "../UserDashBoardHome/UserDashBoardHome";
import MyOrders from "../MyOrders/MyOrders";
import WriteReview from "../WriteReview/WriteReview";
import PrivateRoute from "../../Shared/PrivateRoute/PrivateRoute";

function Dashboard() {
  let { path } = useRouteMatch();
  return (
    <>
      <UserNavbar></UserNavbar>
      <div className='mt-3'>
        <Switch>
          <Route exact path={path}>
            <UserDashBoardHome></UserDashBoardHome>
          </Route>
          <PrivateRoute path={`${path}/myorders`}>
            <MyOrders></MyOrders>
          </PrivateRoute>
          <PrivateRoute path={`${path}/review`}>
            <WriteReview></WriteReview>
          </PrivateRoute>
          <PrivateRoute path={`${path}/pay`}>
            <Payment></Payment>
          </PrivateRoute>
        </Switch>
      </div>
    </>
  );
}

export default Dashboard;
