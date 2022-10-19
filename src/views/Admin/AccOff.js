import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Deletebutton from "./Button/Deletebutton";
import EditbuttonOfficer from "./Button/EditbuttonOfficer";
import OfficerAddPage from "./Button/OfficerAddPage";
import AddPage from "./AddPage";

import axios from "axios";

function createData(name, lastname, id) {
  return { name, lastname, id };
}

export default function BasicTable({ setLoading }) {
  const [rows, setRows] = React.useState([]);
  const [offid, setOffid] = useState("");
  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-officer-info",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setRows(response.data.data);
      console.log(response.data.data);
    };
    api_();
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: "20px" }}>บัญชีผู้ใช้ของเจ้าหน้าที่</h3>
      <TableContainer component={Paper} sx={{ borderRadius: "25px" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                ชื่อ
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="left"
              >
                นามสกุล
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                รหัสสาขา
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                สถานะ
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, inx) => (
              <TableRow
                key={inx}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "#D7EAD9",
                    boxShadow: "0 0 3px 1px #525B53",
                  },
                }}
              >
                <TableCell component="th" scope="row" sx={{ width: "200px" }}>
                  {row.name}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="left">
                  {row.surname}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {row.depart_id}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {/* {row.status} */}
                  <div style={{ display: "flex" }}>
                    {(() => {
                      if (row.status === "ยังไม่ยืนยัน") {
                        return (
                          <div
                            style={{
                              display: "flex",
                              color: "red",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                              margin: "auto",
                            }}
                          >
                            <p>ยังไม่ยืนยัน</p>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            style={{
                              display: "flex",
                              color: "green",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                              margin: "auto",
                            }}
                          >
                            <p>ยืนยันแล้ว</p>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div style={{ display: "flex" }}>
                    <EditbuttonOfficer
                      row={inx}
                      rows={rows}
                      setRows={setRows}
                      setLoading={setLoading}
                    />

                    <Deletebutton
                      row={inx}
                      rows={rows}
                      setRows={setRows}
                      setLoading={setLoading}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "20px" }}>
        <OfficerAddPage setLoading={setLoading} />
      </div>
    </div>
  );
}
