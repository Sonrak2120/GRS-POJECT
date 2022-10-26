import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

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
import Sentbutton from "../../views/Student/button/Sentbutton";
import axios from "axios";
import { Grid, styled } from "@mui/material";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";
import HeadDataStudent from "../Student/HeadDataStudent";
import Head from "./Head";

const Typo_custom = styled("Typography")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    marginBottom: "20px",

    fontWeight: 250,
    fontSize: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: "-0.06px",
    fontFamily: "'Prompt', sans-serif;",
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
    fontFamily: "'Prompt', sans-serif;",
  },
}));

const Grid_custom = styled("Box")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  [theme.breakpoints.up("xl")]: {
    // justifyContent: "center",
    // alignItems: "center",
    // position: "absolute",
    // right: 350,
    // top: 200,
  },
}));

const Table_custom = styled("Table")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "80%",
    margin: "auto",
  },
}));

export default function CollapsibleTable() {
  const [rows, setRows] = React.useState([]);
  const [groups, setgrop] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [num, setNum] = React.useState([]);
  const [count, setcount] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-sub-progress-info",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      const data = response.data.data;
      setName(response.data.course_name);
      setNum(response.data.allcredit);
      setRows(response.data.data);
      setgrop(data);
    };
    api_();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const api_ = async () => {
      let headersList = {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-require-number",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setcount(response.data.num);
    };
    api_();
  }, []);
  console.log("first--------", count);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(true);
    const sortRow = row.subject_group.sort((a, b) => a.term - b.term);
    const term1 = sortRow.filter((item) => item?.term === "0");
    const term2 = sortRow.filter((item) => item?.term === "1");

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
          <TableCell style={{ fontWeight: 700 }}>{row.group[0]}</TableCell>
          <TableCell align="center" style={{ fontWeight: 700 }}>
            {row.group[1]} {"หน่วยกิต"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Stack spacing={2} sx={{ margin: 1 }}>
                {term1?.length > 0 && (
                  <>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      style={{ fontWeight: 700 }}
                    >
                      {`ภาคต้น`}
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
                        </TableRow>
                      </TableHead>
                      {term1.map((item, index) => {
                        return (
                          <TableBody>
                            <TableRow key={index.toString()}>
                              <TableCell />
                              <TableCell component="th" scope="row">
                                {item.education_id}
                              </TableCell>
                              <TableCell>{item.education_name}</TableCell>
                              <TableCell align="center">
                                {item.credit}
                              </TableCell>
                              <TableCell align="center">{item.grade}</TableCell>
                              <TableCell align="center">
                                {item.class_grade}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })}
                    </Table>
                  </>
                )}
                {term2?.length > 0 && (
                  <>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      style={{ fontWeight: 700 }}
                    >
                      {`ภาคปลาย`}
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
                        </TableRow>
                      </TableHead>
                      {term2.map((item, index) => {
                        return (
                          <TableBody>
                            <TableRow key={index.toString()}>
                              <TableCell />
                              <TableCell component="th" scope="row">
                                {item.education_id}
                              </TableCell>
                              <TableCell>{item.education_name}</TableCell>
                              <TableCell align="center">
                                {item.credit}
                              </TableCell>
                              <TableCell align="center">{item.grade}</TableCell>
                              <TableCell align="center">
                                {item.class_grade}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })}
                    </Table>
                  </>
                )}
              </Stack>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  if (groups.length > 0) {
    return (
      <>
        <Card>
          {(() => {
            if (count === 0) {
              console.log(count);
              return <Head />;
            } else {
              console.log(count);
              return <HeadDataStudent />;
            }
          })()}
          {/* <HeadDataStudent />
          {console.log("Head", Head)} */}
        </Card>
        <Box sx={{ mt: "16px" }}>
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
                  <Typo_custom>
                    {name} จำนวนหน่วยกิตไม่น้อยกว่า {num} หน่วยกิต
                  </Typo_custom>
                </Grid>
              </Grid>
              {/* <Grid_custom
                item
                container
                // xs={11}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "80%",
                }}
                // direction="column"
              >
                <Grid_custom
                // justifyContent="center"
                // alignItems="center"
                // sx={{ position: "absolute" }}
                >
                  <Sentbutton setLoading={setLoading} />
                </Grid_custom>
              </Grid_custom> */}
            </Grid>
            {rows.map((row, index) => (
              <Table_custom
                aria-label="collapsible table"
                key={index}
                sx={{ width: "80%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        width: "80%",
                        fontWeight: "1000",
                        fontSize: "21px",
                      }}
                    >
                      {row.section[0]}
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ width: "20%", fontWeight: "700", fontSize: "16px" }}
                    >
                      {row.section[1]} {"หน่วยกิต"}
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {groups[index].sub_n_grade.map((rowSub) => {
                    return <Row key={rowSub.group} row={rowSub} />;
                  })}
                </TableBody>
              </Table_custom>
            ))}
          </TableContainer>
        </Box>
      </>
    );
  }
  return <></>;
}
