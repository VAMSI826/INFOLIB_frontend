import React, { useState, useEffect } from "react";
import "./slots.css";
import Box from "@mui/material/Box";
import Sidebar from "../Sidebar/sidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function Slots() {
  const [search, setSearch] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const getslots = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/slot/slots`);
        setSlots(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    getslots();
  }, []);

  const filtered = slots.filter((v) => {
    return search.toLowerCase() === ""
      ? v
      : v.name.toLowerCase().includes(search) ||
          v.uucms.includes(search) ||
          v.title.toLowerCase().includes(search);
  });

  const handleSlot = async (uucms, barcode) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/borrowed/borrowedbook`, {
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

  useEffect(() => {
    const delslots = async () => {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/slot/deleteoldslots`);
      } catch (error) {
        console.log(error);
      }
    };
    delslots();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, m: -10 }}>
        <div className="slot-container">
          <div className="slot-head">
            <h1>SLOTS</h1>
            <div className="input-wrapper mt-3">
              <i class="fa fa-search"></i>
              <input
                type="search"
                placeholder="Search"
                onKeyDown={(e) => setSearch(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="slot-content">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Register no</th>
                  <th>Barcode</th>
                  <th>Book title</th>
                  <th>Date of booking</th>
                  <th>Time of booking</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8">No records found</td>
                  </tr>
                ) : (
                  filtered.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{v.name}</td>
                        <td>{v.uucms}</td>
                        <td>{v.barcode}</td>
                        <td>{v.title}</td>
                        <td>{v.borroweddate}</td>
                        <td>{v.timeofbooking}</td>
                        <td>
                          <button
                            class="btn btn-success"
                            onClick={() => {
                              handleSlot(v.uucms, v.barcode);
                            }}
                          >
                            Collected
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
