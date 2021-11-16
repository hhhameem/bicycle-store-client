import React from "react";
import { Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import logo from "../../images/Ride.png";
import useToastify from "../../Hooks/useToastify";

function Registration() {
  const { emailRegistration, googleLogin } = useAuth();
  const { toastWarn } = useToastify();
  const { register, handleSubmit, reset } = useForm();
  const history = useHistory();
  const from = "/";

  const onSubmit = (data) => {
    if (data.password.length < 6) {
      toastWarn("Password must be at least 6 character long");
      return;
    }
    emailRegistration(data.email, data.password, data.name, history, from);
    reset();
  };
  const logoClicked = () => {
    history.push("/home");
  };

  return (
    <section className='vh-100'>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div className='card shadow-2-strong mb-5'>
              <div
                className='card-body p-5 text-center'
                style={{
                  backgroundColor: "rgb(212 241 238)",
                }}
              >
                <img
                  src={logo}
                  alt=''
                  style={{ height: "30px", width: "auto" }}
                  onClick={logoClicked}
                />
                <h3 className='my-3'>Registration</h3>
                <hr className='mb-5' />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Floating className='mb-3'>
                    <Form.Control
                      {...register("name", { required: true })}
                      id='floatingInputCustom'
                      type='text'
                      placeholder='Your Name'
                      style={{
                        borderRadius: "40px",
                      }}
                    />
                    <label
                      htmlFor='floatingInputCustom'
                      className='text-secondary'
                    >
                      Name
                    </label>
                  </Form.Floating>
                  <Form.Floating className='mb-3'>
                    <Form.Control
                      {...register("email", { required: true })}
                      id='floatingInputCustom'
                      type='email'
                      placeholder='name@example.com'
                      style={{
                        borderRadius: "40px",
                      }}
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
                      {...register("password", { required: true })}
                      id='floatingInputCustom'
                      type='password'
                      placeholder='name@example.com'
                      style={{
                        borderRadius: "40px",
                      }}
                    />
                    <label
                      htmlFor='floatingInputCustom'
                      className='text-secondary'
                    >
                      Password
                    </label>
                  </Form.Floating>

                  <input
                    type='submit'
                    value='Register'
                    className='btn-custom btn-lg btn-block text-black px-5 mb-3'
                  />
                </form>
                <hr className='my-2' />
                <button
                  onClick={() => googleLogin(history, from, true)}
                  className='btn-custom btn-lg btn-block text-black px-5 mb-3'
                  type='submit'
                >
                  <FcGoogle /> Google
                </button>
                <div>
                  <p className='mb-0'>
                    Already have an account?{" "}
                    <Link to='/login' className='text-black fw-bold'>
                      Login Here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
