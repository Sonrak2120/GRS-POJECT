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
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import Sentbutton from "./button/Sentbutton";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import CheckDataButton from "./button/CheckDataButton";
import PageActivedata from "./button/PageActivedata";
import HistoryButton from "../Teacher/button/HistoryButton";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";

const Table_custom = styled("Table")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "80%",
    marginLeft: "30px",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function CollapsibleTable() {
  const [value, setValue] = React.useState(0);
  const [tab, setTab] = React.useState([]);
  const [rows2, setRows2] = React.useState([]);
  const [groups, setgrops] = React.useState([]);
  const [stdId, setStId] = React.useState("");
  const [head, setHead] = React.useState();
  const [loading, setLoading] = React.useState(false);
  console.log("head", head);
  console.log("groups", groups);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("groups", groups);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-require-status-info",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      const data = response.data.data;

      setTab(response.data.data);
      setStId(response.data.data);
      setRows2(response.data.data);
      setgrops(data[0].group);
      setHead(data[0].head);
    };

    api_();
  }, []);

  function Row(props) {
    const { row2, group, inx } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell sx={{ width: "50px" }}>
            <IconButton
              aria-label="expand row2"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row2.std_id}</TableCell>
          <TableCell align="left">{row2.name}</TableCell>
          <TableCell align="left">{row2.surname}</TableCell>

          <TableCell align="center">
            <div style={{ display: "flex" }}>
              {(() => {
                if (row2.status === "") {
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
                      <p>รอการตรวจสอบ</p>
                    </div>
                  );
                } else if (row2.status === "CHECK") {
                  return (
                    <div
                      style={{
                        display: "flex",
                        color: "blue",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      <p>รอการตรวจสอบ</p>
                    </div>
                  );
                } else if (row2.status === "NOT PASS") {
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
                      <p>ยังไม่ผ่าน</p>
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
                      <p>ตรวจสอบผ่านแล้ว</p>
                    </div>
                  );
                }
              })()}
            </div>
          </TableCell>
          <TableCell align="center">
            {row2.teacher_name} {row2.teacher_surname}
          </TableCell>
          <TableCell align="center">
            {row2.sent_date}
            {"-"}
            {row2.sent_time}
          </TableCell>
          <TableCell align="center">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sentbutton setLoading={setLoading} />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  ประวัติการตรวจสอบ
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">รหัสนิสิต</TableCell>
                      <TableCell>ชื่อ</TableCell>
                      <TableCell>นามสกุล</TableCell>
                      <TableCell align="center">สถานะ</TableCell>
                      <TableCell align="center">วัน/เวลา ที่ตรวจสอบ</TableCell>
                      <TableCell align="center">อาจารย์ที่ปรึกษา</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {group.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.std_id}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.surname}</TableCell>
                        <TableCell align="center">
                          {/* {row.status} */}
                          {console.log("row", row)}
                          <div style={{ display: "flex" }}>
                            {(() => {
                              if (row.status === "") {
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
                                    <p>รอการตรวจสอบ</p>
                                  </div>
                                );
                              } else if (row.status === "CHECK") {
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      color: "blue",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      margin: "auto",
                                    }}
                                  >
                                    <p>รอการตรวจสอบ</p>
                                  </div>
                                );
                              } else if (row.status === "NOT PASS") {
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
                                    <p>ยังไม่ผ่าน</p>
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
                                    <p>ตรวจสอบผ่านแล้ว</p>
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {row.teacher_name} {row.teacher_surname}
                        </TableCell>
                        <TableCell align="center">
                          {row.check_date}
                          {"-"}
                          {row.check_time}
                        </TableCell>
                        <TableCell align="center">
                          <HistoryButton
                            row2={inx}
                            rows2={rows2}
                            row={row}
                            setRows2={setRows2}
                            stdId={stdId}
                            index={index}
                            data={row}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  if (head) {
    return (
      <div>
        <Progess load={loading}></Progess>
        <h5>รายชื่อนิสิตในที่ปรึกษา</h5>
        <Box>
          <Box sx={{ bgcolor: "#fff", borderRadius: "15px" }}>
            <TableContainer component={Paper} sx={{ mb: "16px" }}>
              <Table_custom aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                      รหัสนิสิต
                    </TableCell>
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
                      สถานะ
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="center"
                    >
                      อาจารย์ที่ปรึกษา
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      align="center"
                    >
                      วัน/เวลา
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
                  <Row row2={head} group={groups} />
                </TableBody>
              </Table_custom>
            </TableContainer>

            <Box sx={{ p: 3 }} />
          </Box>
        </Box>
      </div>
    );
  }
  return <></>;
}
