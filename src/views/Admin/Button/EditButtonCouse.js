import React, { useState, useEffect } from "react";
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

export default function EditButtonCouse({ row, rows, setRows }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [departID, setdepartID] = useState("");
  const [teacherName, setteacherName] = useState("");
  const [teacherSur, setteacherSur] = useState("");
  const [pdfname, setpdfname] = useState("");
  const [exlname, setexlname] = useState("");

  const [newid, setnewID] = useState("");

  const [couseID, setcouseID] = useState("");
  const [cousename, setcousename] = useState("");
  const [id, setid] = useState("");

  const [dept, setdept] = React.useState([]);

  const [filecourse, setfilecourse] = useState({});
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
  const [filepdf, setfilepdf] = useState({});

  const handleUploadImage = (e) => {
    const filepdf = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilepdf(filepdf);
    };
    reader.readAsDataURL(filepdf);
  };
  console.log("filepdf", filepdf);

  const handleSubmit = async (event) => {
    setOpen(false);
    event.preventDefault();
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
    console.log(bodyContent);
    let response = await fetch("http://localhost:5000/edit-upload-course-pdf", {
      method: "PUT",
      headers: headersList,
      body: bodyContent,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result["message"] === "success") {
          alert("บันทึกเสร็จสิ้น");
          window.location.reload("Refresh");
        } else {
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
                  <Inputnew
                    sx={{ width: "450px" }}
                    id="couseID"
                    defaultValue={couseID}
                    label="รหัสหลักสูตร"
                    onChange={(e) => setnewID(e.target.value)}
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <Inputnew
                    sx={{ width: "450px" }}
                    label="cousename"
                    defaultValue={cousename}
                    id="หลักสูตร"
                    onChange={(e) => setcousename(e.target.value)}
                  />
                </Stack>
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
                    >
                      {dept.map((name) => (
                        <MenuItem key={name.dept_id} value={name.dept_id}>
                          {name.dept_id} {name.dept_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <p style={{ color: "red" }}>*ไฟล์ PDF ข้อมูลหลักสูตร</p>
                <Typography
                  style={{ color: "green", fontSize: "15px", marginTop: "2px" }}
                >
                  ( ไฟล์ล่าสุด : {pdfname} )
                </Typography>
                {/* <input
                  type={"file"}
                  accept="application/pdf"
                  ID="fileSelect"
                  runat="server"
                  onChange={handleUploadImage}
                />{" "} */}
                <Button minWidth="100%" variant="contained" component="label">
                  เลือกไฟล์
                  <input
                    hidden
                    accept="application/pdf"
                    multiple
                    type="file"
                    onChange={handleUploadImage}
                  />
                </Button>
                {filepdf && (
                  <Typography
                    align="left"
                    sx={{
                      display: "inline-block",
                      m: "auto",
                      ml: 1,
                    }}
                  >
                    ชื่อไฟล์ที่เลือก:{" "}
                    <Button onClick={handledownloadpdf}>{filepdf.name}</Button>
                    {console.log("filepdf.name", filepdf.name)}
                  </Typography>
                )}
                <br />
                <p style={{ color: "red" }}>*ไฟล์ xlxs เพื่อเพิ่มหลักสูตร</p>
                <Typography
                  style={{ color: "green", fontSize: "15px", marginTop: "2px" }}
                >
                  ( ไฟล์ล่าสุด : {exlname} )
                </Typography>
                {/* <input
                  type={"file"}
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ID="fileSelect"
                  runat="server"
                  onChange={handleUploadxlxs}
                /> */}
                <Button minWidth="100%" variant="contained" component="label">
                  เลือกไฟล์
                  <input
                    hidden
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    multiple
                    type="file"
                    onChange={handleUploadxlxs}
                  />
                </Button>
                {filecourse && (
                  <Typography
                    align="left"
                    sx={{
                      display: "inline-block",
                      m: "auto",
                      ml: 1,
                    }}
                  >
                    ชื่อไฟล์ที่เลือก:{" "}
                    <Button onClick={handledownload}>{filecourse.name}</Button>
                  </Typography>
                )}
                <br />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ยกเลิก</Button>
              <Button onClick={handleSubmit} autoFocus>
                บันทึก
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}
