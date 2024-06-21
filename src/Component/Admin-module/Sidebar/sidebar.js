import React, { useState } from "react";
import "./Sidebars.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import Tooltip from "@mui/material/Tooltip";
import toast, { Toaster } from "react-hot-toast";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [bookvisible, setBookVisible] = useState(false);
  const [studvisible, setStudVisible] = useState(false);
  const handleLogout = () => {
    toast.success("Logout Successful");
    setTimeout(() => {
      localStorage.clear();
      window.location.replace("/Admin-login");
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
            <img src="http://surl.li/tnzda" className="adminsidebar-logo" />
            <p class="mt-1 sidebar-title">INFOLIB</p>
          </div>
        </div>
      </header>

      <aside className={`sidebar ${show ? "show" : null}`}>
        <nav className="nav">
          <div>
            <div className="nav-logo">
              <Link to="/admin">
                <i className={`fas fa-home-alt nav-logo-icon`}></i>
              </Link>
              <span className="nav-logo-name">INFOLIB</span>
            </div>

            <div className="nav-list">
              <div
                className="nav-link "
                onClick={() => setBookVisible(!bookvisible)}
              >
                <Tooltip title="BOOKS" placement="right">
                  <i className="bi bi-book-half nav-link-icon"></i>
                </Tooltip>
                <span className="nav-link-name">
                  BOOKS{" "}
                  <i
                    class="fa fa-caret-down nav-link-icon"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              {bookvisible && (
                <div className="book-dropdown">
                  <hr />
                  <Link to="/View-book-details" className="nav-link">
                    <Tooltip title="BOOK DETAILS" placement="right">
                      <i className="bi bi-info-circle-fill nav-link-icon"></i>
                    </Tooltip>
                    <span className="nav-link-name">BOOK DETAILS</span>
                  </Link>
                  <Link to="/Add-a-book" className="nav-link">
                    <Tooltip title="ADD A BOOK" placement="right">
                      <i className="bi bi-journal-plus nav-link-icon"></i>
                    </Tooltip>
                    <span className="nav-link-name">ADD A BOOK</span>
                  </Link>
                  <Link to="/Borrowed-books" className="nav-link">
                    <Tooltip title="BORROWED BOOKS" placement="right">
                      <i className="fa-solid fa-book-open-reader nav-link-icon"></i>
                    </Tooltip>
                    <span
                      className="nav-link-name"
                      style={{ width: "min-content" }}
                    >
                      BORROWED BOOKS
                    </span>
                  </Link>
                  <hr />
                </div>
              )}
              <Link to="/Slots" className="nav-link ">
                <Tooltip title="SLOTS" placement="right">
                  <i className="fas fa-solid fa-check-to-slot nav-link-icon"></i>
                </Tooltip>
                <span className="nav-link-name">SLOTS</span>
              </Link>
              <div
                className="nav-link"
                onClick={() => setStudVisible(!studvisible)}
              >
                <Tooltip title="STUDENTS" placement="right">
                  <i className="bi bi-people-fill nav-link-icon"></i>
                </Tooltip>
                <span className="nav-link-name">
                  STUDENTS{" "}
                  <i
                    class="fa fa-caret-down nav-link-icon"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              {studvisible && (
                <div className="stud-dropdown">
                  <hr />
                  <Link to="/View-student-details" className="nav-link">
                    <Tooltip title="STUDENT DETAILS" placement="right">
                      <i className="bi bi-person-check nav-link-icon"></i>
                    </Tooltip>
                    <span
                      className="nav-link-name"
                      style={{ width: "min-content" }}
                    >
                      STUDENT DETAILS
                    </span>
                  </Link>
                  <Link to="/Add-a-student" className="nav-link">
                    <Tooltip title="ADD A STUDENT" placement="right">
                      <i className="bi bi-person-fill-add nav-link-icon"></i>
                    </Tooltip>
                    <span className="nav-link-name">ADD A STUDENT</span>
                  </Link>
                  <hr />
                </div>
              )}
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

export default Sidebar;
