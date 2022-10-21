import React, { useState, useEffect } from "react";
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

export default function AddGen({ setLoading }, props) {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  // const [filepdf, setfilepdf] = useState({});
  // const handleUploadImage = (e) => {
  //   const filepdf = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setfilepdf(filepdf);
  //   };
  //   reader.readAsDataURL(filepdf);
  // };
  const [filecourse, setfilecourse] = useState({});
  const handleUploadxlxs = (e) => {
    const fileupload = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilecourse(fileupload);
    };
    reader.readAsDataURL(fileupload);
  };
  console.log("ffilecourse", filecourse);

  const handledownload = () => {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(filecourse);
    a.download = filecourse.name;
    a.click();
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    setOpen(false);
    event.preventDefault();

    let headersList = {
      Accept: "*/*",
    };
    var data = {
      gen_id: genID,
      gen_name: genname,
      file_course: filecourse,
    };
    let bodyContent = new FormData();
    bodyContent.append("gen_id", genID);
    bodyContent.append("gen_name", genname);
    bodyContent.append("file_course", filecourse);
    let response = await fetch("http://127.0.0.1:5000/add-general", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result["message"] === "success") {
          setLoading(false);
          alert("บันทึกเสร็จสิ้น");
          window.location.reload("Refresh");
        } else {
          setLoading(false);
          alert("ผิดพลาด");
        }
        console.log("result[message]", result["message"]);
      });
    let data2 = await response.text();
    console.log(data2);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [genID, setgenID] = useState("");
  const [genname, setgenname] = useState("");

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
        เพิ่มรายวิชา
      </Button>
      <Dialog
        maxWidth="30"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"เพิ่มรายวิชาการศึกษาทั่วไปในสาขาวิชา วิทยาการคอมพิวเตอร์"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} justifyContent="center" alignItems={"center"}>
            <Stack
              //   direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{ mt: 5 }}
            >
              <Inputnew
                sx={{ width: "450px" }}
                id="genID"
                label="รหัสเล่มศึกษาทั่วไป"
                onChange={(e) => setgenID(e.target.value)}
              />
              <Inputnew
                sx={{ width: "450px" }}
                id="genname"
                label="ชื่อเล่มศึกษาทั่วไป"
                onChange={(e) => setgenname(e.target.value)}
              />
              {/* <Box sx={{ width: "450px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    รหัสสาขา
                  </InputLabel>
                  <Select
                    // id="departID"
                    label="รหัสสาขา"
                    onChange={(e) => setdepartID(e.target.value.dept_id)}
                  >
                    {rows.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name.dept_id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}

              <p style={{ color: "red" }}>
                *ไฟล์ xlxs เพื่อเพิ่มรายวิชาศึกษาทั่วไป
              </p>
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
              {/* <input
                type={"file"}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ID="fileSelect"
                runat="server"
                onChange={handleUploadxlxs}
              /> */}
              <br />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={handleSubmit} autoFocus>
            เพิ่ม
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
