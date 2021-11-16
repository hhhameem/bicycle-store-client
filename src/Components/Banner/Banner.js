import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

function Banner() {
  return (
    <div className='carousel-item-height d-flex h-full align-items-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-10'>
            <h1 className='text-light text-start'>
              <span className='bg-black'>
                Shop Your Desired{" "}
                <span className='banner-highlighted-text'>BiCycle</span> From Us
              </span>
            </h1>
            <h5 className='text-light text-start'>
              We provide you quality Bicycles
            </h5>
            <div className='d-flex'>
              <button className='btn-banner mt-4'>
                <Link to='/products' className='btn-banner-text'>
                  Explore Products
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
