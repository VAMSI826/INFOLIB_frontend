import React from "react";
import "./signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      uucms: data.uucms,
      course: data.course,
      semester: data.semester,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      userid: data.userid,
      password: data.password,
    };
    await axios
      .post(`https://infolib-backend.onrender.com/user/signup`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success(res.data.message);
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <section class="bg-image">
      <div class="container">
        <header>
          <b>Registration Form</b>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} class="form">
          <div class="input-box column">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              {...register("name", { required: true })}
            />

            <input
              type="text"
              id="regid"
              name="regid"
              placeholder="Enter your UUCMS ID"
              {...register("uucms", { required: true })}
            />
          </div>
          <div class="input-box column">
            <div class="select-box">
              <select {...register("gender", { required: true })}>
                <option hidden value="gender">
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <input
              type="tel"
              id="phoneno"
              name="phoneno"
              placeholder="Phone number"
              {...register("phone", { required: true })}
            />
          </div>
          <div class="column">
            <div class="select-box">
              <select {...register("course", { required: true })}>
                <option hidden value="course">
                  Course
                </option>
                <option value="B.Com Regular">B.Com Regular</option>
                <option value="B.Com A&F">B.Com A&F</option>
                <option value="BA">BA</option>
                <option value="BBA">BBA</option>
                <option value="BCA">BCA</option>
                <option value="BBA Aviation">BBA Aviation</option>
                <option value="BVA">BVA</option>
                <option value="B.Sc">B.Sc</option>
              </select>
            </div>
            <div class="select-box">
              <select {...register("semester", { required: true })}>
                <option hidden value="semester">
                  Semester
                </option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
              </select>
            </div>
          </div>
          <div class="input-box">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email address"
              {...register("email", { required: true })}
            />
          </div>
          <div class="input-box address">
            <div class="input-box">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                {...register("userid", { required: true })}
              />
            </div>
            <div class="column">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <input
                type="password"
                id="confirmpass"
                name="confirmpass"
                placeholder="Confirm password"
                {...register("confirmpass", { required: true })}
              />
            </div>
          </div>
          <div class="column">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
            <Toaster />
          </div>
        </form>
      </div>
    </section>
  );
}
