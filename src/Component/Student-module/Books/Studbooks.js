import React, { useState, useEffect } from "react";
import "./Studbooks.css";
import { Row } from "react-bootstrap";
import Box from "@mui/material/Box";
import Studsidebar from "../Sidebar/Studsidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { base_url } from "../../../urls.js";

const data = localStorage.getItem("Users");
console.log(data);
const studata = JSON.parse(data);
console.log(studata);

const addSlot = async (uucms, barcode) => {
  await axios
    .post(`${process.env.base_url}/slot/addslot`, {
      data: { uucms, barcode },
    })
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

export default function StudBooks() {
  const [search, setSearch] = useState("");
  const [bookdetails, setBookDetails] = useState([]);

  useEffect(() => {
    const getStudBook = async () => {
      try {
        const res = await axios.get(`${process.env.base_url}/book/bookdetails`);
        setBookDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudBook();
  }, []);

  const filteredBooks = bookdetails.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Studsidebar />
      <Box sx={{ flexGrow: 1, m: -10 }}>
        <div className="book-container">
          <div className="head">
            <h1>BOOKS</h1>
            <div className="input-wrapper mt-3">
              <i className="fa fa-search"></i>
              <input
                type="search"
                placeholder="Enter book name"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="stud-book-content">
            <Row>
              {filteredBooks.length === 0 ? (
                <p class="text-align-center justify-content-center">
                  No records found
                </p>
              ) : (
                filteredBooks.map((v, i) => {
                  return <Details bitems={v} />;
                })
              )}
            </Row>
          </div>
        </div>
      </Box>
    </Box>
  );
}

function Details({ bitems }) {
  return (
    <div className="col-3 mb-5">
      <div className="card" style={{ width: "18rem", height: "38rem" }}>
        <img
          src={bitems.imagelink}
          className="card-img-top"
          alt={bitems.title}
        />
        <div className="card-body grid-box">
          <h5 className="card-title">{bitems.title}</h5>
          <h5 className="card-text">Author: {bitems.author}</h5>
          <div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => {
                addSlot(studata.uucms, bitems.barcode);
              }}
            >
              Book your slot
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
