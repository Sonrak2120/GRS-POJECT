import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import BackupIcon from "@mui/icons-material/Backup";
import "../../../App.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddFullDepart({ setLoading }) {
  const token = sessionStorage.getItem("token");
  const [file, setFile] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(file);
    };
    reader.readAsDataURL(file);
  };

  const onClickUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      setOpen(false);
      const UploadStudent = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/add-file-department",
        data: formData,
        headers: {
          Authorization: `Bearer ` + token,
          Accept: "*/*",
        },
      });
      setLoading(false);
      alert("อัปโหลด สาขาวิชา สำเร็จแล้ว ");
      window.location.reload("Refresh");
    } catch {
      setLoading(false);
      alert("Error อัปโหลดไฟล์ไม่ถูกต้อง");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Button variant="outlined" onClick={handleClickOpen}>
        อัปโหลดไฟล์สาขาวิชา
      </Button>
      <Dialog
        maxWidth="30"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"เพิ่มบัญชีผู้ใช้ของนิสิต"}
        </DialogTitle>
        <DialogContent>
          <div className="DialogUpload">
            <BackupIcon sx={{ fontSize: 100 }} />
            <h3>กรุณาอัปโหลดไฟล์ xlsx รายชื่อสาขา</h3>
            <br />
            <input
              type={"file"}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ID="fileSelect"
              runat="server"
              onChange={handleUploadImage}
            />{" "}
            <br />
            <button onClick={onClickUpload} className="btn btn-primary">
              อัปโหลดไฟล์
            </button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
