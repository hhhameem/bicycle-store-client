import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { _id, productName, productPrice, productImage, productDetails } =
    product;
  return (
    <Col>
      <Card style={{ borderRadius: "15px" }}>
        <Card.Title className='p-3 product-card-heading'>
          {productName}
        </Card.Title>
        <Card.Img
          variant='bottom'
          style={{
            height: "200px",
            borderRadius: "15px 15px 0px 0px",
            borderBottom: "2px solid rgb(236, 54, 109)",
          }}
          src={productImage}
        />
        <Card.Body>
          <Card.Title className='price'>Price: ${productPrice}</Card.Title>
          <Card.Text
            style={{
              height: "100px",
              overflow: "hidden",
              textOverflow: "elipsis",
            }}
          >
            {productDetails}
          </Card.Text>
          <Button className='btn-custom' as={Link} to={`/products/${_id}`}>
            Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
