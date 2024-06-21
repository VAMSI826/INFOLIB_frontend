import React, { useState } from "react";
import "./StudSidebars.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import Tooltip from "@mui/material/Tooltip";
import toast, { Toaster } from "react-hot-toast";

const Studsidebar = () => {
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    toast.success("Logout Successful");
    setTimeout(() => {
      window.location.replace("/Student-login");
      localStorage.clear();
    }, 800);
  };

  return (
    <main className={show ? "space-toggle" : null}>
      <header className={`header ${show ? "space-toggle" : null}`}>
        <div className="header-toggle" onClick={() => setShow(!show)}>
          <div className="sidebar-heading">
            <i
              className={`fas fa-bars ${show ? "fa-solid fa-xmark" : null}`}
            ></i>
            <img src="http://surl.li/tnzda" className="adminsidebar-logo"></img>
            <p class="mt-1 sidebar-title">INFOLIB</p>
          </div>
        </div>
      </header>
      <aside className={`sidebar ${show ? "show" : null}`}>
        <nav className="nav">
          <div>
            <div className="nav-logo">
              <i className={`fas fa-home-alt nav-logo-icon`}></i>
              <span className="nav-logo-name">INFOLIB</span>
            </div>

            <div className="nav-list">
              <Link to="/Profile" className="nav-link ">
                <Tooltip title="MY PROFILE" placement="right">
                  <i className="fas fa-user nav-link-icon"></i>
                </Tooltip>
                <span className="nav-link-name">MY PROFILE</span>
              </Link>
              <Link to="/StudentBooks" className="nav-link ">
                <Tooltip title="BOOKS" placement="right">
                  <i className="fas fa-book nav-link-icon"></i>
                </Tooltip>
                <span className="nav-link-name">BOOKS</span>
              </Link>

              <Link to="/Notification" className="nav-link">
                <Tooltip title="NOTIFICATIONS" placement="right">
                  <i className="fas fa-solid fa-bell nav-link-icon"></i>
                </Tooltip>
                <span className="nav-link-name">NOTIFICATIONS</span>
              </Link>
              <Link to="/Changepassword" className="nav-link">
                <Tooltip title="CHANGE PASSSWORD" placement="right">
                  <i className="fa-solid fa-key nav-link-icon"></i>
                </Tooltip>
                <span
                  className="nav-link-name"
                  style={{ width: "min-content" }}
                >
                  CHANGE PASSWORD
                </span>
              </Link>
            </div>
          </div>
          <Link className="nav-link" onClick={handleLogout}>
            <Tooltip title="Logout" placement="right">
              <i className="fas fa-sign-out nav-link-icon"></i>
            </Tooltip>
            <span className="nav-link-name">Logout</span>
                     
          </Link>
        </nav>
      </aside>
      <Toaster />
    </main>
  );
};

export default Studsidebar;
