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
import { FiLogOut, FiHome } from "react-icons/fi";
import { BsPencilSquare, BsCreditCard } from "react-icons/bs";
import { MdOutlineSpaceDashboard, MdOutlineShoppingCart } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import icon from "../../../images/Ride.png";
import userImage from "../../../images/user.png";

function UserNavbar() {
  const { user, logout } = useAuth();
  let { url } = useRouteMatch();

  return (
    <Navbar bg='dark' expand={false} variant={"dark"}>
      <Container fluid>
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
              User Dashboard
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
              <Nav.Link as={Link} to='/userdashboard'>
                <span className='fs-3'>
                  <MdOutlineSpaceDashboard />
                </span>{" "}
                DashBoard
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/myorders`}>
                <span className='fs-3'>
                  <MdOutlineShoppingCart />
                </span>{" "}
                My Orders
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/review`}>
                <span className='fs-3'>
                  <BsPencilSquare />
                </span>{" "}
                Write Review
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/pay`}>
                <span className='fs-3'>
                  <BsCreditCard />
                </span>{" "}
                Pay
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

export default UserNavbar;
