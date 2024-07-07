import React, { useState, useEffect } from "react";
import "./Student.css";
import Sidebar from "../../Sidebar/sidebar";
import Box from "@mui/material/Box";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function Student() {
  const [search, setSearch] = useState("");
  const [borrowed, setBorrowed] = useState([]);
  const [student, setStudent] = useState([]);
  useEffect(() => {
    const getStud = async () => {
      try {
        const res1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/getStud`);
        setStudent(res1.data);
        const res2 = await axios.get(`${process.env.REACT_APP_BASE_URL}/borrowed/getBorrow`);
        setBorrowed(res2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStud();
  }, []);

  const filtered = student.filter((v) => {
    return search.toLowerCase() === ""
      ? v
      : v.name.toLowerCase().includes(search) ||
          v.uucms.toLowerCase().includes(search);
  });
  const handleDelete = async (uucms, title) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/borrowed/delbook`, {
        data: { uucms, title },
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

  const handlerenew = async (uucms, title) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/borrowed/renewbook`, {
        data: { uucms, title },
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
        <div className="student-container">
          <div className="student-head">
            <h1>STUDENT DETAILS</h1>
            <div className="input-wrapper mt-3">
              <i className="fa fa-search"></i>
              <input
                type="search"
                placeholder="Enter the UUCMS ID"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="student-content">
            {filtered.length > 0 ? (
              filtered.map((data, i) => (
                <div className="card-s" style={{ width: "80rem" }} key={i}>
                  <div className="card-content">
                    <h1 className="title-student">Student Details</h1>
                    <p>Name: {data.name}</p>
                    <p>Course: {data.course}</p>
                    <p>UUCMS: {data.uucms}</p>
                    <h3 className="title-student">Borrowed Books</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Books</th>
                          <th>Borrowed Date</th>
                          <th>Renewal/Return Date</th>
                          <th>Fine</th>
                          <th>Renew</th>
                          <th>Return</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.borrowedbookscnt === 0 ? (
                          <tr>
                            <td colSpan={7}>No books borrowed</td>
                          </tr>
                        ) : (
                          borrowed.map((book, i) => {
                            if (book.uucms === data.uucms) {
                              return (
                                <tr key={i}>
                                  <td>{book.title}</td>
                                  <td>{book.borroweddate}</td>
                                  <td>{book.returndate}</td>
                                  <td>{book.fine}</td>
                                  <td>
                                    <button
                                      className="btn btn-success"
                                      onClick={() => {
                                        handlerenew(data.uucms, book.title);
                                      }}
                                    >
                                      Renew
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        handleDelete(data.uucms, book.title);
                                      }}
                                    >
                                      Return
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <div>No records found</div>
            )}
          </div>
        </div>
        <Toaster />
      </Box>
    </Box>
  );
}
