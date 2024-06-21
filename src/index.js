import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Secondpage from "./Component/Admin-module/Login-module/secondpage";
import FirstPage from "./Component/First-Page/firstPage";
import Thirdpage from "./Component/Student-module/Login-module/thirdpage";
import Signuppage from "./Component/Student-module/Signup-module/signupPage";
import Books from "./Component/Admin-module/Books/Book-details/books";
import Slots from "./Component/Admin-module/Slots-module/slots";
import StudBooks from "./Component/Student-module/Books/Studbooks";
import Sidebar from "./Component/Admin-module/Sidebar/sidebar";
import Studsidebar from "./Component/Student-module/Sidebar/Studsidebar";
import Student from "./Component/Admin-module/Students/Student-details/Student";
import Bookadd from "./Component/Admin-module/Books/Add-book/bookadd";
import Studentadd from "./Component/Admin-module/Students/Student-add/studentadd";
import Borrowedbooks from "./Component/Admin-module/Books/Borrowed-books/borrowedbooks";
import Changepassword from "./Component/Student-module/Change-password/Change-password";
import Profile from "./Component/Student-module/Profile/profile";
import Notification from "./Component/Student-module/Notification/Notification";
import ForgotPassword from "./Component/Student-module/Forgot-password/ForgotPassword";
import Admin from "./Component/Admin-module/adminhomepage/adminhome";

const AppLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

const SecondappLayout = () => (
  <>
    <Studsidebar />
    <Outlet />
  </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

let allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "Admin-login",
    element: <Secondpage />,
  },
  {
    path: "Student-login",
    element: <Thirdpage />,
  },
  {
    path: "ForgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "Sign-up",
    element: <Signuppage />,
  },
  {
    path: "Sidebar",
    element: <Sidebar />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "Books",
        element: <Books />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "View-book-details",
        element: <Books />,
      },
      {
        path: "Add-a-book",
        element: <Bookadd />,
      },
      {
        path: "Borrowed-books",
        element: <Borrowedbooks />,
      },
      {
        path: "Slots",
        element: <Slots />,
      },
      {
        path: "View-student-details",
        element: <Student />,
      },
      {
        path: "Add-a-student",
        element: <Studentadd />,
      },
      {
        path: "Logout",
        element: "",
      },
    ],
  },
  {
    element: <SecondappLayout />,
    children: [
      {
        path: "Profile",
        element: <Profile />,
      },
      {
        path: "StudentBooks",
        element: <StudBooks />,
      },
      {
        path: "Changepassword",
        element: <Changepassword />,
      },
      {
        path: "Notification",
        element: <Notification />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={allRoutes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
