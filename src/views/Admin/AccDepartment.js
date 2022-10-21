import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteDepartButton from "./Button/DeleteDepartButton";
import axios from "axios";
import AddDepartment from "./Button/AddDepartment";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";
import EditButtonDepart from "./Button/EditButtonDepart";
import AddFullDepart from "./Button/AddFullDepart";
import { Stack, Button } from "@mui/material";
import DropFileDepart from "../../uplaod/drop-file-input/DropFileDepart";

export default function AccDepartment() {
  const [rows, setRows] = React.useState([]);
  const [offid, setOffid] = useState("");
  const [file, setfile] = useState(null);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-department",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setRows(response.data.data);
      console.log(response.data.data);
    };
    api_();
  }, []);

  const onDownload5 = () => {
    fetch("http://localhost:5000/download-add-depart-example-form", {
      method: "GET",
      headers: {
        "Content-Type": "./example/department.xlsx",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `department.xlsx`);

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
        <h3 style={{ margin: "auto 0", flexGrow: "1" }}>สาขาวิชา</h3>
        <Button onClick={onDownload5} variant="contained" color="primary">
          ดาวน์โหลด ตัวอย่างเพื่อเพิ่มสาขาวิชา
        </Button>
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: "25px" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
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
                สาขา
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
                  {row.depart_id}
                </TableCell>
                <TableCell sx={{ width: "400px" }} align="center">
                  {row.department}
                </TableCell>

                <TableCell align="center" sx={{ width: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <EditButtonDepart row={inx} rows={rows} setRows={setRows} />
                    <DeleteDepartButton
                      row={inx}
                      rows={rows}
                      setRows={setRows}
                    />
                  </div>
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
        <AddDepartment setLoading={setLoading} />
        <DropFileDepart setLoading={setLoading} onFileChange={setfile} />
      </Stack>
    </div>
  );
}
