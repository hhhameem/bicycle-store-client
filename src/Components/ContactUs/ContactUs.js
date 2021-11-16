import React from "react";
import { Form } from "react-bootstrap";
import { FiSend } from "react-icons/fi";
import "./ContactUs.css";
import contact from "../../images/contactUs.png";

function ContactUs() {
  return (
    <>
      <h1>
        <span className='heading-text'>Contact</span> Us
      </h1>
      <div className='bg-map mt-5'>
        <div className='container'>
          <div className='row align-items-center' style={{ height: "400px" }}>
            <div
              className='d-none d-md-block col-md-6'
              style={{ padding: "0px 0px" }}
            >
              <img
                src={contact}
                alt=''
                style={{
                  height: "300px",
                  width: "100%",
                  padding: "0px 0px 0px 0px",
                }}
              />
            </div>
            <div className='col-12 col-md-6'>
              <div className='mx-md-5'>
                <Form.Floating className='mb-3'>
                  <Form.Control
                    id='floatingInputCustom'
                    type='email'
                    placeholder='Your Email'
                    style={{ borderRadius: "10px", width: "100%" }}
                  />
                  <label
                    htmlFor='floatingInputCustom'
                    className='text-secondary'
                  >
                    Email
                  </label>
                </Form.Floating>

                <Form.Floating className='mb-3'>
                  <Form.Control
                    as='textarea'
                    placeholder='Your Message'
                    style={{ height: "100px", borderRadius: "10px" }}
                  />
                  <label
                    htmlFor='floatingInputCustom'
                    className='text-secondary'
                  >
                    Your Message
                  </label>
                </Form.Floating>

                <button
                  className='btn-custom btn-lg btn-block text-black px-5 mb-3'
                  type='button'
                >
                  Send <FiSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
