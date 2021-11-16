import Button from "@restart/ui/esm/Button";
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import userImage from "../../../images/user.png";
import icon from "../../../images/Ride.png";

function Navigation() {
  const { user, isAdmin, logout } = useAuth();
  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/home'>
          <img src={icon} alt='' style={{ height: "30px", width: "auto" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/home'>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to='/products'>
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            {user?.email ? (
              <>
                <NavDropdown
                  title={user?.displayName}
                  id='collasible-nav-dropdown'
                  menuVariant='dark'
                >
                  {isAdmin ? (
                    <NavDropdown.Item
                      as={NavLink}
                      to='/dashboard'
                      className='text-center'
                    >
                      Dashboard
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item
                      as={NavLink}
                      to='/userdashboard'
                      className='text-center'
                    >
                      Dashboard
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Button}
                    onClick={logout}
                    className='text-center'
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {user?.photoURL ? (
                  <Navbar.Brand as={NavLink} to='/home'>
                    <img
                      src={user?.photoURL}
                      alt=''
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  </Navbar.Brand>
                ) : (
                  <Navbar.Brand as={NavLink} to='/home'>
                    <img src={userImage} alt='' />
                  </Navbar.Brand>
                )}
              </>
            ) : (
              <Nav.Link as={NavLink} to='/login'>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
