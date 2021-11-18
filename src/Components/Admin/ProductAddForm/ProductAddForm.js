import React, { useState } from "react";
import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useToastify from "../../../Hooks/useToastify";
import "./ProductAddForm.css";
const axios = require("axios");

function ProductAddForm() {
  const { toastSuccess, toastError, toastWarn } = useToastify();
  const { register, handleSubmit, reset } = useForm();
  const [clicked, setClicked] = useState(false);
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit = (data) => {
    setClicked(true);
    if (type === "" || size === 0) {
      toastError("You must submit a .PNG file and file size less than 1 mb");
      setClicked(false);
      return;
    }
    upload(data.productImage[0]);
    data.productImage = imageUrl;
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

  const upload = (img) => {
    var formData = new FormData();
    formData.append("image", img);
    axios
      .post(`https://api.imgbb.com/1/upload?&key=API_KEY`, formData)
      .then(function (response) {
        if (response.data.data.url) {
          setImageUrl(response.data.data.url);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setType("");
    setSize(0);
    const img = e.target.files[0];
    const imgType = img.type.split("/")[1];

    if (img.size > 1048576 || imgType !== "png") {
      toastWarn("Please select Only .PNG file and less then 1 mb file size ");
      return;
    }
    setType(imgType);
    setSize(img.size);
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
                    type='file'
                    {...register("productImage", { required: true })}
                    accept='image/png'
                    onChange={(e) => handleChange(e)}
                  />
                  <small className='d-flex text-warning'>
                    *Only (.png) file and highest 1mb size
                  </small>
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
