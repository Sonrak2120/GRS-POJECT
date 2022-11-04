import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button, Grid, styled } from "@mui/material";
import { useState } from "react";
import { Children } from "react";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { blue, pink } from "@mui/material/colors";
import "../../App.css";

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
const Box_custom = styled("Box")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    marginBottom: "20px",

    fontWeight: 200,
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: "-0.06px",
    gap: "2rem",
  },
  [theme.breakpoints.up("xl")]: {
    marginBottom: "30px",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "left",
    fontWeight: 500,
    fontSize: 20,
    letterSpacing: "-0.06px",
    flexDirection: "column",
  },
}));

const Icon_Box = styled(Brightness1Icon)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    height: "2rem",
    marginRight: "0.5em",
    width: "2rem",
  },
  [theme.breakpoints.up("xl")]: {
    height: "3rem",
    marginRight: "0.5em",
    width: "3rem",
  },
}));

export default function FreeSolo() {
  const token = sessionStorage.getItem("token");
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/subject-info",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setRows(response.data.data);
      console.log(response.data.data);
    };
    api_();
  }, []);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const sub = value.substring(0, 11);
  let counter;
  let sum = 0;
  console.log("Value", value);
  console.log("Sub", sub);

  const [subcode, setsubcode] = useState("");
  const [count, setcount] = useState("");
  const [data, setdata] = useState([]);
  const [sumary, setsamary] = useState("");
  // console.log("Count", count);
  if (count === "") {
    counter = 0;
  } else {
    counter = count;
    for (let i = 0; i < sumary.length; i += 1) {
      sum += sumary[i];
    }
  }
  console.log("Counter", counter);
  console.log("Sum", sum);

  const handleSearch = async (e) => {
    e.preventDefault();
    var data = {
      sub_code: subcode,
    };
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ` + token,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      sub_code: sub,
    });

    let reqOptions = {
      url: "http://localhost:5000/find-prerequisite",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let reverseData;

    let response = await axios.request(reqOptions);
    setcount(response.data.data.length);
    setdata(response.data.data);
    console.log(response.data.data);
    reverseData = response.data.data.reverse();
    console.log("Revers", reverseData);
    console.log(value);
    console.log(sub);
    console.log(response.data.data.length);
    console.log(response.data.data[0]);
    console.log("count", count);
    console.log("sumary", sumary);

    const newArr = reverseData.map(myFunction);
    function myFunction(num) {
      return num.sub_code[2];
    }
    console.log(newArr);
    setsamary(newArr.sort().reverse());
    // console.log(setsamary);
  };
  return (
    <div className="search">
      <Stack
        spacing={2}
        style={{ width: 860, minHeight: "100vh" }}
        marginTop={5}
      >
        {/* <div>{`value: '${value}'`}</div> */}
        <Grid_custom
          justifyContent="center"
          alignItems="center"
          // sx={{ position: "absolute" }}
        >
          <Grid item style={{ margin: "auto" }}>
            <Box_custom>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon_Box color="success" />{" "}
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 500,
                  }}
                >
                  เรียนผ่านแล้ว
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon_Box sx={{ color: "blue" }} />
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {" "}
                  กำลังเรียน
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon_Box sx={{ color: pink[500] }} />
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 500,
                  }}
                >
                  ยังไม่ได้เรียน
                </Typography>
              </Box>
            </Box_custom>
          </Grid>
        </Grid_custom>
        <Typography
          fontWeight={50}
          fontSize={30}
          alignItems="center"
          justifyContent="center"
          display="flex"
          style={{ marginBottom: "20px" }}
        >
          ตรวจสอบรายวิชา
        </Typography>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          // inputValue={inputValue}
          // onInputChange={(event, newInputValue) => {
          //   setInputValue(newInputValue);
          // }}
          sx={{ color: "white" }}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={rows.map((data) => data.sub_code + " " + data.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="ค้นหารายวิชา"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ color: "white" }}
          onClick={handleSearch}
        >
          ค้นหา
        </Button>
        <Box sx={{ width: "100%" }}>
          {(() => {
            if (count === "") {
              return (
                <div className="tables">
                  <Typography color="#0000008f" fontSize={30}>
                    กรุณาใส่ข้อมูล
                  </Typography>
                </div>
              );
            } else {
              return (
                <div>
                  <p style={{ color: "#000" }}>
                    {data.length === 0 ? "ไม่พบตัวที่ต้องเรียนต่อ" : ""}
                  </p>

                  {data.map((label, inx) => {
                    return (
                      <div style={{ display: "flex" }} key={inx}>
                        <div>
                          {label.sub_code[2] === 1 ? (
                            <Brightness1Icon
                              color="success"
                              style={{
                                height: "4rem",
                                marginTop: "0rem",
                                marginRight: "1em",
                                width: "4rem",
                              }}
                            />
                          ) : label.sub_code[2] === 2 ? (
                            <Brightness1Icon
                              sx={{ color: "blue" }}
                              style={{
                                height: "4rem",
                                marginTop: "0rem",
                                marginRight: "1em",
                                width: "4rem",
                              }}
                            />
                          ) : (
                            <Brightness1Icon
                              sx={{ color: pink[500] }}
                              style={{
                                height: "4rem",
                                marginTop: "0rem",
                                marginRight: "1em",
                                width: "4rem",
                              }}
                            />
                          )}
                        </div>
                        <p
                          style={{
                            position: "absolute",
                          }}
                        >
                          {data.length === inx + 1 ? (
                            ""
                          ) : (
                            <ExpandMoreIcon
                              style={{
                                fontSize: "28px",
                                color: "#777e89",
                                marginLeft: "1.2rem",
                                marginTop: "3.25rem",
                              }}
                            />
                          )}
                        </p>
                        <Typography
                          variant="h4"
                          style={{
                            fontWeight: 200,
                            color: "#000",
                            marginTop: 20,
                          }}
                        >
                          {label.sub_code[0]} {label.sub_code[1]}
                          <Typography
                            style={{
                              marginLeft: "50px",
                              marginTop: "0px",
                              color: "#0000008f",
                            }}
                            align="left"
                          >
                            {label.pre[0][0][0]}
                            {"  "}
                            {label.pre[0][0][1]}
                            <br />
                            {label.pre[0][1][0]}
                            {"  "}
                            {label.pre[0][1][1]}
                          </Typography>
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              );
            }
          })()}
        </Box>
      </Stack>
    </div>
  );
}
