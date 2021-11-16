import React, { useState } from "react";
import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useToastify from "../../../Hooks/useToastify";
import "./ProductAddForm.css";
const axios = require("axios");

function ProductAddForm() {
  const { toastSuccess, toastError } = useToastify();
  const { register, handleSubmit, reset } = useForm();
  const [clicked, setClicked] = useState(false);
  const onSubmit = (data) => {
    setClicked(true);
    axios
      .post("https://aqueous-escarpment-00747.herokuapp.com/product", data)
      .then(function (response) {
        if (response.data.insertedId) {
          toastSuccess("Product Added Successfully!!");
        }
      })
      .catch(function (error) {
        toastError(error.message + "Try Again");
      })
      .finally(() => setClicked(false));
    reset();
  };

  return (
    <div className='container'>
      <div className='row g-3 mt-3'>
        <div className='d-flex justify-content-center align-items-center h-100 my-3'>
          <div className='col-12 col-md-8 form-box-shadow px-3 px-md-5 py-3'>
            <h1 className='text-center my-3'>
              <span className='heading-text'>Add</span> Product
            </h1>
            <hr className='mb-3 mb-md-5' />
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
                    {...register("productName", { required: true })}
                    placeholder='Product Name'
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
                    {...register("productPrice", { required: true })}
                    placeholder='Price'
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextPassword'
              >
                <Form.Label column sm='3' className='d-none d-sm-block'>
                  Image
                </Form.Label>
                <Col sm='8'>
                  <Form.Control
                    type='url'
                    {...register("productImage", { required: true })}
                    placeholder='Image Link'
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextPassword'
              >
                <Form.Label column sm='3' className='d-none d-sm-block'>
                  Details
                </Form.Label>
                <Col sm='8'>
                  <Form.Control
                    as='textarea'
                    {...register("productDetails", { required: true })}
                    placeholder='Product Details'
                    style={{ height: "100px" }}
                  />
                </Col>
              </Form.Group>
              {clicked ? (
                <Spinner animation='border' className='spinner-color' />
              ) : (
                <Button type='submit' className='px-5 btn-custom'>
                  Submit
                </Button>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAddForm;
