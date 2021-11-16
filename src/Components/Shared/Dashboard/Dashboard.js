import React from "react";
import { Switch, useRouteMatch } from "react-router";
import AddProducts from "../../Admin/AddProducts/AddProducts";
import AdminDashBoardHome from "../../Admin/AdminDashBoardHome/AdminDashBoardHome";
import AdminNavbar from "../../Admin/AdminNavbar/AdminNavbar";
import AdminRoute from "../../Admin/AdminRoute/AdminRoute";
import AllOrders from "../../Admin/AllOrders/AllOrders";
import MakeAdmin from "../../Admin/MakeAdmin/MakeAdmin";
import ManageProducts from "../../Admin/ManageProducts/ManageProducts";

function Dashboard() {
  let { path } = useRouteMatch();
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <div className='mt-3'>
        <Switch>
          <AdminRoute exact path={path}>
            <AdminDashBoardHome></AdminDashBoardHome>
          </AdminRoute>
          <AdminRoute path={`${path}/allorders`}>
            <AllOrders></AllOrders>
          </AdminRoute>
          <AdminRoute path={`${path}/manageproducts`}>
            <ManageProducts></ManageProducts>
          </AdminRoute>
          <AdminRoute path={`${path}/addproducts`}>
            <AddProducts></AddProducts>
          </AdminRoute>
          <AdminRoute path={`${path}/makeadmin`}>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        </Switch>
      </div>
    </>
  );
}

export default Dashboard;
