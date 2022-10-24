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
import Progess from "../../../layouts/FullLayout/Sidebar/Progess";
import Checkbox from "@mui/material/Checkbox";
import Sentbutton from "./Sentbutton";

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

export default function PageActivedata({
  row2,
  rows2,
  setRows2,
  setOpen,
  check,
  setCheck,
  subcode,
  setSubcode,
  setStId,
}) {
  const [rows, setRows] = React.useState([]);
  const [groups, setgrop] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [num, setNum] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      };

      let bodyContent = {
        std_id: rows2[0]?.std_in_depart?.[row2]?.head?.std_id,
      };

      let reqOptions = {
        url: "http://localhost:5000/get-sub-progress-info-for-teacher",
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
      response.data.sub_code.map((item) => temp.push(0));
      setCheck(temp);
      setStId(rows2[0]?.std_in_depart?.[row2]?.head?.std_id);
    };
    api_();
  }, []);
  const count = check.length;

  function Row(props) {
    const { row, setCheck } = props;
    const [open, setOpen] = React.useState(true);

    const findIndex = (value) => {
      const valueIndex = subcode.findIndex((element) => {
        return element === value;
      });
      return valueIndex;
    };

    const onChange = (value, index) => {
      let temp = [...check];
      temp[index] = value ? 1 : 0;
      setCheck(temp);
    };

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
                      <TableCell align="center">ภาค</TableCell>
                      <TableCell align="center">ปี</TableCell>
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
                          <TableCell align="center">
                            {item[3][0][1] === "1" ? "ต้น" : "ปลาย"}
                          </TableCell>
                          <TableCell align="center">{item[3][0][2]}</TableCell>
                          <TableCell align="center">
                            <Checkbox
                              label=""
                              checked={
                                check[findIndex(item[0])] === 0 ? false : true
                              }
                              onChange={(value) =>
                                onChange(
                                  value.target.checked,
                                  findIndex(item[0])
                                )
                              }
                            />
                          </TableCell>
                        </TableRow>
                        {item[3].length > 1 && (
                          <>
                            {item[3].map((item1, index1) => {
                              if (index1 !== 0) {
                                return (
                                  <TableRow key={index1.toString()}>
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
                                      {item1[1] === "1" ? "ต้น" : "ปลาย"}
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

  if (groups.length > 0 && check.length > 0) {
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
