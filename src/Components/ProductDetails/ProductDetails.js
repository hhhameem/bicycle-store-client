import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";
import useToastify from "../../Hooks/useToastify";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const { toastSuccess, toastError } = useToastify();

  const onSubmit = (data) => {
    const orderDetails = {
      status: "pending",
      productId: id,
      productName: product.productName,
      ...data,
    };
    axios
      .post(
        "https://aqueous-escarpment-00747.herokuapp.com/saveorder",
        orderDetails
      )
      .then(function (response) {
        if (response.data.insertedId) {
          reset();
          toastSuccess("Order Placed Successfully!!");
        }
      })
      .catch(function (error) {
        toastError(error.message + " cannot process the order");
      });
  };

  useEffect(() => {
    axios
      .get(`https://aqueous-escarpment-00747.herokuapp.com/product/${id}`)
      .then(function (response) {
        setProduct(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <Navigation></Navigation>
      <div className='container mt-5'>
        {product.length < 1 ? (
          <Spinner animation='border' className='spinner-color mb-5' />
        ) : (
          <div className='row g-4 mb-5'>
            <div className='col-12 col-md-6 g-4'>
              <h3 className='text-center mb-5'>{product?.productName}</h3>
              <img
                src={product?.productImage}
                alt=''
                className='img-fluid mb-3'
              />
              <div className='mx-3 text-start'>
                <h4 className='mb-3'>Price: ${product?.productPrice}</h4>
                <pre>{product?.productDetails}</pre>
              </div>
            </div>
            <div className='col-12 col-md-6 g-4'>
              <h2 className='text-center mb-5'>
                {" "}
                <span className='heading-text'>Order</span> Form
              </h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='formPlaintextPassword'
                >
                  <Form.Label column sm='3' className='d-none d-sm-block'>
                    Name
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      type='text'
                      readOnly
                      defaultValue={user.displayName}
                      {...register("name")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='formPlaintextPassword'
                >
                  <Form.Label column sm='3' className='d-none d-sm-block'>
                    Email
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      type='email'
                      readOnly
                      defaultValue={user.email}
                      {...register("email")}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='formPlaintextPassword'
                >
                  <Form.Label column sm='3' className='d-none d-sm-block'>
                    Price
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      type='number'
                      readOnly
                      defaultValue={product?.productPrice}
                      {...register("price", { required: true })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='formPlaintextPassword'
                >
                  <Form.Label column sm='3' className='d-none d-sm-block'>
                    Address
                  </Form.Label>
                  <Col sm='8'>
                    <Form.Control
                      as='textarea'
                      placeholder='Delivery Address'
                      style={{ height: "100px" }}
                      {...register("address", { required: true })}
                    />
                  </Col>
                </Form.Group>
                <Button type='submit' className='px-5 btn-custom'>
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ProductDetails;
