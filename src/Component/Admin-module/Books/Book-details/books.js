import React, { useEffect, useState } from "react";
import "./books.css";
import Sidebar from "../../Sidebar/sidebar";
import Box from "@mui/material/Box";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Books() {
  const [search, setSearch] = useState("");

  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/book/bookdetails`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  const filtered = book.filter((v) => {
    return search.toLowerCase() === ""
      ? v
      : v.title.toLowerCase().includes(search) ||
          v.author.toLowerCase().includes(search);
  });

  const handleDelete = async (barcode) => {
    await axios
      .delete(`https://infolib-9o87.vercel.app/book/delbook`, {
        data: { barcode }, // Sending the barcode in the request body
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

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, m: -10 }}>
        <div className="book-container">
          <div className="book-head">
            <h1>BOOKS</h1>
            <div className="input-wrapper mt-3">
              <i class="fa fa-search"></i>
              <input
                type="search"
                placeholder="Enter the book name"
                onKeyDown={(e) => setSearch(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="book-content">
            <table>
              <thead>
                <tr>
                  <th>Barcode</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>No of available copies</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No records found</td>
                  </tr>
                ) : (
                  filtered.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{v.barcode}</td>
                        <td>{v.title}</td>
                        <td>{v.author}</td>
                        <td>{v.copies}</td>
                        <td>
                          <button
                            class="btn btn-danger"
                            onClick={() => {
                              handleDelete(v.barcode);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Toaster />
      </Box>
    </Box>
  );
}
