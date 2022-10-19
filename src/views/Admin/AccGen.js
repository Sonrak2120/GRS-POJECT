import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
import AddCouse from "./Button/AddCouse";
import AddGen from "./Button/AddGen";
import DeleteGen from "./Button/DeleteGen";

import Progess from "../../layouts/FullLayout/Sidebar/Progess";

export default function AccGen() {
  const [rows, setRows] = React.useState([]);
  const [offid, setOffid] = useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-general-info",
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
      <h5>รายวิชาศึกษาทั่วไป</h5>
      <TableContainer component={Paper} sx={{ borderRadius: "25px" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                รหัสเล่มศึกษาทั่วไป
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                ชื่อเล่มศึกษาทั่วไป
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
              >
                สถานะการอัปโหลดไฟล์
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
                  {row.gen_id}
                </TableCell>
                <TableCell sx={{ width: "400px" }} align="center">
                  {row.gen_name}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {/* {row.upload_data_status}
                  <br />({row.filename}) */}
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
                              <br />({row.filename})
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
                  <DeleteGen row={inx} rows={rows} setRows={setRows} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "20px" }}>
        <AddGen setLoading={setLoading} />
      </div>
    </div>
  );
}
