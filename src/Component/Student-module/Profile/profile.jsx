import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Studsidebar from "../Sidebar/Studsidebar";
import "./profile.css";
import axios from "axios";
import { base_url } from "../../../urls.js";

export default function Profile() {
  const data = localStorage.getItem("Users");
  const studata = JSON.parse(data);
  console.log(studata);
  const [borrow, setBorrowed] = useState([]);
  useEffect(() => {
    const getBorrowed = async () => {
      try {
        const res = await axios.get(`${base_url}/borrowed/getBorrow`);
        setBorrowed(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBorrowed();
  }, []);

  const studentBorrowedBooks = borrow.filter(
    (book) => book.uucms === studata.uucms
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Studsidebar />
      <Box sx={{ flexGrow: 1, m: -10 }}>
        <section style={{ backgroundColor: "#eee" }}>
          <div class="container profile py-5 mt-5">
            <div class="col">
              <div class="col-lg-4 mb-4">
                <div class="card mb-4 ">
                  <div class="card-body text-center">
                    {studata.gender === "Male" ? (
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        class="rounded-circle img-fluid mt-3"
                        style={{ width: "150px" }}
                      />
                    ) : (
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1.webp"
                        alt="avatar"
                        class="rounded-circle img-fluid mt-3"
                        style={{ width: "150px" }}
                      />
                    )}
                    <h5 class="my-3">{studata.name}</h5>
                    <p class="text-muted mb-2">{studata.uucms}</p>
                    <p class="text-muted mb-4">{studata.userid}</p>
                  </div>
                </div>
                <div class="col-xl-8">
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Full Name</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">{studata.name}</p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Course</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">{studata.course}</p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Semester</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">{studata.semester}</p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Email ID</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">{studata.email}</p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Phone Number</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">{studata.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {studata.borrowedbookscnt === 0 ? (
                  <div
                    style={{ width: "80rem" }}
                    class="justify-content-center align-items-center text-align-center"
                  >
                    <p>
                      <b>No Books borrowed</b>
                    </p>
                  </div>
                ) : (
                  studentBorrowedBooks.map((book, i) => (
                    <div
                      class="card mb-5 mt-2 mb-lg-0"
                      style={{ width: "73rem" }}
                      id="icons"
                    >
                      <div class="card-body mt-2 p-0">
                        <ul class="list-group list-group-flush rounded-3">
                          <li class="list-group-item d-flex justify-content-flex-start align-items-center ">
                            <i class="bi bi-book-half p-2"></i>
                            <p class="mb-0 p-2">Book title:</p>
                            <p class="mb-0 p-2">{book.title}</p>
                          </li>
                          <li class="list-group-item d-flex justify-content-flex-start align-items-center ">
                            <i class="bi bi-calendar-plus p-2"></i>
                            <p class="mb-0 p-2">Issued date:</p>
                            <p class="mb-0 p-2">{book.borroweddate}</p>
                          </li>
                          <li class="list-group-item d-flex justify-content-flex-start align-items-center ">
                            <i class="bi bi-calendar-minus p-2"></i>
                            <p class="mb-0 p-2">Return/Renewal date:</p>
                            <p class="mb-0 p-2">{book.returndate}</p>
                          </li>
                          <li class="list-group-item d-flex justify-content-flex-start align-items-center ">
                            <i class="bi bi-currency-rupee p-2"></i>
                            <p class="mb-0 p-2">Fine:</p>
                            <p class="mb-0 p-2">{book.fine}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </Box>
    </Box>
  );
}
