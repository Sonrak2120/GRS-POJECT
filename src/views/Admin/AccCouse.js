import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteCouseButton from "./Button/DeleteCouseButton";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";

import axios from "axios";
import AddCouse from "./Button/AddCouse";

export default function AccCouse() {
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [offid, setOffid] = useState("");
  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-course",
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
      <h3 style={{ marginBottom: "20px" }}>หลักสูตรการศึกษา</h3>
      <TableContainer component={Paper} sx={{ borderRadius: "25px" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                รหัสหลักสูตร
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                หลักสูตร
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
                สถานะไฟล์ PDF
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                สถานะไฟล์ XLXS
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                วันที่
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
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "200px" }}
                  align="center"
                >
                  {row.course_id}
                </TableCell>
                <TableCell sx={{ width: "400px" }} align="left">
                  {row.course_name}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {row.depart_id}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {/* {row.pdf_status}
                  <br />({row.pdf_name}) */}
                  <div style={{ display: "flex" }}>
                    {(() => {
                      if (row.pdf_status === "ยังไม่อัปโหลด") {
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
                            <p>ยังไม่อัปโหลด</p>
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
                            <p>
                              อัปโหลดสำเร็จ
                              <br />({row.pdf_name})
                            </p>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {/* {row.upload_data_status}
                  <br />({row.excel_name}) */}
                  <div style={{ display: "flex" }}>
                    {(() => {
                      if (row.upload_data_status === "ยังไม่อัปโหลด") {
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
                            <p>ยังไม่อัปโหลด</p>
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
                            <p>
                              อัปโหลดสำเร็จ
                              <br />({row.excel_name})
                            </p>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {row.date}
                </TableCell>
                <TableCell align="center" sx={{ width: "200px" }}>
                  <DeleteCouseButton row={inx} rows={rows} setRows={setRows} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "20px" }}>
        <AddCouse setLoading={setLoading} />
      </div>
    </div>
  );
}
