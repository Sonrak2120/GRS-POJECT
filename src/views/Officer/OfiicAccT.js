import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OfficeEditButton from "./Button/OfficeEditButton";
import Deletebutton from "../Admin/Button/Deletebutton";
import OfficeAddPage from "./OfficeAddPage";
import axios from "axios";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";
import { Button, Stack, Typography } from "@mui/material";
import OfficeDropFileTeacher from "../../uplaod/drop-file-input/OfficeDropFileTeacher";

function createData(name, lastname, id) {
  return { name, lastname, id };
}
export default function OfiicAccT() {
  const [loading, setLoading] = React.useState(null);
  const [file, setfile] = useState(null);
  const token = sessionStorage.getItem("token");
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ` + token,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-teacher-info-for-officer",
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
      <Progess load={loading} />
      <Typography
        variant="h3"
        style={{
          margin: "auto 0",
          flexGrow: "1",
          fontWeight: 500,
          marginBottom: "20px",
        }}
      >
        บัญชีผู้ใช้ของอาจารย์ที่ปรึกษา
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: "25px" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
                style={{ width: "10%" }}
              >
                รหัสอาจารย์
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                style={{ width: "20%" }}
              >
                ชื่อ
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                style={{ width: "20%" }}
                align="left"
              >
                นามสกุล
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                style={{ width: "20%" }}
                align="left"
              >
                E-mail
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                style={{ width: "20%" }}
                align="center"
              >
                สาขา
              </TableCell>

              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
                style={{ width: "20%" }}
              >
                สถานะ
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
                style={{ width: "20%" }}
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
                <TableCell sx={{ width: "200px" }} align="center">
                  {row.user_id}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ width: "200px" }}>
                  {row.name}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="left">
                  {row.surname}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="left">
                  {row.email}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="left">
                  {row.depart_id}
                  {"-"}
                  {row.depart_name}
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
                <TableCell
                  align="center"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <OfficeEditButton
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        className="layout"
        direction="row"
        spacing={5}
        style={{ marginTop: "20px" }}
      >
        <OfficeAddPage setLoading={setLoading} />
        <OfficeDropFileTeacher setLoading={setLoading} onFileChange={setfile} />
      </Stack>
    </div>
  );
}
