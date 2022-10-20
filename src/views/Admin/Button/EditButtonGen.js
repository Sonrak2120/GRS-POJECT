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

export default function EditButtonGen({ row, rows, setRows }) {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [genID, setgenID] = useState("");
  const [genname, setdgenname] = useState("");
  const [exlname, setexlname] = useState("");
  const [id, setid] = useState("");

  const [filecourse, setfilecourse] = useState({});
  const handleUploadxlxs = (e) => {
    const filecourse = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setfilecourse(filecourse);
    };
    reader.readAsDataURL(filecourse);
  };

  const handleSubmit = async (event) => {
    setOpen(false);
    event.preventDefault();
    let headersList = {
      Accept: "*/*",
    };
    let bodyContent = new FormData();
    bodyContent.append("gen_name", genname);
    bodyContent.append("gen_id", genID);
    bodyContent.append("file_course", filecourse);
    bodyContent.append("id", id);
    console.log(bodyContent);
    let response = await fetch("http://localhost:5000/edit-general", {
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
    setgenID(rows[row].gen_id);
    setdgenname(rows[row].gen_name);
    setid(rows[row].id);

    setexlname(rows[row].filename);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: "80px" }}>
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
          {"แก้ไขข้อมูลรายวิชา"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{ mt: "20px" }}
            >
              <Inputnew
                sx={{ width: "450px" }}
                label="รหัสเล่มศึกษาทั่วไป"
                defaultValue={genID}
                id="genID"
                onChange={(e) => setgenID(e.target.value)}
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Inputnew
                sx={{ width: "450px" }}
                id="genname"
                defaultValue={genname}
                label="ชื่อเล่มศึกษาทั่วไป"
                onChange={(e) => setdgenname(e.target.value)}
              />
            </Stack>

            <p style={{ color: "red" }}>*ไฟล์ xlxs เพื่อเพิ่มหลักสูตร</p>
            <Typography
              style={{ color: "green", fontSize: "15px", marginTop: "2px" }}
            >
              ( ไฟล์ล่าสุด : {exlname} )
            </Typography>
            <input
              type={"file"}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ID="fileSelect"
              runat="server"
              onChange={handleUploadxlxs}
            />
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
    </div>
  );
}
