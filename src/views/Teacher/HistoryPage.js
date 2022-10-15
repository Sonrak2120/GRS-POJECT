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
import Button from "@mui/material/Button";
import axios from "axios";
import { Grid, styled } from "@mui/material";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";
import Checkbox from "@mui/material/Checkbox";
import Sentbutton from "../Student/button/Sentbutton";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import InfoIcon from "@mui/icons-material/Info";

const Typo_custom = styled("Typography")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    marginBottom: "20px",

    fontWeight: 250,
    fontSize: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: "-0.06px",
  },
  [theme.breakpoints.up("xl")]: {
    marginBottom: "30px",
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 500,
    fontSize: 30,
    letterSpacing: "-0.06px",
  },
}));

const Grid_custom = styled("Box")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  [theme.breakpoints.up("xl")]: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 100,
    top: 180,
  },
}));

const Table_custom = styled("Table")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    // width: "100%",
  },
  [theme.breakpoints.up("xl")]: {
    // width: "100%",
    marginLeft: "30px",
  },
}));

export default function CollapsibleTable({
  row2,
  rows2,
  row,
  setRows2,
  setOpen,
  check,
  setCheck,
  setDataDate,
  setDataTime,
  setCheckDate,
  setCheckTime,
  setSentDate,
  setSentTime,
  subcode,
  setSubcode,
  stdId,
  index,
}) {
  const [rows, setRows] = React.useState([]);
  const [groups, setgrop] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [num, setNum] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // setStId(rows2[row2].head.std_id);
  // setDataDate(rows2[row2].head.data_date);
  // setDataTime(rows2[row2].head.data_time);
  // setCheckDate(rows2[row2].head.check_date);
  // setCheckTime(rows2[row2].head.check_time);
  // setSentDate(rows2[row2].head.sent_date);
  // setSentTime(rows2[row2].head.sent_time);
  // console.log(rows2[row2].group.sent_time);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      console.log("++++++++++++++++", stdId[row2].group[index]);
      console.log(index);

      let bodyContent = JSON.stringify({
        // std_id: stdId,
        // data_date: "08/10/2022",
        // data_time: "05:30:06",
        // sent_date: "09/10/2022",
        // sent_time: "07:12:58",
        // check_date: "09/10/2022",
        // check_time: "07:13:17",
        std_id: stdId[row2].group[index].std_id,
        data_date: stdId[row2].group[index].data_date,
        data_time: stdId[row2].group[index].data_time,
        sent_date: stdId[row2].group[index].sent_date,
        sent_time: stdId[row2].group[index].sent_time,
        check_date: stdId[row2].group[index].check_date,
        check_time: stdId[row2].group[index].check_time,
      });

      let reqOptions = {
        url: "http://localhost:5000/get-history",
        method: "PATCH",
        headers: headersList,
        data: bodyContent,
      };

      let response = await axios.request(reqOptions);
      const data = response.data.data;
      setName(response.data.course_name);
      setNum(response.data.allcredit);
      setRows(response.data.data);
      setSubcode(response.data.sub_code);
      setgrop(data);
      const temp = [];
      // response.data.sub_code.map((item) => temp.push(0));
      setCheck(temp);

      //setStId(rows2[row2].group.std_id);
      // setDataDate(rows2[row2].group.data_date);
      // setDataTime(rows2[row2].group.data_time);
      // setCheckDate(rows2[row2].group.check_date);
      // setCheckTime(rows2[row2].group.check_time);
      // setSentDate(rows2[row2].group.sent_date);
      // setSentTime(rows2[row2].group.sent_time);

      console.log(rows2[row2].head.std_id);
    };
    api_();
  }, []);
  // const count = check.length;

  console.log("groups", groups);

  function Row(props) {
    const { row, setCheck } = props;
    const [open, setOpen] = React.useState(true);

    // const findIndex = (value) => {
    //   const valueIndex = subcode.findIndex((element) => {
    //     return element === value;
    //   });
    //   return valueIndex;
    // };

    // const onChange = (value, index) => {
    //   let temp = [...check];
    //   temp[index] = value ? 1 : 0;
    //   setCheck(temp);
    // };

    // const sortRow = row.subject_group.sort((a, b) => a.term - b.term);
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
            {row.group[1]} {"หน่วยกิต"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {/* {`ภาค${item.term === "1" ? "ปลาย" : "ต้น"}`} */}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ width: "25%" }}
                      >
                        รหัสวิชา
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>ชื่อวิชา</TableCell>
                      <TableCell align="center">หน่วยกิต</TableCell>
                      <TableCell align="center">เกรด</TableCell>
                      <TableCell align="center">ชั้นปี</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  {row.subject.map((item, index) => {
                    return (
                      <TableBody>
                        <TableRow key={index.toString()}>
                          <TableCell />
                          <TableCell component="th" scope="row">
                            {item[0]}
                          </TableCell>
                          <TableCell> {item[1]} </TableCell>
                          <TableCell align="center">{item[2]}</TableCell>
                          <TableCell align="center">{item[3][0][0]}</TableCell>
                          <TableCell align="center">{item[3][0][2]}</TableCell>
                          <TableCell align="center">
                            {/* {item[5]} */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {(() => {
                                if (item[4] == "1") {
                                  return (
                                    <div>
                                      <CheckBoxIcon />
                                    </div>
                                  );
                                } else if (item[4] == "0") {
                                  return <CheckBoxOutlineBlankIcon />;
                                } else {
                                  return <InfoIcon />;
                                }
                              })()}
                            </div>
                          </TableCell>
                        </TableRow>
                        {item[3].length > 1 && (
                          <>
                            {item[3].map((item1, index1) => {
                              if (index1 !== 0) {
                                return (
                                  <TableRow key={index1.toString()}>
                                    {console.log("item1", item1)}
                                    <TableCell />
                                    <TableCell
                                      component="th"
                                      scope="row"
                                    ></TableCell>
                                    <TableCell> {item[1]} </TableCell>
                                    <TableCell align="center">
                                      {item[2]}
                                    </TableCell>
                                    <TableCell align="center">
                                      {item1[0]}
                                    </TableCell>
                                    <TableCell align="center">
                                      {item1[2]}
                                    </TableCell>

                                    <TableCell align="center"></TableCell>
                                  </TableRow>
                                );
                              }
                              return <></>;
                            })}
                          </>
                        )}
                      </TableBody>
                    );
                  })}
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  console.log("groups", groups.length);

  if (groups.length > 0 && 3 > 0) {
    return (
      <TableContainer component={Paper}>
        <Progess load={loading}></Progess>
        <Grid container justifyContent="center">
          <Grid
            item
            container
            xs={10}
            direction="column"
            sx={{ mb: "31px", mt: "31px" }}
          >
            <Grid item style={{ margin: "auto" }}>
              <Typo_custom>ตรวจสอบการจบการศึกษา</Typo_custom>
            </Grid>
          </Grid>
        </Grid>
        {rows.map((row, index) => (
          <Table_custom
            aria-label="collapsible table"
            key={index}
            // sx={{ width: "80%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "80%", fontWeight: "1000", fontSize: "21px" }}
                >
                  {row.section[0]}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{ width: "20%", fontWeight: "600", fontSize: "16px" }}
                >
                  {row.section[1]} {"หน่วยกิต"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups[index].group_subject.map((rowSub) => {
                return (
                  <Row key={rowSub.group} row={rowSub} setCheck={setCheck} />
                );
              })}
            </TableBody>
          </Table_custom>
        ))}
      </TableContainer>
    );
  }
  return <></>;
}
