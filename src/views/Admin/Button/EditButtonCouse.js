import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Inputnew from "../../../components/Inputnew";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { Typography } from "@mui/material";
import "../../../uplaod/Upload.css";

export default function EditButtonCouse({ row, rows, setRows, setLoading }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [departID, setdepartID] = useState("");
  const [teacherName, setteacherName] = useState("");
  const [teacherSur, setteacherSur] = useState("");
  const [pdfname, setpdfname] = useState("");
  const [exlname, setexlname] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [newid, setnewID] = useState("");

  const [couseID, setcouseID] = useState("");
  const [cousename, setcousename] = useState("");
  const [id, setid] = useState("");

  const [dept, setdept] = React.useState([]);

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
      setdept(response.data.data);
      console.log(response.data.data);
    };
    api_();
  }, []);
  const [filepdf = 0, setfilepdf] = useState("");

  const handleUploadImage = (e) => {
    const filepdf = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilepdf(filepdf);
    };
    reader.readAsDataURL(filepdf);
  };
  console.log("couseID", couseID);
  console.log("filecourse", filecourse);
  console.log("filepdf", filepdf);

  const handleSubmits = async (event) => {
    setLoading(true);
    setOpen(false);
    let headersList = {
      Accept: "*/*",
    };
    let bodyContent = new FormData();
    bodyContent.append("course_name", cousename);
    bodyContent.append("depart_id", departID);
    bodyContent.append("course_id", couseID);
    bodyContent.append("file_pdf", filepdf);
    bodyContent.append("file_course", filecourse);
    bodyContent.append("id", id);
    console.log("bodyContent", bodyContent);

    let response = await fetch("http://localhost:5000/edit-upload-course-pdf", {
      method: "PUT",
      headers: headersList,
      body: bodyContent,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result["message"] === "success") {
          setLoading(false);
          alert("บันทึกเสร็จสิ้น");
          window.location.reload("Refresh");
        } else {
          setLoading(false);
          alert("ล้มเหลว");
          console.log(result["error"]);
        }
      });
  };

  const handleClickOpen = () => {
    setdepartID(rows[row].depart_id);
    setnewID(rows[row].course_id);
    setcouseID(rows[row].course_id);
    setcousename(rows[row].course_name);
    setfilepdf(rows[row].file_pdf);
    setteacherName(rows[row].teacher_name);
    setteacherSur(rows[row].teacher_surname);
    setpdfname(rows[row].pdf_name);
    setexlname(rows[row].excel_name);
    setid(rows[row].id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    handleSubmits(data);
  };

  return (
    <div style={{ width: "80px" }}>
      {dept !== [] && (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            แก้ไข
          </Button>
          <Dialog
            maxWidth="30"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // sx={{  minWidth:"100vh",minHeight: "100vh",backgroundColor: 'primary.dark',}}
          >
            {" "}
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle id="alert-dialog-title">
                {"แก้ไขข้อมูลหลักสูตรการศึกษา"}
              </DialogTitle>
              <DialogContent>
                <Stack spacing={2}>
                  <Stack
                    //direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 2 }}
                    sx={{ mt: "20px" }}
                  >
                    <Controller
                      render={({ field: { onChange } }) => (
                        <Inputnew
                          sx={{ width: "450px" }}
                          id="couseID"
                          defaultValue={couseID}
                          label="รหัสหลักสูตร"
                          onChange={(e) => setcouseID(e.target.value)}
                          required
                        />
                      )}
                      name="couseID"
                      control={control}
                      defaultValue=""
                    />
                  </Stack>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 2 }}
                  >
                    <Controller
                      render={({ field: { onChange } }) => (
                        <Inputnew
                          sx={{ width: "450px" }}
                          label="cousename"
                          defaultValue={cousename}
                          id="หลักสูตร"
                          onChange={(e) => setcousename(e.target.value)}
                          required
                        />
                      )}
                      name="cousename"
                      control={control}
                      defaultValue=""
                    />
                  </Stack>
                  <Controller
                    render={({ field: { onChange } }) => (
                      <Box sx={{ width: "450px" }}>
                        <FormControl fullWidth>
                          <InputLabel>รหัสสาขา</InputLabel>
                          {console.log("dept=", dept, "depart=", departID)}
                          <Select
                            value={departID}
                            label="รหัสสาขา"
                            onChange={(e) => {
                              setdepartID(e.target.value);
                            }}
                            defaultValue={dept}
                            required
                          >
                            {dept.map((name) => (
                              <MenuItem key={name.dept_id} value={name.dept_id}>
                                {name.dept_id} {name.dept_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                    name="departID"
                    control={control}
                    defaultValue=""
                  />

                  <Box className="box2">
                    <p style={{ color: "red" }}>*ไฟล์ PDF ข้อมูลหลักสูตร</p>

                    <Button
                      style={{ minWidth: "100%", marginTop: "16px" }}
                      variant="contained"
                      component="label"
                    >
                      เลือกไฟล์
                      <input
                        hidden
                        accept="application/pdf"
                        multiple
                        type="file"
                        onChange={handleUploadImage}
                      />
                    </Button>
                    <div style={{ display: "flex" }}>
                      {(() => {
                        if (filepdf === 0) {
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
                              <Typography
                                style={{
                                  color: "green",
                                  fontSize: "15px",
                                  marginTop: "2px",
                                }}
                              >
                                ( ไฟล์ล่าสุด : {pdfname} )
                              </Typography>
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
                                marginTop: "8px",
                              }}
                            >
                              {filepdf && (
                                <div
                                  style={{
                                    // display: "flex",
                                    color: "green",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    margin: "auto",
                                    marginTop: "8px",
                                  }}
                                >
                                  <Button
                                    onClick={handledownloadpdf}
                                    variant="outlined"
                                  >
                                    {"ตรวจสอบไฟล์ : "}
                                    {filepdf.name}
                                  </Button>
                                  <Typography style={{ marginTop: "16px" }}>
                                    {" "}
                                    {"เวลาแก้ไขไฟล์ล่าสุด : "}
                                    {filepdf.lastModifiedDate
                                      .toString()
                                      .substring(0, 25)}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          );
                        }
                      })()}
                    </div>
                  </Box>

                  <Box className="box2">
                    <p style={{ color: "red" }}>
                      *ไฟล์ xlxs เพื่อเพิ่มหลักสูตร
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
                      />
                    </Button>
                    <div style={{ display: "flex" }}>
                      {(() => {
                        if (filecourse === "") {
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
                              <Typography
                                style={{
                                  color: "green",
                                  fontSize: "15px",
                                  marginTop: "2px",
                                }}
                              >
                                ( ไฟล์ล่าสุด : {exlname} )
                              </Typography>
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
                                marginTop: "8px",
                              }}
                            >
                              {filecourse && (
                                <Typography
                                  sx={{
                                    marginTop: "8px",
                                  }}
                                >
                                  <Button
                                    onClick={handledownload}
                                    variant="outlined"
                                  >
                                    {"ตรวจสอบไฟล์ : "}
                                    {filecourse.name}
                                  </Button>
                                  <Typography style={{ marginTop: "16px" }}>
                                    {" "}
                                    {"เวลาแก้ไขไฟล์ล่าสุด : "}
                                    {filecourse.lastModifiedDate
                                      .toString()
                                      .substring(0, 25)}
                                  </Typography>
                                </Typography>
                              )}
                            </div>
                          );
                        }
                      })()}
                    </div>
                  </Box>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>ยกเลิก</Button>
                <Button type="submit" setLoading={setLoading}>
                  บันทึก
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      )}
    </div>
  );
}
