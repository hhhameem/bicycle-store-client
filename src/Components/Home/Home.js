import React, { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import ProductCard from "../ProductCard/ProductCard";
import Reviews from "../Reviews/Reviews";
import Footer from "../Shared/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import "./Home.css";
const axios = require("axios");

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://aqueous-escarpment-00747.herokuapp.com/products")
      .then(function (response) {
        setProducts(response.data.slice(0, 6));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navigation></Navigation>
      <Banner></Banner>
      <div className='my-5 container'>
        <h1 className='mb-5'>
          <span className='heading-text'>Featured</span> Products
        </h1>
        {products.length < 1 ? (
          <Spinner animation='border' className='spinner-color' />
        ) : (
          <Row xs={1} md={2} lg={3} className='g-4'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product}></ProductCard>
            ))}
          </Row>
        )}
      </div>
      <Reviews></Reviews>
      <ContactUs></ContactUs>
      <Footer></Footer>
    </div>
  );
}

export default Home;
