import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../Sidebar/sidebar";
import "./adminhome.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dotenv from "dotenv";

export default function Home() {
  const [book, setBook] = useState([]);
  const [stud, setStud] = useState([]);
  const [borrow, setBorrowed] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const get = async () => {
      try {
        const res1 = await axios.get(
          `${process.env.base_url}/book/bookdetails`
        );
        setBook(res1.data);
        const res2 = await axios.get(`${process.env.base_url}/user/getStud`);
        setStud(res2.data);
        const res3 = await axios.get(
          `${process.env.base_url}/borrowed/getBorrow`
        );
        setBorrowed(res3.data);
        const res4 = await axios.get(`${process.env.base_url}/slot/slots`);
        setSlots(res4.data);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, m: 0 }}>
        <div className="admin-container-fluid">
          <div className="admin-head">
            <div className="admin-title mb-4">
              <h1
                className="h2 mb-0 text-gray-800"
                style={{ fontFamily: "BARABARAFINALRegular" }}
              >
                ADMIN DASHBOARD
              </h1>
            </div>
          </div>

          <div className="row  m-2" style={{ marginRight: "1rem" }}>
            <div
              class="card text-white bg-warning m-2 mb-3 col-lg-4"
              style={{ width: "26.5rem" }}
            >
              <div className=" py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        BOOKS (Total)
                      </div>
                      <div className="h2 mt-2 mb-0 fs-xl-6 font-weight-bold text-gray-800">
                        {book.length}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-book-half fa-5x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <Link
                  to={"/View-book-details"}
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  View Book details
                </Link>
              </div>
            </div>

            <div
              class="card text-white bg-secondary m-2 mb-3  col-lg-4"
              style={{ width: "26.5rem" }}
            >
              <div className=" py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        BORROWED BOOKS(Total)
                      </div>
                      <div className="h2 mt-2 mb-0 fs-xl-6 font-weight-bold text-gray-800">
                        {borrow.length}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-journal-bookmark-fill fa-5x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <Link
                  to={"/Borrowed-books"}
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  View Borrowed Book details
                </Link>
              </div>
            </div>

            <div
              class="card text-white bg-danger m-2 mb-3 col-lg-4"
              style={{ width: "26.5rem" }}
            >
              <div className=" py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        STUDENTS (Total)
                      </div>
                      <div className="h2 mt-2 mb-0 fs-xl-6 font-weight-bold text-gray-800">
                        {stud.length}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-people-fill fa-5x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <Link
                  to={"/View-student-details"}
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  View Student details
                </Link>
              </div>
            </div>

            <div
              class="card text-white bg-success m-2 mb-3 col-lg-4"
              style={{ width: "26.5rem" }}
            >
              <div className=" py-4">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col">
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        SLOTS (Today)
                      </div>
                      <div className="h2 mt-2 mb-0 fs-xl-6 font-weight-bold text-gray-800">
                        {slots.length}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className=" fa-solid fa-check-to-slot fa-5x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <Link
                  to={"/Slots"}
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  View new Slots
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}
