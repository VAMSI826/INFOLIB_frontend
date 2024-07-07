import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function FirstPage() {
  const navigate = useNavigate();

  return (
    <div class="Container">
      <div className="first-half">
        <div className="logo-section">
          <img src="https://ibb.co/9w1hCWP" class="logo"></img>
          <h1 class="mt-5 title">INFOLIB</h1>
        </div>
        <div class="content mt-5">
          <ul>
            <li>CHECK AVAILABILITY</li>
            <li>RESERVE BOOKS</li>
            <li>RECEIVE UPDATES ON NEW ADDITION </li>
          </ul>
        </div>
        <div class="buttons mt-5">
          <button
            class="rounded-pill  button"
            onClick={() => navigate("/Admin-login")}
          >
            <i class="fa fa-user" /> ADMIN LOGIN
          </button>
          <button
            class="rounded-pill  button"
            onClick={() => navigate("/Student-login")}
          >
            <i class="fa fa-graduation-cap" /> STUDENT LOGIN
          </button>
        </div>
      </div>
      <div className="second-half">
        <img src="https://ibb.co/VxgTyc9" class="right-image"></img>
      </div>
    </div>
  );
}
export default FirstPage;
