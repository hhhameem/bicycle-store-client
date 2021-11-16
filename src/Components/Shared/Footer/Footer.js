import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/Ride.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className='w-100 py-4 flex-shrink-0'>
      <div className='container py-4'>
        <div className='row gy-4 gx-4'>
          <div className='col-lg-4 col-md-6'>
            <img src={logo} alt='' style={{ width: "auto", height: "30px" }} />
            <p className='small text-muted mt-3'>
              Ride Is an online bike shop where you can find your desired world
              class bicycle.
            </p>
            <p className='small text-muted mb-0'>
              &copy; Copyrights. All rights reserved.{" "}
              <Link className='text-primary' to='/'>
                Ride.com
              </Link>
            </p>
          </div>
          <div className='col-lg-4 col-md-6'>
            <h5 className='text-white mb-3'>Quick links</h5>
            <ul className='list-unstyled text-muted'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/'>About</Link>
              </li>
              <li>
                <Link to='/'>Get started</Link>
              </li>
              <li>
                <Link to='/'>FAQ</Link>
              </li>
            </ul>
          </div>
          <div className='col-lg-4 col-md-6'>
            <h5 className='text-white mb-3'>Quick links</h5>
            <ul className='list-unstyled text-muted'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/'>About</Link>
              </li>
              <li>
                <Link to='/'>Get started</Link>
              </li>
              <li>
                <Link to='/'>FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
