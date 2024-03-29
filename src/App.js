import React, { useState, useEffect, useCallback } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { baseTheme } from "./assets/global/Theme-variable";
import Themeroutes from "./routes/Router";
import LoginPage from "./views/Login/LoginPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Verify from "./views/Login/Verify";
import { Navigate } from "react-router-dom";
import Active from "./views/Login/Active";

import FullLayoutAdmin from "./layouts/FullLayout/Sidebar/FullLayoutAdmin";
import Dashboard1 from "./views/dashboards/Dashboard1";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Error from "./routes/Error";
import FullLayoutStudent from "./layouts/FullLayout/Sidebar/FullLayotStudent";
import FullLayoutTeacher from "./layouts/FullLayout/Sidebar/FullLayoutTeacher";
import Test from "./Test";

import Forgetpassword from "./views/Login/Forgetpassword";
import SentToForget from "./views/Login/SentToForget";

//////////////////////////////////////////Admin
import Home from "./views/Admin/Home";
import AccStu from "./views/Admin/AccStu";
import AccDepartment from "./views/Admin/AccDepartment";
import AccCouse from "./views/Admin/AccCouse";
import Updatecouse from "./views/Admin/Updatecouse";
import UploadHtml from "./views/Admin/UploadHtml";
import Download from "./views/Admin/Download";
import UploadNew from "./uplaod/UploadNew";
import UploadHtmlNew from "./uplaod/UploadHtmlNew";
import UploadDepartNew from "./uplaod/UploadDepartNew";
import AccGen from "./views/Admin/AccGen";
import AccOff from "./views/Admin/AccOff";
import AccDepartmentOfficer from "./views/Officer/AccDepartmentOfficer";
import OfiicAccT from "./views/Officer/OfiicAccT";
import OfficeAccCouse from "./views/Officer/OfficeAccCouse";
import OfficeAccStu from "./views/Officer/OfficeAccStu";

//////////////////////////////////////////Student
import HomeStudent from "./views/Student/HomeStudent";
import CheckCouse from "./views/Student/CheckCouse";
import Searchplan from "./views/Student/Searchplan";
import DisplayPdf from "./views/Student/DisplayPdf";

//////////////////////////////////////////Teacher
import DataStu from "./views/Teacher/DataStu";
import ActiveStu from "./views/Teacher/ActiveStu";
import FullLayoutOfficer from "./layouts/FullLayout/Sidebar/FullLayoutOfficer";
import AccT from "./views/Admin/AccT";
import TabdataStu from "./views/Teacher/TabdataStu";

const App = () => {
  const [role, SetRole] = useState(
    sessionStorage.getItem("role") ? sessionStorage.getItem("role") : ""
  );

  const loginRoute = [
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/loginpage" /> },
        { path: "404", element: <Error /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/loginpage",
      element: <LoginPage SetRole={SetRole} />,
    },
    {
      path: "/verify/:token",
      element: <Verify />,
    },
    {
      path: "/forget/toemail",
      element: <SentToForget />,
    },
    {
      path: "/forget-password/:token",
      element: <Forgetpassword />,
    },
    {
      path: "/Actived",
      element: <Active />,
    },
    {
      path: "/Test",
      element: <Test />,
    },
  ];

  const StudentRoute = [
    {
      path: "/student",
      element: <FullLayoutStudent />,
      children: [
        { path: "/student", element: <HomeStudent /> },
        { path: "checkcouse", element: <CheckCouse /> },
        { path: "checkplan", element: <Searchplan /> },
        { path: "couse", element: <DisplayPdf /> },
        { path: "Test", element: <Test /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ];

  const TeacherRoute = [
    {
      path: "/teacher",
      element: <FullLayoutTeacher />,
      children: [
        { path: "/teacher", element: <DataStu /> },
        { path: "checkactive", element: <ActiveStu /> },
        { path: "Test", element: <Test /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ];

  const OfficerRoute = [
    {
      path: "/officer",
      element: <FullLayoutOfficer />,
      children: [
        { path: "/officer", element: <AccDepartmentOfficer /> },
        { path: "addstudent", element: <OfficeAccStu /> },
        { path: "list", element: <OfiicAccT /> },
        { path: "addcouse", element: <OfficeAccCouse /> },
        { path: "gensubject", element: <AccGen /> },
        { path: "updatecouse", element: <UploadNew /> },
        { path: "updatehtml", element: <UploadHtmlNew /> },
        { path: "downloadfile", element: <Download /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ];

  const AdminRoute = [
    {
      path: "/admin",
      element: <FullLayoutAdmin />,
      children: [
        { path: "/admin", element: <AccDepartment /> },
        { path: "addstudent", element: <AccStu /> },
        { path: "list", element: <AccOff /> },
        { path: "addcouse", element: <AccCouse /> },
        { path: "gensubject", element: <AccGen /> },
        { path: "updatecouse", element: <UploadNew /> },
        { path: "updatehtml", element: <UploadHtmlNew /> },
        { path: "downloadfile", element: <Download /> },
        { path: "listteacher", element: <AccT /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ];

  const switchRoute = useCallback(() => {
    if (role === "admin") {
      return AdminRoute;
    } else if (role === "student") {
      return StudentRoute;
    } else if (role === "teacher") {
      return TeacherRoute;
    } else if (role === "officer") {
      return OfficerRoute;
    } else return loginRoute;

    //else return loginRoute;
  }, [role]);

  const routing = useRoutes(switchRoute());
  const theme = baseTheme;

  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
};

export default App;
