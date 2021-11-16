import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import useToastify from "../../../Hooks/useToastify";

function WriteReview() {
  const { user } = useAuth();
  const { toastSuccess, toastError } = useToastify();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const reviewData = {
      username: user.displayName,
      userEmail: user.email,
      ...data,
    };
    axios
      .post("https://aqueous-escarpment-00747.herokuapp.com/review", reviewData)
      .then(function (response) {
        if (response.data.insertedId) {
          reset();
          toastSuccess("Review Posted Successfully");
        }
      })
      .catch(function (error) {
        toastError(error.message + "Try Again");
      });
  };

  return (
    <div className='container'>
      <div className='row g-3 mt-3'>
        <div className='d-flex justify-content-center align-items-center h-100 my-3'>
          <div className='col-12 col-md-8 form-box-shadow px-3 px-md-5 py-3'>
            <h1 className='text-center my-3'>
              Write <span className='heading-text'>Review</span>
            </h1>
            <hr className='mb-3 mb-md-5' />
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextPassword'
              >
                <Form.Label column sm='3' className='d-none d-sm-block'>
                  Rating
                </Form.Label>
                <Col sm='8'>
                  <Form.Control
                    type='number'
                    {...register("rating", {
                      required: true,
                      max: 5,
                      min: 0,
                    })}
                    step='0.1'
                    placeholder='Rating in 5'
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className='mb-3'
                controlId='formPlaintextPassword'
              >
                <Form.Label column sm='3' className='d-none d-sm-block'>
                  Review
                </Form.Label>
                <Col sm='8'>
                  <Form.Control
                    as='textarea'
                    {...register("review", { required: true })}
                    placeholder='Write Review'
                    style={{ height: "100px" }}
                  />
                </Col>
              </Form.Group>
              <Button type='submit' className='px-5 btn-custom'>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteReview;
