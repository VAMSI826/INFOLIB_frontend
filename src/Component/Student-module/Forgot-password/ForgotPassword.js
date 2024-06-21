import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Toast } from "bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { base_url } from "../../../urls.js";

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitEmail = async (data) => {
    try {
      const response = await axios.post(`${base_url}/api/auth/send-otp`, {
        email: data.email,
      });
      toast.success(response.data.message);
      setEmail(data.email);
      setCurrentStep(2);
    } catch (error) {
      toast.error("Email ID not found", error.response.data.message);
    }
  };

  const onSubmitOTP = async (data) => {
    try {
      const response = await axios.post(`${base_url}/api/auth/verify-otp`, {
        email: data.email,
        otp: data.first + data.second + data.third + data.fourth,
      });

      toast.success(response.data.message);
      localStorage.setItem("resetToken", response.data.token);
      setCurrentStep(3);
    } catch (error) {
      toast.error(
        "Incorrect OTP please enter valid output",
        error.response.data.message
      );
    }
  };

  const onSubmitResetPassword = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await axios.post(`${base_url}/api/auth/reset-password`, {
        email: data.email,
        newPassword: data.newPassword,
        token: localStorage.getItem("resetToken"),
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error resetting password:", error.response.data.message);
    }
  };
  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        `${base_url}/api/auth/send-otp`,
        {
          email: email,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to resend OTP", error.response.data.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "smoke" }}>
      <div className="container">
        <div className="row justify-content-md-center mt-5">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow">
              <div className="row gy-3">
                <div className="col-12">
                  <div className="text-center">
                    <a href="#!">
                      <img
                        src="http://surl.li/tnzda"
                        alt="BootstrapBrain Logo"
                        width="175"
                        height="175"
                      />
                    </a>
                    <h2
                      style={{ fontFamily: "BARABARAFINALRegular" }}
                      className="text-center text-primary m-0 px-md-5"
                    >
                      INFOLIB
                    </h2>
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(
                  currentStep === 1
                    ? onSubmitEmail
                    : currentStep === 2
                    ? onSubmitOTP
                    : onSubmitResetPassword
                )}
              >
                {currentStep === 1 && (
                  <div className="col-12">
                    <h2 className="fs-6 fw-normal text-center text-secondary m-0 mt-3 px-md-5">
                      Provide the email address associated with your account to
                      receive OTP and update password.
                    </h2>
                    <label htmlFor="email" className="form-label mt-3">
                      Email <span className="text-danger">*</span>
                    </label>
                    <div className="input-group mt-3">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-envelope"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        {...register("email", { required: true })}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-danger">Email is required</span>
                    )}
                    <div className="col-12 mt-3">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="height-100 d-flex justify-content-center align-items-center">
                    <div className="position-relative">
                      <div className="p-2 text-center">
                        <h6>
                          Please enter the one-time password <br /> to verify
                          your account
                        </h6>
                        <div>
                          <span>A code has been sent to your email</span>
                        </div>
                        <div
                          id="otp"
                          className="inputs d-flex flex-row justify-content-center mt-2"
                        >
                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            id="first"
                            maxLength="1"
                            {...register("first", { required: true })}
                          />
                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            id="second"
                            maxLength="1"
                            {...register("second", { required: true })}
                          />
                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            id="third"
                            maxLength="1"
                            {...register("third", { required: true })}
                          />
                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            id="fourth"
                            maxLength="1"
                            {...register("fourth", { required: true })}
                          />
                        </div>
                        {(errors.first ||
                          errors.second ||
                          errors.third ||
                          errors.fourth) && (
                          <span className="text-danger">
                            All OTP fields are required to be filled
                          </span>
                        )}
                        <div className="mt-4">
                          <button className="btn btn-danger px-4 validate">
                            Validate
                          </button>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <span>Didn't get the code</span>
                        <button
                          className="btn btn-info text-decoration-none ms-3"
                          onClick={handleResendOTP}
                        >
                          Resend
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h1 className="fs-6 text-center text-secondary m-0 px-md-5">
                      Enter your new password.
                    </h1>
                    <div className="col-12 mt-5">
                      <label htmlFor="new-password" className="form-label">
                        New Password <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <svg
                            style={{ cursor: "pointer" }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-eye-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                          </svg>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="new-password"
                          {...register("newPassword", { required: true })}
                        />
                      </div>
                      {errors.newPassword && (
                        <span className="text-danger">
                          New password is required
                        </span>
                      )}
                    </div>
                    <div className="col-12 mt-3">
                      <label htmlFor="confirm-password" className="form-label">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <svg
                            style={{ cursor: "pointer" }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-eye-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                          </svg>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirm-password"
                          {...register("confirmPassword", { required: true })}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <span className="text-danger">
                          Confirm password is required
                        </span>
                      )}
                    </div>
                    <div className="col-12 mt-3">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Reset Password
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
