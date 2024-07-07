import React, { useState, useEffect } from "react";
import "./borrowedbooks.css";
import Sidebar from "../../Sidebar/sidebar";
import Box from "@mui/material/Box";
import axios from "axios";

export default function Borrowedbooks() {
  const [search, setSearch] = useState("");
  const [borrow, setBorrowed] = useState([]);
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBorrowed = async () => {
      try {
        const res1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/borrowed/getBorrow`);
        const res2 = await axios.get(`${process.env.REACT_APP_BASE_URL}/book/bookdetails`);
        setBorrowed(res1.data);
        setBook(res2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBorrowed();
  }, []);

  const filtered = borrow.filter((v) => {
    return search.toLowerCase() === ""
      ? v
      : v.title.toLowerCase().includes(search) ||
          v.name.toLowerCase().includes(search);
  });

  const booksMap = filtered.reduce((acc, borrow) => {
    if (!acc[borrow.title]) {
      acc[borrow.title] = [];
    }
    acc[borrow.title].push(borrow.name);
    return acc;
  }, {});

  const getAvailableCopies = (title) => {
    const borrowedBooks = borrow.filter((v) => v.title === title);
    const bookDetails = book.find((v) => v.title === title);
    if (borrowedBooks.length && bookDetails) {
      return bookDetails.copies;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, m: -10 }}>
        <div className="borrow-container">
          <div className="borrow-head">
            <h1>LIST OF BORROWED BOOKS</h1>
            <div className="input-wrapper mt-3">
              <i class="fa fa-search"></i>
              <input
                type="search"
                placeholder="Enter the book name"
                onKeyDown={(e) => setSearch(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="borrow-content">
            <table>
              <thead>
                <tr>
                  <th>Book title</th>
                  <th>Student name</th>
                  <th>No of available copies</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3}>No records found</td>
                  </tr>
                ) : (
                  Object.keys(booksMap).map((title) => (
                    <tr key={title}>
                      <td>{title}</td>
                      <td>
                        <ul>
                          {booksMap[title].map((borrower) => (
                            <li key={borrower}>{borrower}</li>
                          ))}
                        </ul>
                      </td>
                      <td>{getAvailableCopies(title)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Box>
    </Box>
  );
}
