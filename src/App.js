import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import initFirebase from "./Firebase/Firebase.init";
import AuthContextProvider from "./AuthContextProvider/AuthContextProvider";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import Dashboard from "./Components/Shared/Dashboard/Dashboard";
import PrivateRoute from "./Components/Shared/PrivateRoute/PrivateRoute";
import AdminRoute from "./Components/Admin/AdminRoute/AdminRoute";
import UserDashboard from "./Components/GeneralUser/UserDashboard/UserDashboard";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

initFirebase();
function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path='/register'>
              <Registration></Registration>
            </Route>
            <PrivateRoute path='/products/:id'>
              <ProductDetails></ProductDetails>
            </PrivateRoute>
            <Route path='/products'>
              <Products></Products>
            </Route>
            <PrivateRoute path='/userdashboard'>
              <UserDashboard></UserDashboard>
            </PrivateRoute>
            <AdminRoute path='/dashboard'>
              <Dashboard></Dashboard>
            </AdminRoute>
            <Route exact path='/'>
              <Home></Home>
            </Route>
          </Switch>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
