import React, { useState } from "react";
import "./Studentlogin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { base_url } from "../../../urls.js";

const notify = () => toast("Here is your toast.");
export default function Studentlogin() {
  const navigate = useNavigate();
  const [status4, setStatus4] = useState(false);
  const [inputType4, setInputtype4] = useState("password");
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      userid: data.userid,
      password: data.password,
    };
    await axios
      .post(`${process.env.base_url}/user/login`, userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Login Successfull");
          setTimeout(() => {
            navigate("/Profile");
          }, 1000);
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  window.onload = function () {
    window.history.replaceState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.replaceState(null, null, window.location.href);
    };
  };

  return (
    <section class=" py-4 py-md-5 login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="">
            <div class="card border border-light-subtle rounded-3 shadow-sm ">
              <div class="card-body form-body ">
                <div class="text-center mb-3">
                  <a href="#!">
                    <img src="http://surl.li/tnzda" width="150" height="150" />
                  </a>
                  <h2 class="fs-6  text-center mb-4 title-student ">INFOLIB</h2>
                </div>
                <h2 class="fs-6 fw-normal text-center text-secondary mb-4">
                  Sign in to your account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="row gy-2 ">
                    <div class="col-12">
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control col-lg-4"
                          name="userid"
                          id="userid"
                          placeholder="Username"
                          {...register("userid", { required: true })}
                        />
                        <label for="username" class="form-label">
                          Username
                        </label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating form-in mb-3 d-flex inline-flex">
                        <input
                          type={inputType4}
                          class="form-control col-lg-4"
                          name="password"
                          id="password"
                          placeholder="Password"
                          {...register("password", { required: true })}
                        />
                        <label for="password" class="form-label">
                          Password
                        </label>
                        {status4 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8vw"
                            height="8vh"
                            fill="currentColor"
                            class="bi bi-eye-fill stuicon-eye mr-4"
                            style={{ marginRight: "1rem" }}
                            onClick={() => {
                              setStatus4(!status4);
                              setInputtype4("password");
                            }}
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8vw"
                            height="8vh"
                            fill="currentColor"
                            class="bi bi-eye-slash stuicon-eye mr-4"
                            style={{ marginRight: "1rem" }}
                            onClick={() => {
                              setStatus4(!status4);
                              setInputtype4("text");
                            }}
                            viewBox="0 0 16 16"
                          >
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="d-flex gap-2 justify-content-between">
                        <a
                          href="/ForgotPassword"
                          class="link-primary text-decoration-none"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="d-grid my-3">
                        <button
                          class="btn btn-primary btn-lg fs-lg-5"
                          type="submit"
                        >
                          Log in
                        </button>
                        <Toaster />
                      </div>
                    </div>
                    <div class="col-12">
                      <p class=" fs-6 m-0 text-secondary text-center">
                        Don't have an account?{" "}
                        <button
                          class="btn btn-link"
                          onClick={() => navigate("/Sign-up")}
                        >
                          Sign up
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
