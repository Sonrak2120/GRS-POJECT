import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import CheckButton from "./button/CheckButton";

export default function DataStu() {
  const token = sessionStorage.getItem("token");
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ` + token,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-student-teacher-info",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setRows(response.data.data);
      // console.log(response.data.data);
    };
    api_();
  }, []);

  return (
    <div>
      <h5>รายชื่อนิสิตในที่ปรึกษา</h5>
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
                รหัสนิสิต
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
                <TableCell component="th" scope="row" sx={{ width: "25%" }}>
                  {row[1]}
                </TableCell>
                <TableCell sx={{ width: "25%" }} align="left">
                  {row[2]}
                </TableCell>
                <TableCell sx={{ width: "25%" }} align="center">
                  {row[0]}
                </TableCell>
                <TableCell sx={{ width: "25%" }} align="center">
                  <CheckButton row={inx} rows={rows} setRows={setRows} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
