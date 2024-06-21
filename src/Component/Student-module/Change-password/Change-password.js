import React, { useState } from "react";
import "./Change-password.css";
import Box from "@mui/material/Box";
import Studsidebar from "../Sidebar/Studsidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { base_url } from "../../../urls.js";

export default function Changepassword() {
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [status3, setStatus3] = useState(false);
  const [inputType1, setInputtype1] = useState("password");
  const [inputType2, setInputtype2] = useState("password");
  const [inputType3, setInputtype3] = useState("password");

  const data = localStorage.getItem("Users");
  const studata = JSON.parse(data);
  const uucms = studata.uucms;

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      uucms: studata.uucms,
      password: data.password,
      newpassword: data.newpassword,
      confirmpassword: data.confirmpassword,
    };
    console.log(userInfo);
    await axios
      .post(`${base_url}/user/updatepass`, {
        data: userInfo,
      })
      .then((res) => {
        if (res.data) {
          toast.success(res.data.message, {
            toastStyle: {
              marginTop: "100px",
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          toastStyle: {
            marginTop: "100px",
          },
        });
      });
  };

  return (
    <Box sx={{ display: "flex" }} id="password-image">
      <Studsidebar />
      <Box sx={{ flexGrow: 1, m: -10 }}>
        <div className="password-container">
          <h2>Change Password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label id="currentPassword">Current Password:</label>
              <div className="input-icon">
                <input
                  type={inputType1}
                  id="password"
                  name="password"
                  {...register("password", { required: true })}
                />
                {status1 ? (
                  <i
                    style={{ zIndex: "2", color: "black" }}
                    class="bi bi-eye-fill stuicon-eye"
                    onClick={() => {
                      setStatus1(!status1);
                      setInputtype1("password");
                    }}
                  ></i>
                ) : (
                  <i
                    style={{ zIndex: "2", color: "black" }}
                    class="bi bi-eye-slash-fill stuicon-eye"
                    onClick={() => {
                      setStatus1(!status1);
                      setInputtype1("text");
                    }}
                  ></i>
                )}
              </div>
            </div>
            <div className="form-group">
              <label id="newPassword">New Password:</label>
              <div className="input-icon">
                <input
                  type={inputType2}
                  id="newpassword"
                  name="newpassword"
                  {...register("newpassword", { required: true })}
                />
                {status2 ? (
                  <i
                    style={{ zIndex: "2", color: "black" }}
                    class="bi bi-eye-fill stuicon-eye"
                    onClick={() => {
                      setStatus2(!status2);
                      setInputtype2("password");
                    }}
                  ></i>
                ) : (
                  <i
                    style={{ zIndex: "2", color: "black" }}
                    class="bi bi-eye-slash-fill stuicon-eye"
                    onClick={() => {
                      setStatus2(!status2);
                      setInputtype2("text");
                    }}
                  ></i>
                )}
              </div>
            </div>
            <div className="form-group">
              <label id="confirmPassword">Confirm Password:</label>
              <div className="input-icon">
                <input
                  type={inputType3}
                  id="confirmpassword"
                  name="confirmpassword"
                  {...register("confirmpassword", { required: true })}
                />
                {status3 ? (
                  <i
                    style={{ zIndex: "2", color: "black" }}
                    class="bi bi-eye-fill stuicon-eye"
                    onClick={() => {
                      setStatus3(!status3);
                      setInputtype3("password");
                    }}
                  ></i>
                ) : (
                  <i
                    style={{ zIndex: "2", color: "black" }}
                    class="bi bi-eye-slash-fill stuicon-eye"
                    onClick={() => {
                      setStatus3(!status3);
                      setInputtype3("text");
                    }}
                  ></i>
                )}
              </div>
            </div>
            <button className="Submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
        <Toaster />
      </Box>
    </Box>
  );
}
