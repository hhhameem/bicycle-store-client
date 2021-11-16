import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useToastify from "../../Hooks/useToastify";
import logo from "../../images/Ride.png";

function Login() {
  const { emailLogin, googleLogin } = useAuth();
  const { toastWarn } = useToastify();
  const { register, handleSubmit, reset } = useForm();
  const location = useLocation();
  const history = useHistory();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    if (data.password.length < 6) {
      toastWarn("Password must be 6 character long");
      return;
    }
    emailLogin(data.email, data.password, history, from);
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
                <h3 className='my-3'>Sign in</h3>
                <hr className='mb-5' />
                <form onSubmit={handleSubmit(onSubmit)}>
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
                      placeholder='*****************'
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
                    className='btn-custom btn-lg btn-block text-black px-5 mb-3'
                    type='submit'
                    value='Login'
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
                    Don't have an account?{" "}
                    <Link to='/register' className='text-black fw-bold'>
                      Register Here
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

export default Login;
