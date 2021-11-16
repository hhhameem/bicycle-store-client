import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Spinner } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://aqueous-escarpment-00747.herokuapp.com/products")
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navigation></Navigation>
      <div className='my-5 container'>
        <h1 className='mb-5'>
          <span style={{ borderBottom: "5px solid #3d8982" }}>
            Our Products
          </span>
        </h1>
        {products.length < 1 ? (
          <Spinner animation='border' />
        ) : (
          <Row xs={1} md={2} lg={3} className='g-4'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product}></ProductCard>
            ))}
          </Row>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default Products;
