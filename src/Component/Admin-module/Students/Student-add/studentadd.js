import React from "react";
import "./studentadd.css";
import Box from "@mui/material/Box";
import Sidebar from "../../Sidebar/sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { base_url } from "../../../../urls.js";

export default function Studentadd() {
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = async (data) => {
    const studentInfo = {
      name: data.name,
      uucms: data.uucms,
      course: data.course,
      semester: data.semester,
    };
    await axios
      .post(`${process.env.base_url}/Student/register`, studentInfo)
      .then((res) => {
        if (res.data) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, m: -10 }}>
        <div className="full-box">
          <div className="bg-image">
            <div className="container">
              <header>
                <b>REGISTER A STUDENT</b>
              </header>
              <p className="mt-2">
                Enter the following details to Register a student
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                class="form"
                id="studform"
              >
                <div class="input-box">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    id="name"
                    {...register("name", { required: true })}
                  />
                  <input
                    class="mt-3"
                    type="text"
                    name="uucms"
                    id="uucms"
                    placeholder="UUCMS ID"
                    {...register("uucms", { required: true })}
                  />
                </div>
                <div>
                  <div class="select-box mt-3">
                    <select {...register("course", { required: true })}>
                      <option hidden value="course">
                        Course
                      </option>
                      <option value="B.Com Regular">B.Com Regular</option>
                      <option value="B.Com A&F">B.Com A&F</option>
                      <option value="BA">BA</option>
                      <option value="BBA">BBA</option>
                      <option value="BCA">BCA</option>
                      <option value="BBA">BBA Aviation</option>
                      <option value="BVA">BVA</option>
                      <option value="B.Sc">B.Sc</option>
                    </select>
                  </div>
                  <div class="select-box mt-3">
                    <select {...register("semester", { required: true })}>
                      <option hidden value="Semester">
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
                <div class="column">
                  <button type="submit">Submit</button>
                  <button type="reset">Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </Box>
    </Box>
  );
}
