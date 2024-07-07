import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function FirstPage() {
  const navigate = useNavigate();

  return (
    <div class="Container">
      <div className="first-half">
        <div className="logo-section">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQMKwzp2krDtu-kCPe_UstrYpbU9LFLWBW6kTPU5lvJtuED0jucpFr3dbQUCEyKBEAYzUCgrtiiVKdSPmfaaVMNDKfFGvAq0wrZRAqPRtnhNnPYRi4UeSmxsdiRe68I2IwVzjfCLYqT6F6VgGqb-7VvOpJSCzE6_5ZCM4dv-3lgOCI4T7gpCCHI8jTAdpf/s1600/tree.png"
            class="logo"
          ></img>
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
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkdM66v-3ApcnNx8hxlRAG1J18B5q85O-16fFr6sGdMGQWjzlUCLUgigIC7RMBBuq0JRwgbO5rEuEI3_BZ00ed8eiElPvy02C9GWFWJeyUB5feQM_ikQsxpXVo3T9VndFxj3VxGxt9FRr49ykuMRZ9YW7xn8VrvQHU7v3tyj4Q3k7rvBaLj4Nmgo_iZLVk/w622-h581/ppl.png"
          class="right-image"
        ></img>
      </div>
    </div>
  );
}
export default FirstPage;
