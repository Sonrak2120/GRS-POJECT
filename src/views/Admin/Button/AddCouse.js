import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Inputnew from "../../../components/Inputnew";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Progess from "../../../layouts/FullLayout/Sidebar/Progess";
import { Typography } from "@mui/material";

import "../../../uplaod/Upload.css";

export default function AddCouse({ setLoading }) {
  const [open, setOpen] = React.useState(false);

  const [rows, setrows] = React.useState([]);
  const token = sessionStorage.getItem("token");
  console.log("token++", token);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const api_ = async () => {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "http://localhost:5000/get-department-info-for-dropdown",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setrows(response.data.data);
    };
    api_();
  }, []);

  const [filepdf, setfilepdf] = useState("");
  const handleUploadImage = (e) => {
    const filepdf = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilepdf(filepdf);
    };
    reader.readAsDataURL(filepdf);
  };

  const [filecourse, setfilecourse] = useState("");
  const handleUploadxlxs = (e) => {
    const filecourse = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilecourse(filecourse);
    };
    reader.readAsDataURL(filecourse);
  };

  const handledownload = () => {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(filecourse);
    a.download = filecourse.name;
    a.click();
  };

  const handledownloadpdf = () => {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(filepdf);
    a.download = filepdf.name;
    a.click();
  };

  const handleSubmits = async (event) => {
    setLoading(true);
    setOpen(false);

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ` + token,
    };
    var data = {
      course_id: couseID,
      course_name: cousename,
      depart_id: departID,
      file_pdf: filepdf,
      file_course: filecourse,
    };
    let bodyContent = new FormData();
    bodyContent.append("course_name", cousename);
    // bodyContent.append("depart_id", departID);
    bodyContent.append("course_id", couseID);
    bodyContent.append("file_pdf", filepdf);
    bodyContent.append("file_course", filecourse);

    let response = await fetch(
      "http://127.0.0.1:5000/upload-course-pdf-for-officer",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result["message"] === "success") {
          setLoading(false);
          alert("บันทึกเสร็จสิ้น");
          window.location.reload("Refresh");
        } else {
          setLoading(false);
          alert("ผิดพลาด");
          window.location.reload("Refresh");
        }
      });

    let data2 = await response.text();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [couseID, setcouseID] = useState("");
  const [cousename, setcousename] = useState("");
  const [departID, setdepartID] = useState("");

  //copy
  const onSubmit = (data) => {
    handleSubmits(data);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        textAlign: "center",
      }}
    >
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        setLoading={setLoading}
      >
        เพิ่มหลักสูตร
      </Button>
      <Dialog
        maxWidth="30"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="alert-dialog-title">
            {"เพิ่มหลักสูตรในสาขาวิชา"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} justifyContent="center" alignItems={"center"}>
              <Stack
                //   direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{ mt: 5 }}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Inputnew
                      sx={{ width: "450px" }}
                      id="couseID"
                      label="รหัสหลักสูตร"
                      onChange={(e) => setcouseID(e.target.value)}
                      required
                    />
                  )}
                  name="couseID"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field: { onChange } }) => (
                    <Inputnew
                      sx={{ width: "450px" }}
                      id="cousename"
                      label="ชื่อหลักสูตร"
                      onChange={(e) => setcousename(e.target.value)}
                      required
                    />
                  )}
                  name="cousename"
                  control={control}
                  defaultValue=""
                />
                {/* <Controller
                  render={({ field: { onChange } }) => (
                    <Box sx={{ width: "450px" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          รหัสสาขา
                        </InputLabel>
                        <Select
                          // id="departID"
                          label="รหัสสาขา"
                          onChange={(e) => setdepartID(e.target.value.dept_id)}
                          required
                        >
                          {rows.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name.dept_id}
                              {"-"}
                              {name.dept_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                  name="departID"
                  control={control}
                  defaultValue=""
                /> */}

                <Controller
                  render={({ field: { onChange } }) => (
                    <Box className="box2">
                      <p style={{ color: "red" }}>*ไฟล์ PDF ข้อมูลหลักสูตร</p>
                      <Button
                        variant="contained"
                        component="label"
                        style={{ minWidth: "100%", marginTop: "16px" }}
                      >
                        เลือกไฟล์
                        <input
                          hidden
                          accept="application/pdf"
                          multiple
                          type="file"
                          onChange={handleUploadImage}
                          required
                        />
                      </Button>
                      <div style={{ display: "flex" }}>
                        {(() => {
                          if (filepdf == "") {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  color: "red",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  margin: "auto",
                                  marginTop: "8px",
                                }}
                              >
                                <p>ยังไม่เลือกไฟล์</p>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                style={{
                                  // display: "flex",
                                  color: "green",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  margin: "auto",
                                  marginTop: "16px",
                                }}
                              >
                                <Button
                                  onClick={handledownloadpdf}
                                  variant="outlined"
                                >
                                  {"ตรวจสอบไฟล์ : "}
                                  {filepdf.name}
                                </Button>
                                <Typography style={{ marginTop: "8px" }}>
                                  {" "}
                                  {"เวลาแก้ไขไฟล์ล่าสุด : "}
                                  {filepdf.lastModifiedDate
                                    .toString()
                                    .substring(0, 25)}
                                </Typography>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    </Box>
                  )}
                  name="filepdf"
                  control={control}
                  defaultValue=""
                />

                <br />

                <Controller
                  render={({ field: { onChange } }) => (
                    <Box className="box2">
                      <p style={{ color: "red" }}>
                        *ไฟล์ xlsx เพื่อเพิ่มหลักสูตร
                      </p>
                      <Button
                        style={{ minWidth: "100%", marginTop: "16px" }}
                        variant="contained"
                        component="label"
                      >
                        เลือกไฟล์
                        <input
                          hidden
                          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          multiple
                          type="file"
                          onChange={handleUploadxlxs}
                          required
                        />
                      </Button>
                      <div style={{ display: "flex" }}>
                        {(() => {
                          if (filecourse == "") {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  color: "red",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  margin: "auto",
                                  marginTop: "8px",
                                }}
                              >
                                <p>ยังไม่เลือกไฟล์</p>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                style={{
                                  // display: "flex",
                                  color: "green",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  margin: "auto",
                                  marginTop: "16px",
                                }}
                              >
                                <Button
                                  onClick={handledownload}
                                  variant="outlined"
                                >
                                  {"ตรวจสอบไฟล์ : "}
                                  {filecourse.name}
                                </Button>
                                <Typography style={{ marginTop: "8px" }}>
                                  {" "}
                                  {"เวลาแก้ไขไฟล์ล่าสุด : "}
                                  {filecourse.lastModifiedDate
                                    .toString()
                                    .substring(0, 25)}
                                </Typography>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    </Box>
                  )}
                  name="filecourse"
                  control={control}
                  defaultValue=""
                />

                <br />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ยกเลิก</Button>
            <Button type="submit">เพิ่ม</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
