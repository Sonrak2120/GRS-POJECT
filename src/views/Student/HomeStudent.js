import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";

export default function CollapsibleTable() {
  const [rows, setRows] = React.useState([]);
  const [groups, setgrop] = React.useState([]);
  const [nums, setNums] = React.useState([]);
  const [donts, setDont] = React.useState([]);
  const [datas, setDatas] = React.useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-condition-progress-info",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      const data = response.data.condition_progress.data;
      setRows(response.data.condition_progress.data);
      setgrop(data);
    };
    api_();
  }, []);
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell sx={{ width: "50px" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.group[0]}</TableCell>
          <TableCell align="center">
            {row.group[1]}
            {" / "}
            {row.group[2]}
          </TableCell>
          <TableCell
            align="center"
            sx={{ color: row.group[3] === "NOT PASS" ? "red" : "green" }}
          >
            {row.group[3]}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  วิชาที่เรียน
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>รหัสวิชา</TableCell>
                      <TableCell>ชื่อวิชา</TableCell>
                      <TableCell align="right">หน่วยกิต</TableCell>
                      <TableCell align="right">เกรด</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.subject.map((item, index) => {
                      {
                        console.log("item", item);
                      }
                      return (
                        <TableRow key={index.toString()}>
                          <TableCell component="th" scope="row">
                            {item[0]}
                          </TableCell>
                          <TableCell>{item[1]}</TableCell>
                          <TableCell align="right">{item[2]}</TableCell>
                          <TableCell align="right">
                            <div
                              style={{
                                display: "flex",
                                color: item[3] === "N" && "red",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                margin: "auto",
                              }}
                            >
                              <p>{item[3]}</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {/* {console.log("row.subject", row.subject)} */}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  if (groups.length > 0) {
    return (
      <TableContainer component={Paper}>
        {rows.map((row, index) => (
          <Table aria-label="collapsible table" key={index}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "50%", fontWeight: "1000", fontSize: "21px" }}
                >
                  {row.section[0]}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{ width: "25%" }}
                >
                  {row.section[1]}
                  {" / "}
                  {row.section[2]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "25%",
                    fontWeight: "1000",
                    fontSize: "18px",
                    color: row.section[3] === "NOT PASS" ? "red" : "green",
                  }}
                  align="center"
                >
                  {row.section[3]}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {groups[index].group_sub.map((rowSub) => {
                return <Row key={rowSub.group} row={rowSub} />;
              })}
            </TableBody>
          </Table>
        ))}
      </TableContainer>
    );
  }
  return <></>;
}
