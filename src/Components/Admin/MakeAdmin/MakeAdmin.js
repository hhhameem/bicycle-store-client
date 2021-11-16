import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import useToastify from "../../../Hooks/useToastify";

function MakeAdmin() {
  const { toastError, toastSuccess, toastInfo } = useToastify();
  const [clicked, setClicked] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setClicked(true);
    axios
      .put("https://aqueous-escarpment-00747.herokuapp.com/makeadmin", data)
      .then(function (response) {
        if (response.data.modifiedCount > 0) {
          toastSuccess("Admin Role Assigned Successfully");
        } else if (
          response.data.modifiedCount === 0 &&
          response.data.matchedCount >= 1
        ) {
          toastInfo("Already an Admin");
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
              Admin <span className='heading-text'>Assign</span>
            </h1>
            <hr className='mb-3 mb-md-5' />
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("email", { required: true })}
                    placeholder='Email'
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

export default MakeAdmin;
