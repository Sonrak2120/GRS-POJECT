import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";

import axios from "axios";
import AddCouse from "./Button/AddCouse";
import AddGen from "./Button/AddGen";
import DeleteGen from "./Button/DeleteGen";
import EditButtonGen from "./Button/EditButtonGen";

import Progess from "../../layouts/FullLayout/Sidebar/Progess";
import ReqDownloadXgen from "./Button/ReqDownloadXgen";

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

  const onDownload4 = () => {
    fetch("http://localhost:5000/download-add-gen-example-form", {
      method: "GET",
      headers: {
        "Content-Type": "./example/subject_gen64.xlsx",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `subject_gen64.xlsx`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };

  return (
    <div>
      <Progess load={loading} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h3"
          style={{
            margin: "auto 0",
            flexGrow: "1",
            fontWeight: 500,
          }}
        >
          รายวิชาศึกษาทั่วไป
        </Typography>
        <Button onClick={onDownload4} variant="contained" color="primary">
          ดาวน์โหลด ตัวอย่าง excel เพื่อเพิ่มคู่มือการศึกษาทั่วไป
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ borderRadius: "25px" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
                style={{ width: "20%" }}
              >
                รหัสเล่มศึกษาทั่วไป
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
                style={{ width: "20%" }}
              >
                ชื่อเล่มศึกษาทั่วไป
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
                style={{ width: "20%" }}
              >
                สถานะการอัปโหลดไฟล์
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="center"
                style={{ width: "20%" }}
              >
                วันที่
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
                            <ReqDownloadXgen
                              row={inx}
                              rows={rows}
                              setRows={setRows}
                              setLoading={setLoading}
                            />
                          </div>
                        );
                      }
                    })()}
                  </div>
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="center">
                  {row.date}
                  <br />
                  {"เวลา "}
                  {row.time}
                  {" น."}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EditButtonGen
                    row={inx}
                    rows={rows}
                    setRows={setRows}
                    setLoading={setLoading}
                  />
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
