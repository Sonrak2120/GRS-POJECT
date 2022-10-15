import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
// import Home from './page/Admin/Home';
import LoginPage from "./views/Login/LoginPage";

import Dashboard1 from "./views/dashboards/Dashboard1";
import FullLayout from "./layouts/FullLayout/Sidebar/FullLayout";

function App2() {
  // const [isLogin, SetisLogin]=useState(false)

  const [role, SetRole] = useState(
    sessionStorage.getItem("role") ? sessionStorage.getItem("role") : ""
  );

  if (
    sessionStorage.getItem("token") === null ||
    sessionStorage.getItem("token") === [] ||
    sessionStorage.getItem("token") === ""
  ) {
    return (
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginPage SetRole={SetRole} />} />
        </Routes>
      </Router>
    );
  } else {
    if (role === "student") {
      return (
        <Router>
          <div>
            <header>
              <Routes>
                <Route
                  path="/"
                  exact
                  element={<LoginPage SetRole={SetRole} />}
                />
                <Route path="/student" element={<FullLayout />} />
                <Route path="/student/updatehtml" element={<Dashboard1 />} />
                <Route path="/student/checkcouse" element={<Dashboard1 />} />
                <Route path="/student/checkplan" element={<Dashboard1 />} />
                <Route path="/student/couse" element={<Dashboard1 />} />
              </Routes>
            </header>
          </div>
        </Router>
      );
    } else if (role === "admin") {
      return (
        <Router>
          <div>
            <Routes>
              <Route path="/" exact element={<LoginPage SetRole={SetRole} />} />
              <Route path="/admin" element={<FullLayout />} />
              <Route path="/admin/updatecouse" element={<Dashboard1 />} />
              <Route path="/admin/checkcomp" element={<Dashboard1 />} />
              <Route path="/admin/checkstudy" element={<Dashboard1 />} />
            </Routes>
          </div>
        </Router>
      );
    } else if (role === "teacher") {
      return (
        <Router>
          <div>
            <Routes>
              <Route path="/" exact element={<LoginPage SetRole={SetRole} />} />
              <Route path="/teacher" element={<FullLayout />} />
              <Route path="/teacher/checkactive" element={<Dashboard1 />} />
            </Routes>
          </div>
        </Router>
      );
    } else if (role === "officer") {
      return (
        <Router>
          <div>
            <Routes>
              <Route path="/" exact element={<LoginPage SetRole={SetRole} />} />
              <Route path="/officer" element={<FullLayout />} />
              <Route path="/officer/updatecouse" element={<Dashboard1 />} />
            </Routes>
          </div>
        </Router>
      );
    }
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <Router>
  //         <Routes>
  //           <Route path="/" exact element={<LoginPage />} />
  //           <Route path="/test" exact element={<Test3 />} />

  //           <Route path="/admin" element={<SitebarAdmin />} />
  //           <Route path="/admin/updatecouse" element={<SiteUpdatecouse />} />
  //           <Route path="/admin/checkcomp" element={<SitebarCheckcomp />} />
  //           <Route path="/admin/checkstudy" element={<SitebarCheckstudy />} />

  //           <Route path="/officer" element={<SitebarOfficer />} />
  //           <Route
  //             path="/officer/updatecouse"
  //             element={<SitebarUpdatecouse />}
  //           />

  //           <Route path="/teacher" element={<SitebarTeacher />} />
  //           <Route
  //             path="/teacher/checkactive"
  //             element={<SitebarCheckActive />}
  //           />

  //           <Route path="/student" element={<SitebarUser />} />
  //           <Route path="/student/updatehtml" element={<SitebarUploadhtml />} />
  //           <Route path="/student/checkcouse" element={<SitebarCheckcouse />} />
  //           <Route path="/student/checkplan" element={<SitebarCheckplan />} />
  //           <Route path="/student/couse" element={<SitebarCourse />} />
  //         </Routes>
  //       </Router>

  //       {/* {1 === 0 && (
  //         <SiteBar>
  //           <Router>
  //             <Routes>
  //               <Route path="/admin" element={<Home />} />
  //               <Route path="admin/updatecouse" element={<Updatecouse />} />
  //               <Route path="admin/checkstudy" element={<CheckStudy />} />
  //               <Route path="admin/checkcom" element={<CheckComplet />} />
  //             </Routes>
  //           </Router>
  //         </SiteBar>
  //       )} */}
  //     </header>
  //   </div>
  // );
}

export default App2;
