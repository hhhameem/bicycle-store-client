import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Button,
} from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { FiLogOut, FiSettings, FiPlusCircle, FiHome } from "react-icons/fi";
import {
  MdOutlineSpaceDashboard,
  MdOutlineShoppingCart,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import icon from "../../../images/Ride.png";
import userImage from "../../../images/user.png";

function AdminNavbar() {
  const { user, logout } = useAuth();
  const { url } = useRouteMatch();

  return (
    <Navbar bg='dark' expand={false} variant={"dark"}>
      <Container>
        <Navbar.Brand as={Link} to='/home'>
          <img src={icon} alt='' style={{ height: "30px", width: "auto" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='offcanvasNavbar' />
        <Navbar.Offcanvas
          id='offcanvasNavbar'
          aria-labelledby='offcanvasNavbarLabel'
          placement='end'
          className='bg-dark text-light'
        >
          <Offcanvas.Header closeButton closeVariant='white'>
            <Offcanvas.Title id='offcanvasNavbarLabel'>
              Admin Dashboard
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <Nav.Link as={Link} to='/home'>
                <span className='fs-3'>
                  <FiHome />
                </span>{" "}
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/dashboard'>
                <span className='fs-3'>
                  <MdOutlineSpaceDashboard />
                </span>{" "}
                DashBoard
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/allorders`}>
                <span className='fs-3'>
                  <MdOutlineShoppingCart />
                </span>{" "}
                All Orders
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/manageproducts`}>
                <span className='fs-3'>
                  <FiSettings />
                </span>{" "}
                Manage Products
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/addproducts`}>
                <span className='fs-3'>
                  <FiPlusCircle />
                </span>{" "}
                Add Products
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/makeadmin`}>
                <span className='fs-3'>
                  <MdOutlineAdminPanelSettings />
                </span>{" "}
                Make Admin
              </Nav.Link>
              <NavDropdown
                title={user?.displayName.split(" ")[0]}
                id='offcanvasNavbarDropdown'
                menuVariant='dark'
              >
                <NavDropdown.Item
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=''
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <img
                      src={userImage}
                      alt=''
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <p>{user?.displayName}</p>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Button} onClick={logout}>
                  <FiLogOut /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
