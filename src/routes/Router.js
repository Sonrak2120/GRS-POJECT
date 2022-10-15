// import React, { useState, useEffect } from "react";
// import { lazy } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import { Navigate, useRoutes } from "react-router-dom";

// import Dashboard1 from "../views/dashboards/Dashboard1";
// import UploadHtml from "../views/Admin/UploadHtml";
// import TestStudent from "../views/dashboards/Dashboard1";
// import FullLayoutStudent from "../layouts/FullLayout/Sidebar/FullLayotStudent";
// import FullLayoutAdmin from "../layouts/FullLayout/Sidebar/FullLayoutAdmin";
// import LoginPage from "../views/Login/LoginPage";
// import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// import Error from "../routes/Error";

// /*****Routes******/

// const ThemeRoutes = [
//   {
//     path: "/",
//     element: <LogoOnlyLayout />,
//     children: [
//       { path: "/", element: <Navigate to="/loginpage" /> },
//       { path: "404", element: <Error /> },
//       { path: "*", element: <Navigate to="/404" /> },
//     ],
//   },
//   {
//     path: "/loginpage",
//     element: <LoginPage />,
//   },
//   {
//     path: "/test",
//     element: <FullLayoutAdmin />,
//     children: [
//       { path: "admin", element: <Dashboard1 /> },
//       { path: "updatecouse", element: <UploadHtml /> },
//     ],
//   },

//   {
//     path: "*",
//     element: <Navigate to="/404" replace />,
//   },
// ];

// export default ThemeRoutes;
