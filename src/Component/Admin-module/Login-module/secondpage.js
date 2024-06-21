import React from "react";
import "./style2.css";
import Adminlogin from "./Adminlogin.jsx";

export default function Secondpage() {
  return (
    <div class="login-container">
      <div className="blue-side">
        <img src="http://surl.li/tnzel" className="Admin-image" alt="hd" />
      </div>
      <div className="white-side">
        <Adminlogin></Adminlogin>
      </div>
    </div>
  );
}
