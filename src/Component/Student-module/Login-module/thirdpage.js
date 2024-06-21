import React, { useState } from "react";
import "./thirdpage.css";
import Studentlogin from "./Studentlogin";

export default function Thirdpage() {
  return (
    <div class="container-fluid">
      <div className="white">
        <div>
          <Studentlogin></Studentlogin>
        </div>
      </div>
      <div className="blue">
        <img
          src="http://surl.li/tnzfb" className="stud-image"
          alt="hd"
        />
      </div>
    </div>
  );
}
