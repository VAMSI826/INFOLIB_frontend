import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Studsidebar from "../Sidebar/Studsidebar";
import "./Notification.css";
import axios from "axios";
import { base_url } from "../../../urls.js";

export default function Notification() {
  const [notification, setnotification] = useState([]);

  useEffect(() => {
    const getnotification = async () => {
      try {
        const res = await axios.get(`${process.env.base_url}/notif/getnotif`);
        setnotification(res.data.reverse());
        console.log(notification);
      } catch (error) {
        console.log(error);
      }
    };

    getnotification();
  }, []);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#eee", height: "100%" }}>
      <Studsidebar />
      <Box sx={{ flexGrow: 1, m: -10 }}>
        <div className="notification-box">
          <div class="n-title mb-5">NOTIFICATIONS</div>
          <div className="Not-box">
            {notification.length > 0 ? (
              notification.map((Note, i) => (
                <div
                  class="card mb-5 mt-2 mb-lg-0"
                  style={{ width: "80rem" }}
                  id="icons"
                >
                  <div class="card-body mt-2 p-0 flex ${getCategoryColor(Note.Category)}">
                    <div class="list-group list-group-flush rounded-3">
                      <div class="d-flex inline-flex justify-content-center align-items-center">
                        <i class="fa-regular fa-circle-dot "></i>
                        <i class="cat fs-6 ">Category: {Note.category}</i>
                        <i class="fa-solid fa-calendar-days fs-6 fw-normal text-secondary ndate">
                          {Note.date}
                        </i>
                      </div>
                      <hr />
                      <p class="fs-6 mb-0 p-2 ">{Note.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ width: "80rem" }} class="notifi">
                <p>
                  <b>No New Notifications</b>
                </p>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
}
